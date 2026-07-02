import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, Mic, MicOff, MessageSquare, X, Paperclip, Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import ChatMaintenanceForm from "./ChatMaintenanceForm";
import ChatTrackingForm from "./ChatTrackingForm";

interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
  type?: "text" | "image" | "voice" | "file";
  attachment?: string;
  fileName?: string;
}

interface ChatBotPanelProps {
  onClose: () => void;
}

const WHATSAPP_NUMBER = "201028291995";
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatBotPanel = ({ onClose }: ChatBotPanelProps) => {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === "ar";

  const [tab, setTab] = useState<"text" | "voice">("text");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [showTrackingForm, setShowTrackingForm] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const recordingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    const stored = sessionStorage.getItem("uberfix_chat_session");
    if (stored) sessionIdRef.current = stored;
    else {
      const id = crypto.randomUUID();
      sessionStorage.setItem("uberfix_chat_session", id);
      sessionIdRef.current = id;
    }
  }, []);

  const quickActions = isRTL
    ? ["ما هي خدمات الشركة؟", "أريد عرض سعر تشطيب", "ما هي أسعار التشطيبات؟", "ما هي فروع الشركة؟"]
    : ["What services do you offer?", "Get a finishing quote", "Finishing prices?", "Where are your branches?"];

  const ensureConversation = useCallback(async () => {
    if (conversationIdRef.current) return conversationIdRef.current;
    const { data, error } = await supabase.rpc("create_chat_conversation", {
      p_session_id: sessionIdRef.current,
      p_language: i18n.language === "en" ? "en" : "ar",
    });
    if (error) { console.error(error); return null; }
    conversationIdRef.current = data as string;
    return conversationIdRef.current;
  }, [i18n.language]);

  const saveMessage = useCallback(async (role: "user" | "bot", content: string, messageType = "text", fileName?: string) => {
    const convId = await ensureConversation();
    if (!convId || !content.trim()) return;
    const { error } = await supabase.rpc("insert_chat_message", {
      p_conversation_id: convId,
      p_role: role,
      p_content: content,
      p_message_type: messageType,
      p_file_name: fileName || null,
    });
    if (error) console.error(error);
  }, [ensureConversation]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => () => {
    if (recordingInterval.current) clearInterval(recordingInterval.current);
    if (abortRef.current) abortRef.current.abort();
  }, []);

  const transferToWhatsApp = useCallback(() => {
    const lastMessages = messages.filter(m => m.role === "user").slice(-3).map(m => m.content).join("\n");
    const greeting = isRTL ? "مرحباً، أريد المساعدة:" : "Hello, I need help:";
    const text = encodeURIComponent(`${greeting}\n${lastMessages}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }, [messages, isRTL]);

  const streamAIResponse = useCallback(async (allMessages: Message[]) => {
    setIsTyping(true);
    const history = allMessages.slice(-10).map(m => ({
      role: m.role === "bot" ? ("assistant" as const) : ("user" as const),
      content: m.content,
    }));
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!resp.ok || !resp.body) throw new Error(`Error ${resp.status}`);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";
      const assistantId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: assistantId, content: "", role: "bot", timestamp: new Date() }]);
      setIsTyping(false);

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        textBuffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, nl);
          textBuffer = textBuffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const j = line.slice(6).trim();
          if (j === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(j);
            const c = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (c) {
              assistantContent += c;
              const final = assistantContent;
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: final } : m));
            }
          } catch { textBuffer = line + "\n" + textBuffer; break; }
        }
      }
      if (assistantContent.trim()) saveMessage("bot", assistantContent);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setIsTyping(false);
      const errorMsg = isRTL ? "عذراً، حدث خطأ. حاول مرة أخرى." : "Sorry, an error occurred. Please try again.";
      setMessages(prev => [...prev, { id: (Date.now() + 2).toString(), content: errorMsg, role: "bot", timestamp: new Date() }]);
      toast({ title: isRTL ? "خطأ" : "Error", description: error instanceof Error ? error.message : "", variant: "destructive" });
    }
  }, [isRTL, toast, saveMessage]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), content: inputValue, role: "user", timestamp: new Date(), type: "text" };
    const next = [...messages, userMsg];
    setMessages(next);
    setInputValue("");
    saveMessage("user", inputValue, "text");
    streamAIResponse(next);
  };

  const handleQuick = (action: string) => {
    if (/طلب صيانة|maintenance request/i.test(action)) { setShowMaintenanceForm(true); setShowTrackingForm(false); return; }
    if (/تتبع|Track/i.test(action)) { setShowTrackingForm(true); setShowMaintenanceForm(false); return; }
    const userMsg: Message = { id: Date.now().toString(), content: action, role: "user", timestamp: new Date(), type: "text" };
    const next = [...messages, userMsg];
    setMessages(next);
    saveMessage("user", action, "text");
    streamAIResponse(next);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        const msg: Message = {
          id: Date.now().toString(),
          content: isRTL ? "📸 صورة مرفقة" : "📸 Image attached",
          role: "user", timestamp: new Date(), type: "image", attachment: reader.result as string,
        };
        const next = [...messages, msg];
        setMessages(next);
        saveMessage("user", msg.content, "image");
        streamAIResponse(next);
      };
      reader.readAsDataURL(file);
    } else {
      const msg: Message = {
        id: Date.now().toString(),
        content: isRTL ? `📎 ملف: ${file.name}` : `📎 File: ${file.name}`,
        role: "user", timestamp: new Date(), type: "file", fileName: file.name,
      };
      const next = [...messages, msg];
      setMessages(next);
      saveMessage("user", msg.content, "file", file.name);
      streamAIResponse(next);
    }
    if (e.target) e.target.value = "";
  };

  const handleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recordingInterval.current) clearInterval(recordingInterval.current);
      const msg: Message = {
        id: Date.now().toString(),
        content: isRTL ? `🎙️ رسالة صوتية (${recordingTime}ث)` : `🎙️ Voice message (${recordingTime}s)`,
        role: "user", timestamp: new Date(), type: "voice",
      };
      const next = [...messages, msg];
      setMessages(next);
      setRecordingTime(0);
      saveMessage("user", msg.content, "voice");
      streamAIResponse(next);
      setTab("text");
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      recordingInterval.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
    }
  };

  const showWelcome = messages.length === 0 && !showMaintenanceForm && !showTrackingForm;

  // Send icon must always point in the direction of sending (toward end of input).
  // In RTL: send is on the LEFT and paper plane should point left; in LTR: right.
  const SendIcon = () => (
    <Send className={`w-4 h-4 ${isRTL ? "-scale-x-100" : ""}`} />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`fixed bottom-24 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-background border border-border ${isRTL ? "right-6" : "right-6"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <input type="file" ref={fileInputRef} onChange={(e) => handleFile(e, "file")} className="hidden" />
      <input type="file" ref={imageInputRef} onChange={(e) => handleFile(e, "image")} accept="image/*" className="hidden" />
      <input type="file" ref={cameraInputRef} onChange={(e) => handleFile(e, "image")} accept="image/*" capture="environment" className="hidden" />

      {/* Header — dark navy */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="text-primary-foreground/80 hover:text-primary-foreground w-8 h-8 rounded-lg hover:bg-primary-foreground/10 flex items-center justify-center transition"
          aria-label="close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className={`flex items-center gap-3 ${isRTL ? "flex-row" : "flex-row-reverse"}`}>
          <div className="text-end">
            <h3 className="text-primary-foreground font-bold text-[15px] leading-tight">
              {isRTL ? "عزبوت " : "AzaBot "}
              <span className="text-primary-foreground/70 text-[13px] font-normal">
                {isRTL ? "(AzaBot)" : "(عزبوت)"}
              </span>
            </h3>
            <p className="text-primary-foreground/60 text-[11px] flex items-center gap-1.5 justify-end mt-0.5">
              <span>{isRTL ? "المساعد الذكي · متصل الآن" : "Smart assistant · Online"}</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-secondary-foreground" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 border-b border-border shrink-0 bg-background">
        <button
          onClick={() => setTab("text")}
          className={`py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition relative ${tab === "text" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          <MessageSquare className="w-4 h-4" />
          {isRTL ? "محادثة نصية" : "Text chat"}
          {tab === "text" && <span className="absolute bottom-0 inset-x-4 h-0.5 bg-secondary rounded-t" />}
        </button>
        <button
          onClick={() => setTab("voice")}
          className={`py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition relative ${tab === "voice" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Mic className="w-4 h-4" />
          {isRTL ? "محادثة صوتية" : "Voice chat"}
          {tab === "voice" && <span className="absolute bottom-0 inset-x-4 h-0.5 bg-secondary rounded-t" />}
        </button>
      </div>

      {/* Body */}
      {tab === "text" ? (
        <>
          <ScrollArea className="flex-1 px-4 py-4" ref={scrollRef}>
            {showWelcome ? (
              <div className="flex flex-col items-center text-center pt-6 pb-4">
                <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mb-4">
                  <MessageSquare className="w-7 h-7 text-secondary" />
                </div>
                <h4 className="text-foreground font-bold text-base mb-1">
                  {isRTL ? "مرحباً! أنا عزبوت 👋" : "Hi! I'm AzaBot 👋"}
                </h4>
                <p className="text-muted-foreground text-sm mb-5">
                  {isRTL ? "كيف يمكنني مساعدتك؟" : "How can I help you?"}
                </p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {quickActions.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuick(a)}
                      className="px-3 py-2 text-[12px] leading-snug rounded-full border border-border bg-background hover:bg-secondary/10 hover:border-secondary/50 text-foreground transition-colors"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${m.role === "bot" ? "bg-secondary" : "bg-primary"}`}>
                      {m.role === "bot" ? <Bot className="w-3.5 h-3.5 text-secondary-foreground" /> : <User className="w-3.5 h-3.5 text-primary-foreground" />}
                    </div>
                    <div
                      className={`max-w-[78%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.type === "image" && m.attachment && (
                        <img src={m.attachment} alt="" className="max-w-full rounded-lg mb-1.5" />
                      )}
                      {m.role === "bot" ? (
                        <div className="prose prose-sm max-w-none [&_p]:my-0.5 text-inherit">
                          <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                        </div>
                      ) : (m.content)}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-secondary-foreground" />
                    </div>
                    <div className="bg-muted px-3 py-2.5 rounded-2xl">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <AnimatePresence>
              {showMaintenanceForm && (
                <ChatMaintenanceForm
                  onClose={() => setShowMaintenanceForm(false)}
                  onSuccess={(rn) => {
                    setShowMaintenanceForm(false);
                    const s = rn ? (isRTL ? `✅ تم تسجيل الطلب رقم ${rn}` : `✅ Request #${rn} submitted`) : (isRTL ? "✅ تم التسجيل" : "✅ Submitted");
                    setMessages(prev => [...prev, { id: Date.now().toString(), content: s, role: "bot", timestamp: new Date() }]);
                    saveMessage("bot", s);
                  }}
                />
              )}
              {showTrackingForm && (
                <ChatTrackingForm
                  onClose={() => setShowTrackingForm(false)}
                  onResult={(summary) => {
                    setShowTrackingForm(false);
                    setMessages(prev => [...prev, { id: Date.now().toString(), content: summary, role: "bot", timestamp: new Date() }]);
                    saveMessage("bot", summary);
                  }}
                />
              )}
            </AnimatePresence>
          </ScrollArea>

          {/* Input row */}
          <div className="px-3 pt-2 pb-2 border-t border-border shrink-0 bg-background">
            <div className="flex items-center gap-1 mb-1.5 px-1">
              <button onClick={() => imageInputRef.current?.click()} className="w-7 h-7 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center" title={isRTL ? "صورة" : "Image"}>
                <Camera className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="w-7 h-7 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center" title={isRTL ? "ملف" : "File"}>
                <Paperclip className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setTab("voice")} className="w-7 h-7 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center" title={isRTL ? "صوت" : "Voice"}>
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 bg-muted rounded-full pe-1 ps-3 h-10"
            >
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
                className="flex-1 border-0 bg-transparent h-9 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50 h-8 w-8 shrink-0"
              >
                <SendIcon />
              </Button>
            </form>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5">
              {isRTL ? "مدعوم بالذكاء الاصطناعي · قد يخطئ أحياناً" : "AI-powered · may make mistakes"}
            </p>
          </div>
        </>
      ) : (
        // Voice tab
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6 bg-background">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center transition ${isRecording ? "bg-destructive/15 animate-pulse" : "bg-secondary/15"}`}>
            <button
              onClick={handleVoice}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition shadow-lg ${isRecording ? "bg-destructive text-white" : "bg-secondary text-secondary-foreground hover:scale-105"}`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold">
              {isRecording
                ? (isRTL ? `جاري التسجيل... ${recordingTime}ث` : `Recording... ${recordingTime}s`)
                : (isRTL ? "اضغط للتحدث مع عزبوت" : "Tap to speak with AzaBot")}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              {isRTL ? "سيتم إرسال التسجيل بعد الإيقاف" : "Recording will be sent on stop"}
            </p>
          </div>
          <button onClick={() => setTab("text")} className="text-xs text-muted-foreground hover:text-foreground underline">
            {isRTL ? "العودة للمحادثة النصية" : "Back to text chat"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ChatBotPanel;

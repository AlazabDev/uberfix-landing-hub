import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, Minimize2, Camera, Mic, Image, MicOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
  type?: "text" | "image" | "voice";
  attachment?: string;
}

interface ChatBotPanelProps {
  onClose: () => void;
}

const ChatBotPanel = ({ onClose }: ChatBotPanelProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: isRTL 
        ? "مرحباً! أنا مساعد UberFix الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك إرسال صور أو رسائل صوتية لوصف المشكلة." 
        : "Hello! I'm UberFix AI Assistant. How can I help you today? You can send photos or voice messages to describe the issue.",
      role: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const quickActions = isRTL ? [
    "احجز خدمة صيانة",
    "أسعار الخدمات",
    "تتبع طلبي",
    "تواصل مع الدعم",
  ] : [
    "Book a service",
    "Service pricing",
    "Track my order",
    "Contact support",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: isRTL
          ? "شكراً لرسالتك! تم إنشاء تذكرة دعم برقم #" + Math.floor(Math.random() * 10000) + ". سيتم توصيلك بأحد ممثلي خدمة العملاء قريباً."
          : "Thank you for your message! A support ticket #" + Math.floor(Math.random() * 10000) + " has been created. You'll be connected to a customer service representative shortly.",
        role: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageMessage: Message = {
          id: Date.now().toString(),
          content: isRTL ? "📸 تم إرفاق صورة للمشكلة" : "📸 Problem image attached",
          role: "user",
          timestamp: new Date(),
          type: "image",
          attachment: reader.result as string,
        };
        setMessages((prev) => [...prev, imageMessage]);
        
        toast({
          title: isRTL ? "تم رفع الصورة" : "Image uploaded",
          description: isRTL ? "تم إرفاق الصورة بنجاح" : "Image attached successfully",
        });

        setIsTyping(true);
        setTimeout(() => {
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: isRTL
              ? "شكراً لإرسال الصورة! تم تسجيل المشكلة وسيتم تحليلها من قبل فريقنا. رقم التذكرة: #" + Math.floor(Math.random() * 10000)
              : "Thanks for sending the image! The issue has been logged and will be analyzed by our team. Ticket #" + Math.floor(Math.random() * 10000),
            role: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
          setIsTyping(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = "";
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      
      const voiceMessage: Message = {
        id: Date.now().toString(),
        content: isRTL 
          ? `🎙️ رسالة صوتية (${recordingTime} ثانية)` 
          : `🎙️ Voice message (${recordingTime}s)`,
        role: "user",
        timestamp: new Date(),
        type: "voice",
      };
      setMessages((prev) => [...prev, voiceMessage]);
      setRecordingTime(0);

      toast({
        title: isRTL ? "تم إرسال الرسالة الصوتية" : "Voice message sent",
        description: isRTL ? "تم تسجيل الرسالة بنجاح" : "Voice recorded successfully",
      });

      setIsTyping(true);
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: isRTL
            ? "شكراً لوصفك الصوتي! تم تسجيل تفاصيل المشكلة وإنشاء تذكرة برقم #" + Math.floor(Math.random() * 10000) + ". سيتصل بك فني متخصص قريباً."
            : "Thanks for your voice description! Problem details have been recorded and ticket #" + Math.floor(Math.random() * 10000) + " created. A specialist will contact you soon.",
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 2000);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      recordingInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[75vh] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="bg-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 border-2 border-secondary">
              <AvatarImage src="/icons/uberfix-icon.gif" alt="UberFix Bot" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-primary" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">
              {isRTL ? "مساعد UberFix" : "UberFix Assistant"}
            </h3>
            <p className="text-white/70 text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {isRTL ? "متصل الآن" : "Online now"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <Minimize2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="w-8 h-8 shrink-0">
                {message.role === "bot" ? (
                  <>
                    <AvatarImage src="/icons/uberfix-icon.gif" alt="Bot" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                }`}
              >
                {message.type === "image" && message.attachment && (
                  <img 
                    src={message.attachment} 
                    alt="Uploaded" 
                    className="max-w-full rounded-lg mb-2"
                  />
                )}
                {message.type === "voice" && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-current rounded-full opacity-60"
                          style={{ height: `${Math.random() * 16 + 4}px` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {message.content}
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="/icons/uberfix-icon.gif" alt="Bot" />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="shrink-0 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-full text-foreground transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area with Media Buttons */}
      <div className="p-4 border-t border-border bg-background">
        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center justify-center gap-2 mb-3 py-2 px-4 bg-destructive/10 rounded-full">
            <span className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
            <span className="text-sm text-destructive font-medium">
              {isRTL ? `جاري التسجيل... ${recordingTime}ث` : `Recording... ${recordingTime}s`}
            </span>
          </div>
        )}
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2 items-center"
        >
          {/* Image Upload Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleImageUpload}
            className="shrink-0 text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            title={isRTL ? "رفع صورة" : "Upload image"}
          >
            <Camera className="w-5 h-5" />
          </Button>

          {/* Voice Record Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleVoiceRecord}
            className={`shrink-0 transition-all ${
              isRecording 
                ? "text-destructive bg-destructive/10 hover:bg-destructive/20" 
                : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            }`}
            title={isRTL ? "تسجيل صوتي" : "Record voice"}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
            className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-1 focus-visible:ring-secondary"
            disabled={isRecording}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isRecording}
            className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shrink-0"
          >
            <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          {isRTL ? "مدعوم بالذكاء الاصطناعي • رفع صور • رسائل صوتية" : "Powered by AI • Image upload • Voice messages"}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatBotPanel;

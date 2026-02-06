import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
}

interface ChatBotPanelProps {
  onClose: () => void;
}

const ChatBotPanel = ({ onClose }: ChatBotPanelProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: isRTL 
        ? "مرحباً! أنا مساعد UberFix الذكي. كيف يمكنني مساعدتك اليوم؟" 
        : "Hello! I'm UberFix AI Assistant. How can I help you today?",
      role: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: isRTL
          ? "شكراً لرسالتك! سيتم توصيلك بأحد ممثلي خدمة العملاء قريباً. يمكنك أيضاً الاتصال بنا مباشرة على 19XXX."
          : "Thank you for your message! You'll be connected to a customer service representative shortly. You can also call us directly at 19XXX.",
        role: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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
      className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
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

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
            className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-1 focus-visible:ring-secondary"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim()}
            className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shrink-0"
          >
            <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          {isRTL ? "مدعوم بالذكاء الاصطناعي" : "Powered by AI"}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatBotPanel;

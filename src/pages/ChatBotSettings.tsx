import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Bot, Key, Upload, FileText, Settings, Shield, Zap, Globe,
  Save, RefreshCw, Trash2, Plus, CheckCircle2, AlertCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface TrainingFile {
  id: string;
  name: string;
  size: string;
  status: "uploaded" | "processing" | "ready" | "error";
  uploadedAt: string;
}

const ChatBotSettings = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === "ar";

  const [apiProvider, setApiProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [modelId, setModelId] = useState("gpt-4");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [botName, setBotName] = useState("UberFix Assistant");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [maxTokens, setMaxTokens] = useState("2048");
  const [temperature, setTemperature] = useState("0.7");
  const [enableVoice, setEnableVoice] = useState(true);
  const [enableImages, setEnableImages] = useState(true);
  const [enableAutoReply, setEnableAutoReply] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [trainingFiles, setTrainingFiles] = useState<TrainingFile[]>([
    { id: "1", name: "company-faq.pdf", size: "2.3 MB", status: "ready", uploadedAt: "2025-01-15" },
    { id: "2", name: "services-catalog.docx", size: "1.8 MB", status: "ready", uploadedAt: "2025-01-20" },
    { id: "3", name: "pricing-guide.xlsx", size: "0.5 MB", status: "processing", uploadedAt: "2025-02-01" },
  ]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: isRTL ? "تم الحفظ بنجاح" : "Settings Saved",
        description: isRTL ? "تم تحديث إعدادات الشات بوت" : "Chatbot settings updated successfully",
      });
    }, 1500);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf,.doc,.docx,.txt,.csv,.xlsx,.json";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach((file) => {
          const newFile: TrainingFile = {
            id: Date.now().toString() + Math.random(),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            status: "uploaded",
            uploadedAt: new Date().toISOString().split("T")[0],
          };
          setTrainingFiles((prev) => [...prev, newFile]);
        });
        toast({
          title: isRTL ? "تم رفع الملفات" : "Files Uploaded",
          description: isRTL ? `تم رفع ${files.length} ملف بنجاح` : `${files.length} file(s) uploaded successfully`,
        });
      }
    };
    input.click();
  };

  const handleDeleteFile = (id: string) => {
    setTrainingFiles((prev) => prev.filter((f) => f.id !== id));
    toast({
      title: isRTL ? "تم حذف الملف" : "File Deleted",
      description: isRTL ? "تم حذف الملف من قاعدة التدريب" : "File removed from training data",
    });
  };

  const statusBadge = (status: TrainingFile["status"]) => {
    const map = {
      uploaded: { label: isRTL ? "مرفوع" : "Uploaded", variant: "secondary" as const },
      processing: { label: isRTL ? "قيد المعالجة" : "Processing", variant: "default" as const },
      ready: { label: isRTL ? "جاهز" : "Ready", variant: "outline" as const },
      error: { label: isRTL ? "خطأ" : "Error", variant: "destructive" as const },
    };
    const info = map[status];
    return <Badge variant={info.variant}>{info.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />
      <main className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {isRTL ? "إعدادات الشات بوت" : "Chatbot Settings"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isRTL ? "إدارة وتكوين مساعد UberFix الذكي" : "Manage and configure UberFix AI Assistant"}
              </p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1">
            <TabsTrigger value="api" className="flex items-center gap-2 py-2.5">
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">{isRTL ? "API والتوكن" : "API & Tokens"}</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2 py-2.5">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{isRTL ? "التدريب" : "Training"}</span>
            </TabsTrigger>
            <TabsTrigger value="behavior" className="flex items-center gap-2 py-2.5">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">{isRTL ? "السلوك" : "Behavior"}</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2 py-2.5">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{isRTL ? "عام" : "General"}</span>
            </TabsTrigger>
          </TabsList>

          {/* API & Tokens Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  {isRTL ? "مزود الذكاء الاصطناعي" : "AI Provider"}
                </CardTitle>
                <CardDescription>
                  {isRTL ? "اختر مزود الذكاء الاصطناعي وأدخل معرفات التشغيل" : "Select AI provider and enter credentials"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "مزود الخدمة" : "Provider"}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "openai", label: "OpenAI", icon: "🤖" },
                      { id: "google", label: "Google AI", icon: "🔍" },
                      { id: "custom", label: isRTL ? "مخصص" : "Custom", icon: "⚙️" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setApiProvider(p.id)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          apiProvider === p.id
                            ? "border-secondary bg-secondary/10"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{p.icon}</span>
                        <span className="text-sm font-medium">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "مفتاح API" : "API Key"}
                  </label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={isRTL ? "sk-xxxxxxxxxxxxxxxxxxxx" : "sk-xxxxxxxxxxxxxxxxxxxx"}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? "مفتاح API الخاص بك مشفر ومحمي" : "Your API key is encrypted and secured"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "معرف النموذج" : "Model ID"}
                  </label>
                  <Input
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    placeholder="gpt-4, gemini-pro, etc."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "رابط Webhook (اختياري)" : "Webhook URL (Optional)"}
                  </label>
                  <Input
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-api.com/webhook"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? "لتلقي إشعارات عند وصول رسائل جديدة" : "Receive notifications for new messages"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  {isRTL ? "معلمات النموذج" : "Model Parameters"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isRTL ? "الحد الأقصى للتوكنات" : "Max Tokens"}
                    </label>
                    <Input
                      type="number"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      min="256"
                      max="8192"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {isRTL ? "درجة الحرارة" : "Temperature"}
                    </label>
                    <Input
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      min="0"
                      max="2"
                      step="0.1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-secondary" />
                  {isRTL ? "رفع ملفات التدريب" : "Upload Training Files"}
                </CardTitle>
                <CardDescription>
                  {isRTL
                    ? "ارفع ملفات لتعليم الشات بوت عن خدماتك وأسعارك ومعلومات شركتك"
                    : "Upload files to train the chatbot about your services, pricing, and company info"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Zone */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleFileUpload}
                  className="w-full border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary hover:bg-secondary/5 transition-all"
                >
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-foreground font-medium mb-1">
                    {isRTL ? "اضغط لرفع الملفات" : "Click to upload files"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, TXT, CSV, XLSX, JSON — {isRTL ? "حتى 10 ميجابايت" : "up to 10MB"}
                  </p>
                </motion.button>

                {/* System Prompt */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "تعليمات النظام (System Prompt)" : "System Prompt"}
                  </label>
                  <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder={
                      isRTL
                        ? "أنت مساعد ذكي لشركة UberFix متخصص في خدمات الصيانة..."
                        : "You are an AI assistant for UberFix specialized in maintenance services..."
                    }
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL
                      ? "هذه التعليمات توجه سلوك الشات بوت في كل محادثة"
                      : "These instructions guide the chatbot's behavior in every conversation"}
                  </p>
                </div>

                {/* Files List */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    {isRTL ? "الملفات المرفوعة" : "Uploaded Files"}
                  </h4>
                  <div className="space-y-2">
                    {trainingFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.size} • {file.uploadedAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {statusBadge(file.status)}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavior Tab */}
          <TabsContent value="behavior" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "الردود والسلوك" : "Responses & Behavior"}</CardTitle>
                <CardDescription>
                  {isRTL ? "تخصيص طريقة رد الشات بوت" : "Customize how the chatbot responds"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "رسالة الترحيب" : "Welcome Message"}
                  </label>
                  <Textarea
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder={
                      isRTL
                        ? "مرحباً! أنا مساعد UberFix الذكي. كيف يمكنني مساعدتك اليوم؟"
                        : "Hello! I'm UberFix AI Assistant. How can I help you today?"
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "الردود السريعة" : "Quick Replies"}
                  </label>
                  <div className="space-y-2">
                    {[
                      isRTL ? "احجز خدمة صيانة" : "Book a service",
                      isRTL ? "أسعار الخدمات" : "Service pricing",
                      isRTL ? "تتبع طلبي" : "Track my order",
                      isRTL ? "تواصل مع الدعم" : "Contact support",
                    ].map((reply, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input defaultValue={reply} className="flex-1" />
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Plus className="w-4 h-4 me-2" />
                      {isRTL ? "إضافة رد سريع" : "Add Quick Reply"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "الإعدادات العامة" : "General Settings"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "اسم البوت" : "Bot Name"}
                  </label>
                  <Input
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {isRTL ? "اللغة الافتراضية" : "Default Language"}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "ar", label: "العربية 🇪🇬", icon: <Globe className="w-4 h-4" /> },
                      { id: "en", label: "English 🇬🇧", icon: <Globe className="w-4 h-4" /> },
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        className="p-3 rounded-xl border-2 border-secondary bg-secondary/10 text-center text-sm font-medium"
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { label: isRTL ? "تفعيل الرسائل الصوتية" : "Enable Voice Messages", state: enableVoice, set: setEnableVoice },
                    { label: isRTL ? "تفعيل رفع الصور" : "Enable Image Upload", state: enableImages, set: setEnableImages },
                    { label: isRTL ? "الرد التلقائي" : "Auto Reply", state: enableAutoReply, set: setEnableAutoReply },
                    { label: isRTL ? "الإشعارات" : "Notifications", state: enableNotifications, set: setEnableNotifications },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <Switch checked={item.state} onCheckedChange={item.set} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-end gap-3"
        >
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {isRTL ? "إعادة تعيين" : "Reset"}
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? (isRTL ? "جاري الحفظ..." : "Saving...") : (isRTL ? "حفظ الإعدادات" : "Save Settings")}
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatBotSettings;

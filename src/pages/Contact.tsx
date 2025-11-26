import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const nameRegex = /^[\u0621-\u064Aa-zA-Z\s]{2,100}$/;
    const phoneRegex = /^01[0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!nameRegex.test(formData.name.trim())) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى إدخال اسم صحيح (حروف فقط، من 2-100 حرف)",
        variant: "destructive",
      });
      return;
    }
    
    if (!phoneRegex.test(formData.phone.trim())) {
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يرجى إدخال رقم هاتف مصري صحيح (01xxxxxxxxx)",
        variant: "destructive",
      });
      return;
    }
    
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "خطأ في البريد الإلكتروني",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.message.trim().length < 10 || formData.message.trim().length > 1000) {
      toast({
        title: "خطأ في الرسالة",
        description: "يجب أن تكون الرسالة بين 10-1000 حرف",
        variant: "destructive",
      });
      return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `مرحباً، أنا ${formData.name.trim()}
الهاتف: ${formData.phone.trim()}
البريد: ${formData.email.trim()}

الرسالة:
${formData.message.trim()}`;

    const whatsappUrl = `https://wa.me/201090909006?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "تم إرسال الرسالة",
      description: "سيتم التواصل معك في أقرب وقت",
    });

    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-hero" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
              <Send className="w-4 h-4" />
              <span className="text-sm font-medium">تواصل معنا</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              نسعد <span className="text-secondary">بخدمتك</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              فريقنا جاهز للرد على استفساراتك وتقديم أفضل الحلول لاحتياجاتك
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 animate-slide-up">
              <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">الاسم</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="أدخل اسمك الكامل"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="01234567890"
                    maxLength={11}
                    pattern="01[0-9]{9}"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="example@email.com"
                    maxLength={255}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الرسالة</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    maxLength={1000}
                    minLength={10}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  إرسال عبر واتساب
                  <Send className="mr-2 h-4 w-4" />
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">اتصل بنا</h3>
                    <p className="text-muted-foreground">01090909006</p>
                    <p className="text-muted-foreground">01210101088</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground">info@al-azab.co</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">العنوان</h3>
                    <p className="text-muted-foreground">
                      شارع النصر، المعادي، القاهرة، مصر
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-secondary">
                <h3 className="font-bold text-lg mb-3 text-secondary-foreground">
                  ساعات العمل
                </h3>
                <div className="space-y-2 text-secondary-foreground/90">
                  <p>السبت - الخميس: 9:00 صباحاً - 6:00 مساءً</p>
                  <p>الجمعة: مغلق</p>
                  <p className="font-medium">خدمة الطوارئ: 24/7</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

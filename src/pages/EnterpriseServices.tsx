import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Clock, 
  BarChart3, 
  Brain, 
  Monitor,
  Zap,
  Thermometer,
  Droplets,
  Paintbrush,
  Shield,
  Warehouse,
  Settings,
  Truck,
  CheckCircle2,
  Users,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const EnterpriseServices = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    branchCount: "",
    email: "",
    phone: "",
    activity: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم استلام طلبك",
      description: "سيتواصل معك فريقنا خلال 24 ساعة",
    });
  };

  const features = [
    {
      icon: Clock,
      title: "متابعة البلاغات لحظيًا",
      description: "تتبع حالة جميع طلبات الصيانة في الوقت الفعلي مع إشعارات فورية",
      image: "/upload/shop-2.jpg"
    },
    {
      icon: MapPin,
      title: "تتبع الفني على الخريطة Live GPS",
      description: "راقب موقع الفني وتقدمه نحو الفرع مباشرة على الخريطة",
      image: "/upload/shop-3.jpg"
    },
    {
      icon: BarChart3,
      title: "نظام SLA احترافي",
      description: "معدلات استجابة محددة وتقييم أداء مستمر لضمان الجودة",
      image: "/upload/shop-4.jpg"
    },
    {
      icon: Monitor,
      title: "تقارير تنفيذية شهرية",
      description: "تحليلات شاملة لأداء الصيانة في جميع فروعك",
      image: "/upload/shop-5.jpg"
    },
    {
      icon: Brain,
      title: "إدارة الأعطال بالذكاء الاصطناعي",
      description: "توقع الأعطال قبل حدوثها وتحسين جداول الصيانة الوقائية",
      image: "/upload/shop-6.jpg"
    },
    {
      icon: Building2,
      title: "لوحة تحكم مركزية",
      description: "إدارة جميع فروعك من واجهة واحدة موحدة وسهلة الاستخدام",
      image: "/upload/shop-2.jpg"
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: "إرسال طلب الصيانة",
      description: "الفرع يُرسل طلب الصيانة عبر واجهة UberFix بنقرة واحدة"
    },
    {
      step: 2,
      title: "اختيار الفني الأنسب",
      description: "النظام يختار الفني الأقرب والأكثر خبرة تلقائيًا"
    },
    {
      step: 3,
      title: "تتبع حي للفني",
      description: "متابعة موقع الفني حتى وصوله باستخدام UberFix Map Tracking"
    },
    {
      step: 4,
      title: "إغلاق البلاغ",
      description: "توثيق العمل بصور قبل/بعد محفوظة على السحابة"
    }
  ];

  const services = [
    { icon: Zap, title: "كهرباء", description: "صيانة وإصلاح جميع الأعطال الكهربائية", image: "/upload/shop-2.jpg" },
    { icon: Thermometer, title: "تكييف وتبريد", description: "صيانة أنظمة التكييف والتبريد المركزي", image: "/upload/shop-3.jpg" },
    { icon: Droplets, title: "سباكة", description: "إصلاح التسريبات وصيانة شبكات المياه", image: "/upload/shop-5.jpg" },
    { icon: Paintbrush, title: "صيانة ديكور", description: "ترميم وإصلاح الديكورات الداخلية", image: "/upload/shop-6.jpg" },
    { icon: Shield, title: "مكافحة الحريق", description: "صيانة أنظمة الإطفاء والإنذار", image: "/upload/shop-4.jpg" },
    { icon: Warehouse, title: "صيانة المخازن", description: "أرفف ورافعات ومعدات التخزين", image: "/upload/shop-2.jpg" },
    { icon: Settings, title: "معدات التشغيل", description: "صيانة الأجهزة والمعدات التجارية", image: "/upload/shop-5.jpg" },
    { icon: Truck, title: "تركيب ونقل الفروع", description: "خدمات النقل والتركيب للفروع الجديدة", image: "/upload/shop-6.jpg" }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/upload/shop-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-8">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">حلول الشركات والمؤسسات</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              UberFix: نظام صيانة متكامل
              <span className="block text-primary mt-2">لإدارة فروعك التجارية</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
              متابعة، تتبع، تشغيل، وصيانة لجميع فروعك من مكان واحد
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-10 py-6 rounded-xl shadow-glow"
              >
                ابدأ الآن
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="hero"
                className="text-lg px-10 py-6 rounded-xl"
              >
                تجربة لوحة التحكم
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: "+300", label: "فرع نُديره" },
                { value: "+50", label: "شركة شريكة" },
                { value: "24/7", label: "دعم متواصل" },
                { value: "99%", label: "رضا العملاء" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              المزايا الاحترافية
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              كل ما تحتاجه لإدارة الصيانة
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              منصة متكاملة صُممت خصيصًا لتلبية احتياجات الشركات الكبرى
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden h-full border-0 shadow-medium hover:shadow-elevated transition-all duration-500">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${feature.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                  
                  <CardContent className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[280px]">
                    <div className="bg-primary/20 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-primary/30">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              آلية العمل
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              كيف يعمل النظام؟
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              4 خطوات بسيطة لإدارة صيانة فروعك بكفاءة عالية
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform -translate-y-1/2" />
              
              <div className="grid md:grid-cols-4 gap-8">
                {workflowSteps.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="bg-background rounded-2xl p-6 shadow-medium border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elevated">
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow">
                          <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3 text-center">{item.title}</h3>
                        <p className="text-muted-foreground text-center text-sm">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/upload/shop-4.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  قصة نجاح
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  ندير أكثر من 300 فرع لكبار عملائنا
                </h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  نفتخر بشراكتنا مع سلاسل تجارية رائدة مثل أبو عوف، Carrefour، HyperOne، وغيرهم.
                  نوفر سرعة استجابة استثنائية، تقارير أداء شاملة، وأرشفة كاملة للصور والعمليات.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: CheckCircle2, text: "استجابة خلال ساعة" },
                    { icon: CheckCircle2, text: "تقارير يومية" },
                    { icon: CheckCircle2, text: "أرشفة سحابية" },
                    { icon: CheckCircle2, text: "دعم 24/7" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-white/90">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  اعرف المزيد
                </Button>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <img 
                    src="/upload/uberfix-maps.png" 
                    alt="UberFix Dashboard" 
                    className="rounded-xl shadow-elevated w-full"
                  />
                  <div className="mt-4 flex items-center justify-between text-white/70 text-sm">
                    <span>لوحة تحكم UberFix</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      متصل الآن
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Catalog Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              خدماتنا
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              الخدمات المقدمة
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              تغطية شاملة لجميع احتياجات الصيانة في منشأتك
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group relative overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-primary/90 transition-all duration-300" />
                  
                  <CardContent className="relative z-10 p-6 min-h-[200px] flex flex-col justify-end">
                    <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-white/70 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Onboarding Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/upload/shop-5.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/80" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                للشركات والمؤسسات
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                شغّل الصيانة في شركتك يبدأ من هنا
              </h2>
              <p className="text-white/70 text-lg">
                سجّل الآن وانضم لأكثر من 50 شركة تثق في UberFix
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">اسم الشركة</label>
                  <Input 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="مثال: شركة أبو عوف"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">عدد الفروع</label>
                  <Input 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="مثال: 50 فرع"
                    value={formData.branchCount}
                    onChange={(e) => setFormData({...formData, branchCount: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">البريد الرسمي</label>
                  <Input 
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">رقم مسؤول التشغيل</label>
                  <Input 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="+20 1xx xxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white/90 mb-2 text-sm font-medium">نشاط الشركة</label>
                <Input 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="مثال: سلسلة محلات تجزئة"
                  value={formData.activity}
                  onChange={(e) => setFormData({...formData, activity: e.target.value})}
                />
              </div>

              <div className="mb-8">
                <label className="block text-white/90 mb-2 text-sm font-medium">ملاحظات إضافية</label>
                <Textarea 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                  placeholder="أي متطلبات خاصة أو استفسارات..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <Button 
                type="submit"
                size="lg" 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6 rounded-xl shadow-glow"
              >
                <Users className="ml-2 w-5 h-5" />
                تفعيل حساب الشركة
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">يثق بنا كبار العملاء</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {["أبو عوف", "Carrefour", "HyperOne", "Fresh Food Market", "مول مصر"].map((brand, index) => (
              <span key={index} className="text-xl md:text-2xl font-bold text-foreground/50">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterpriseServices;

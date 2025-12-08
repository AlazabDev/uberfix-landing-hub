import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, MapPin, TrendingUp, Sparkles, Shield, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [counters, setCounters] = useState({
    branches: 0,
    technicians: 0,
    cities: 0,
    satisfaction: 0
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const targets = {
      branches: 250,
      technicians: 500,
      cities: 15,
      satisfaction: 98
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        branches: Math.floor(targets.branches * progress),
        technicians: Math.floor(targets.technicians * progress),
        cities: Math.floor(targets.cities * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary" dir="rtl">
      {/* Simple Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-secondary/15 rounded-full blur-3xl" />

      {/* Floating Icons */}
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute top-32 right-[15%] hidden lg:block"
      >
        <div className="w-16 h-16 bg-primary-foreground/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-primary-foreground/20">
          <Shield className="w-8 h-8 text-primary-foreground" />
        </div>
      </motion.div>
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-40 left-[12%] hidden lg:block"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-14 h-14 bg-secondary/90 rounded-2xl flex items-center justify-center">
          <Clock className="w-7 h-7 text-primary" />
        </div>
      </motion.div>
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute top-48 left-[20%] hidden lg:block"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 bg-secondary text-primary px-5 py-2.5 rounded-full mb-8 font-bold">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm tracking-wide">إدارة صيانة العلامات التجارية وسلاسل الإمداد</span>
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight">
              <span className="relative inline-block">
                <span className="text-secondary">
                  UberFix
                </span>
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-secondary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <br />
              <span className="text-primary-foreground text-5xl md:text-6xl font-bold mt-4 block">
                حلول صيانة وتشغيل ذكية
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-primary-foreground/80 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            نظام متكامل لإدارة صيانة فروع العلامات التجارية الكبرى في مصر
            <br />
            <span className="text-secondary font-bold text-lg md:text-xl inline-flex items-center gap-2 mt-2">
              <Building2 className="w-5 h-5" />
              من شركة العزب المعمارية - الريادة في إدارة الصيانة الاحترافية
            </span>
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-primary shadow-xl group px-8 py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => window.open('https://uberfix.shop', '_blank')}
            >
              ابدأ الآن مجاناً
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => window.open('https://uberfix.shop/about', '_blank')}
            >
              <MapPin className="ml-2 h-5 w-5" />
              شاهد الخريطة التفاعلية
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-6 mb-16 text-primary-foreground/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm">خدمة على مدار الساعة</span>
            </div>
            <div className="w-px h-4 bg-primary-foreground/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm">ضمان جودة الخدمة</span>
            </div>
            <div className="w-px h-4 bg-primary-foreground/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm">فنيين معتمدين</span>
            </div>
          </motion.div>
          
          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            <StatCard 
              icon={<MapPin className="w-7 h-7" />}
              value={counters.branches}
              label="موقع نشط"
              color="primary"
              prefix="+"
              delay={0}
            />
            <StatCard 
              icon={<Users className="w-7 h-7" />}
              value={counters.technicians}
              label="فني محترف"
              color="secondary"
              prefix="+"
              delay={0.1}
            />
            <StatCard 
              icon={<Building2 className="w-7 h-7" />}
              value={counters.cities}
              label="مدينة مصرية"
              color="accent"
              delay={0.2}
            />
            <StatCard 
              icon={<TrendingUp className="w-7 h-7" />}
              value={counters.satisfaction}
              label="رضا العملاء"
              color="primary"
              suffix="%"
              delay={0.3}
            />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'primary' | 'secondary' | 'accent';
  prefix?: string;
  suffix?: string;
  delay?: number;
}

const StatCard = ({ icon, value, label, color, prefix = '', suffix = '', delay = 0 }: StatCardProps) => {
  const isSecondary = color === 'secondary' || color === 'accent';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.5 }}
      className="group"
    >
      <div className={`relative rounded-2xl p-6 border-2 transition-all duration-500 hover:-translate-y-2 ${
        isSecondary 
          ? 'bg-secondary text-primary border-secondary' 
          : 'bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:border-primary-foreground/40'
      }`}>
        <div className="mb-3 mx-auto w-fit">
          {icon}
        </div>
        <div className="text-3xl md:text-4xl font-black mb-1 tabular-nums">
          {prefix}{value.toLocaleString()}{suffix}
        </div>
        <div className={`text-sm font-medium ${isSecondary ? 'text-primary/70' : 'text-primary-foreground/70'}`}>{label}</div>
      </div>
    </motion.div>
  );
};

const ArrowLeft = ({ className }: { className?: string }) => (
  <ArrowRight className={className} style={{ transform: 'scaleX(-1)' }} />
);

export default Hero;

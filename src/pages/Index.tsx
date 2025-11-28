import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FounderLight from "@/components/FounderLight";
import GlobalMap from "@/components/GlobalMap";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Statistics />
      <Features />
      <HowItWorks />
      <Services />
      <About />
      <Testimonials />
      <FounderLight />
      <GlobalMap />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;

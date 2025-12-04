import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AboutPage from "./pages/AboutPage";
import Branches from "./pages/Branches";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import TechnicianLanding from "./pages/TechnicianLanding";
import Partners from "./pages/Partners";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import QualityStandards from "./pages/QualityStandards";
import LuxuryFinishing from "./pages/LuxuryFinishing";
import BrandIdentity from "./pages/BrandIdentity";
import LabnElAsfor from "./pages/LabnElAsfor";
import LiveMap from "./pages/LiveMap";
import EnterpriseServices from "./pages/EnterpriseServices";
import MaterialsPricing from "./pages/MaterialsPricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/technicians" element={<TechnicianLanding />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/quality-standards" element={<QualityStandards />} />
          <Route path="/luxury-finishing" element={<LuxuryFinishing />} />
          <Route path="/brand-identity" element={<BrandIdentity />} />
          <Route path="/labn-el-asfor" element={<LabnElAsfor />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/enterprise" element={<EnterpriseServices />} />
          <Route path="/pricing" element={<MaterialsPricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Navbar } from "@/components/landing/navbar";
import {
  HeroSection,
  FeaturesSection,
  MockTestSection,
  AnalyticsSection,
  TestimonialsSection,
  PricingSection,
  FooterSection,
  ChatbotFab,
} from "@/components/landing/landing-sections";

export default function HomePage() {
  return (
    <main className="gradient-bg min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MockTestSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
      <ChatbotFab />
    </main>
  );
}

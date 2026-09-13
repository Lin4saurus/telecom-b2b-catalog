import { Hero } from "./components/Hero";
import { PartnersStrip } from "./components/PartnersStrip";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { StatsSection } from "./components/StatsSection";
import { TestimonialsCarousel } from "./components/TestimonialsCarousel";
import { ScrollReveal } from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnersStrip />
      <ScrollReveal>
        <FeatureHighlights />
      </ScrollReveal>
      <ScrollReveal>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsCarousel />
      </ScrollReveal>
    </>
  );
}

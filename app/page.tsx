import { Hero } from "./components/Hero";
import { PartnersStrip } from "./components/PartnersStrip";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { StatsSection } from "./components/StatsSection";
import { TestimonialsCarousel } from "./components/TestimonialsCarousel";
import { ScrollReveal } from "./components/ScrollReveal";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { CatalogCTA } from "./components/CatalogCTA";

// La landing pasa a ser dinámica desde el M28 porque "Productos destacados"
// lee el catálogo real de Supabase en cada visita (mismo criterio que
// /catalog, /catalog/[id], /quote y /compare).
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnersStrip />
      <ScrollReveal>
        <FeaturedProducts />
      </ScrollReveal>
      <ScrollReveal>
        <FeatureHighlights />
      </ScrollReveal>
      <ScrollReveal>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsCarousel />
      </ScrollReveal>
      <ScrollReveal>
        <CatalogCTA />
      </ScrollReveal>
    </>
  );
}

import type { Metadata } from "next";
import { AboutHero } from "../components/AboutHero";
import { CompanyIntro } from "../components/CompanyIntro";
import { CompanyTimeline } from "../components/CompanyTimeline";
import { WhatWeDo } from "../components/WhatWeDo";
import { HowWeWork } from "../components/HowWeWork";
import { MissionVisionPurpose } from "../components/MissionVisionPurpose";
import { ValuesGrid } from "../components/ValuesGrid";
import { CoverageSection } from "../components/CoverageSection";
import { CapabilitiesSection } from "../components/CapabilitiesSection";
import { StatsSection } from "../components/StatsSection";
import { AboutCTA } from "../components/AboutCTA";
import { ScrollReveal } from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Nosotros | Telesev Group",
  description:
    "Conocé a Telesev Group: mayorista B2B de fibra óptica y redes GPON. Nuestra historia, misión, valores y cobertura en el Cono Sur.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ScrollReveal>
        <CompanyIntro />
      </ScrollReveal>
      <ScrollReveal>
        <CompanyTimeline />
      </ScrollReveal>
      <ScrollReveal>
        <WhatWeDo />
      </ScrollReveal>
      <ScrollReveal>
        <HowWeWork />
      </ScrollReveal>
      <ScrollReveal>
        <MissionVisionPurpose />
      </ScrollReveal>
      <ScrollReveal>
        <ValuesGrid />
      </ScrollReveal>
      <ScrollReveal>
        <CoverageSection />
      </ScrollReveal>
      <ScrollReveal>
        <CapabilitiesSection />
      </ScrollReveal>
      <ScrollReveal>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal>
        <AboutCTA />
      </ScrollReveal>
    </>
  );
}

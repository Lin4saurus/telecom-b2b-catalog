import type { Metadata } from "next";
import { IndustriesHero } from "../components/IndustriesHero";
import { IndustryIntro } from "../components/IndustryIntro";
import { IndustryIndex } from "../components/IndustryIndex";
import {
  IndustrySolutionSection,
  type IndustrySolutionSectionProps,
} from "../components/IndustrySolutionSection";
import { IndustryComparisonTable } from "../components/IndustryComparisonTable";
import { IndustryProcess } from "../components/IndustryProcess";
import { IndustriesCTA } from "../components/IndustriesCTA";
import { ScrollReveal } from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Soluciones por industria | Telesev Group",
  description:
    "Cómo Telesev Group adapta el equipamiento de fibra óptica y redes GPON a ISPs, energía y utilities, gobierno y empresas.",
};

const industries: (Omit<IndustrySolutionSectionProps, "className"> & {
  className: string;
})[] = [
  {
    id: "isps-operadores",
    index: "01",
    title: "ISPs y operadores",
    description:
      "Los proveedores de internet necesitan desplegar redes FTTH que puedan crecer sin rehacer la infraestructura a medida que suman abonados.",
    image: "/images/industry-isp.jpg",
    imageAlt: "Técnico trabajando en el despliegue de una red de fibra FTTH",
    challenges: [
      "Escalar la red a medida que suman abonados",
      "Mantener el costo de despliegue bajo control",
      "Elegir equipamiento compatible entre sí",
    ],
    solutions: [
      "OLTs y ONTs GPON de distintas capacidades",
      "Splitters y cajas de distribución para la red externa",
      "Cables de fibra para tendidos aéreos y subterráneos",
    ],
    benefits: [
      {
        title: "Escalabilidad",
        description:
          "Equipamiento pensado para crecer junto con la base de abonados.",
      },
      {
        title: "Compatibilidad",
        description: "Combinaciones de marcas ya probadas entre sí.",
      },
      {
        title: "Disponibilidad",
        description: "Acceso rápido a los equipos más solicitados.",
      },
    ],
    ctaHref: "/catalog",
    ctaLabel: "Ver catálogo completo",
    className: "bg-white",
  },
  {
    id: "energia-utilities",
    index: "02",
    title: "Energía y utilities",
    description:
      "Las empresas de energía y utilities necesitan redes ópticas robustas para telemetría, monitoreo remoto y comunicaciones en infraestructura crítica, muchas veces en condiciones exigentes.",
    image: "/images/industry-energy.jpg",
    imageAlt: "Tendido de fibra óptica en infraestructura de energía a la intemperie",
    challenges: [
      "Distancias largas entre puntos de la red",
      "Instalaciones a la intemperie y en exteriores",
      "Necesidad de continuidad del servicio",
    ],
    solutions: [
      "Cables de fibra óptica resistentes para exteriores",
      "Equipamiento con montajes para gabinetes exteriores",
      "Componentes pasivos para tendidos extensos",
    ],
    benefits: [
      {
        title: "Confiabilidad",
        description: "Equipamiento elegido para condiciones exigentes.",
      },
      {
        title: "Cobertura",
        description: "Componentes pensados para tendidos de larga distancia.",
      },
      {
        title: "Soporte técnico",
        description:
          "Asesoramiento en el diseño de instalaciones exteriores.",
      },
    ],
    ctaHref: "/contact",
    ctaLabel: "Hablar con un especialista",
    reversed: true,
    className: "bg-slate-50",
  },
  {
    id: "gobierno-sector-publico",
    index: "03",
    title: "Gobierno y sector público",
    description:
      "Los proyectos de conectividad en el sector público suelen involucrar múltiples sedes, presupuestos por etapas y procesos administrativos propios: por eso ofrecemos fichas técnicas claras y cotizaciones flexibles para acompañar cada etapa.",
    image: "/images/industry-government.jpg",
    imageAlt: "Instalación de red de fibra óptica en un edificio público",
    challenges: [
      "Coordinar múltiples sedes o dependencias",
      "Planificar el despliegue por etapas",
      "Necesidad de documentación técnica clara",
    ],
    solutions: [
      "Fichas técnicas completas de cada producto",
      "Cotizaciones por etapas o por sede",
      "Asesoramiento para planificar el despliegue",
    ],
    benefits: [
      {
        title: "Documentación clara",
        description: "Fichas técnicas y especificaciones a disposición.",
      },
      {
        title: "Flexibilidad",
        description: "Cotizaciones adaptadas al avance del proyecto.",
      },
      {
        title: "Asesoramiento",
        description: "Acompañamiento en cada etapa de planificación.",
      },
    ],
    ctaHref: "/contact",
    ctaLabel: "Hablar con un especialista",
    className: "bg-white",
  },
  {
    id: "empresas-instituciones",
    index: "04",
    title: "Empresas e instituciones",
    description:
      "Las empresas e instituciones necesitan redes internas confiables para conectar oficinas, sistemas de videovigilancia y centros de datos propios.",
    image: "/images/industry-enterprise.jpg",
    imageAlt: "Rack de red interna en una oficina corporativa",
    challenges: [
      "Conectar el backbone entre edificios o pisos",
      "Redes internas para oficinas y videovigilancia",
      "Renovar infraestructura de red existente",
    ],
    solutions: [
      "Cables y patch panels para redes internas",
      "Equipamiento para backbone de fibra óptica",
      "Herramientas de instalación y testing",
    ],
    benefits: [
      {
        title: "Conectividad interna",
        description: "Componentes para backbone y redes de oficina.",
      },
      {
        title: "Modernización",
        description: "Equipamiento para renovar infraestructura existente.",
      },
      {
        title: "Cotización rápida",
        description: "Propuestas ágiles para proyectos internos.",
      },
    ],
    ctaHref: "/quote",
    ctaLabel: "Solicitar cotización",
    reversed: true,
    className: "bg-slate-50",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <IndustriesHero />

      <div id="industrias" className="scroll-mt-20">
        <ScrollReveal>
          <IndustryIntro />
        </ScrollReveal>
        <IndustryIndex />
      </div>

      {industries.map((industry) => (
        <ScrollReveal key={industry.id}>
          <IndustrySolutionSection {...industry} />
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <IndustryComparisonTable />
      </ScrollReveal>
      <ScrollReveal>
        <IndustryProcess />
      </ScrollReveal>
      <ScrollReveal>
        <IndustriesCTA />
      </ScrollReveal>
    </>
  );
}

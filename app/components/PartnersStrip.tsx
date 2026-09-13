import { PartnerLogo } from "./PartnerLogo";

const partners = [
  { name: "Kontron", src: "/images/partner-kontron.png" },
  { name: "Iskratel", src: "/images/partner-iskratel.png" },
  { name: "C-Data", src: "/images/partner-cdata.png" },
];

// Se duplica la lista para lograr un loop continuo sin cortes.
const loopPartners = [...partners, ...partners];

export function PartnersStrip() {
  return (
    <section className="border-b border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          Marcas con las que trabajamos
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-partners-scroll items-center gap-16 hover:[animation-play-state:paused]">
            {loopPartners.map((partner, index) => (
              <PartnerLogo
                key={`${partner.name}-${index}`}
                name={partner.name}
                src={partner.src}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

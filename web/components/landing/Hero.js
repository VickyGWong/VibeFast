import Link from "next/link"
import { ArrowRight } from "lucide-react"
import config from "@/config"
import WhatsAppButton from "@/components/landing/WhatsAppButton"
import { HeroImage } from "@/components/landing/ProductImage"

export default function Hero() {
  const { eyebrow, title, subtitle, cta, ctaSecondary, trust } = config.landing.hero

  return (
    <section className="hero-sky relative overflow-hidden text-cream">
      <div className="bubble-field absolute inset-0" aria-hidden>
        {[12, 28, 45, 62, 78, 88].map((left, i) => (
          <span
            key={left}
            className="bubble bg-cream/20"
            style={{
              left: `${left}%`,
              bottom: "-10%",
              width: `${14 + i * 5}px`,
              height: `${14 + i * 5}px`,
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-cream/80">
            {eyebrow}
          </p>
          <h1 className="font-brand mt-4 text-balance text-4xl leading-tight tracking-tight text-cream md:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 md:text-xl">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cta.href}
              className="btn min-h-12 gap-2 rounded-full border-0 bg-coral px-6 font-ui font-bold text-cream hover:bg-coral/90"
            >
              {cta.label}
              <ArrowRight className="size-4" />
            </Link>
            {ctaSecondary?.href === "whatsapp" && (
              <WhatsAppButton source="hero" label="Pedir por WhatsApp" />
            )}
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-cream/90 md:text-base">
                <span className="size-2 shrink-0 rounded-full bg-yellow" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-cream/20">
            <HeroImage
              src="/images/hero-fermentos.jpg"
              alt="Botellas de fermentos artesanales The Good Co. en Chihuahua"
            />
          </div>
          <div className="absolute -bottom-3 left-4 flex flex-wrap gap-2 md:left-6">
            <span className="rounded-full bg-cream px-4 py-2 font-display text-sm font-bold text-deep shadow-md">
              Kombucha
            </span>
            <span className="rounded-full bg-cream px-4 py-2 font-display text-sm font-bold text-deep shadow-md">
              Tíbicos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

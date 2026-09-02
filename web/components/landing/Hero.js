import Link from "next/link"
import { ArrowRight, Leaf, MapPin, Sparkles } from "lucide-react"
import config from "@/config"
import WhatsAppButton from "@/components/landing/WhatsAppButton"
import { HeroImage } from "@/components/landing/ProductImage"

const trustIcons = [Leaf, MapPin, Sparkles]

export default function Hero() {
  const { eyebrow, title, subtitle, cta, ctaSecondary, trust } = config.landing.hero

  return (
    <section className="relative overflow-hidden">
      <div className="bubble-field absolute inset-0 -z-10" aria-hidden>
        {[12, 28, 45, 62, 78, 88].map((left, i) => (
          <span
            key={left}
            className="bubble"
            style={{
              left: `${left}%`,
              bottom: "-10%",
              width: `${12 + i * 4}px`,
              height: `${12 + i * 4}px`,
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-bold tracking-tight text-deep md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-deep/75 md:text-xl">{subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={cta.href} className="btn btn-primary min-h-11 gap-2 rounded-full px-6 font-display font-bold">
              {cta.label}
              <ArrowRight className="size-4" />
            </Link>
            {config.landing.hero.ctaOnline && (
              <Link
                href={config.landing.hero.ctaOnline.href}
                className="btn btn-outline min-h-11 rounded-full border-deep/25 bg-base-100 px-6 font-display font-bold text-deep hover:border-deep hover:bg-base-200"
              >
                {config.landing.hero.ctaOnline.label}
              </Link>
            )}
            {ctaSecondary?.href === "whatsapp" && (
              <WhatsAppButton
                source="hero"
                label="WhatsApp"
                className="btn-outline border-coral/30 bg-base-100 text-deep hover:border-coral hover:bg-base-200"
              />
            )}
          </div>

          <ul className="mt-8 space-y-3">
            {trust.map((item, i) => {
              const Icon = trustIcons[i] || Leaf
              return (
                <li key={item} className="flex items-center gap-3 text-sm text-deep/80 md:text-base">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                    <Icon className="size-4" />
                  </span>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-base-300 shadow-xl">
          <HeroImage
            src="/images/hero-fermentos.jpg"
            alt="Botellas de fermentos artesanales The Good Co. en Chihuahua"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-cream/95 p-4 backdrop-blur">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-sky">
              Destacado
            </p>
            <p className="font-display mt-1 text-lg font-bold text-deep">Kéfir natural</p>
            <p className="text-sm text-deep/70">500 ml · $95 MXN</p>
          </div>
        </div>
      </div>
    </section>
  )
}

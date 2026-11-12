import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import config from "@/config"

export default function FinalCta() {
  const { eyebrow, title, subtitle, cta, ctaOnline } = config.landing.finalCta

  return (
    <section id="novedades" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="rounded-[2rem] bg-gradient-to-br from-sky via-sky to-sky/80 px-6 py-12 text-center text-cream md:px-12 md:py-16">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-cream/80">
          {eyebrow}
        </p>
        <h2 className="font-display mt-3 text-balance text-3xl font-bold md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/85">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {cta && (
            <Link
              href={cta.href}
              className="btn btn-lg min-h-12 gap-2 rounded-full border-0 bg-yellow font-ui font-bold text-deep hover:bg-yellow/85"
            >
              <ShoppingBag className="size-5" aria-hidden />
              {cta.label}
            </Link>
          )}
          {ctaOnline && ctaOnline.href !== cta?.href && (
            <Link
              href={ctaOnline.href}
              className="btn btn-lg min-h-12 rounded-full border-0 bg-cream font-ui font-bold text-deep hover:bg-cream/90"
            >
              {ctaOnline.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

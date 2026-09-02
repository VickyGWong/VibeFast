import Link from "next/link"
import config from "@/config"
import WhatsAppButton from "@/components/landing/WhatsAppButton"

export default function FinalCta() {
  const { eyebrow, title, subtitle, cta, ctaOnline } = config.landing.finalCta

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="rounded-3xl bg-gradient-to-br from-sky via-sky/90 to-deep px-6 py-12 text-center text-cream md:px-12 md:py-16">
        <p className="font-display text-sm font-bold uppercase tracking-wider text-cream/80">
          {eyebrow}
        </p>
        <h2 className="font-display mt-3 text-balance text-3xl font-bold md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/85">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ctaOnline && (
            <Link
              href={ctaOnline.href}
              className="btn btn-lg min-h-12 rounded-full border-0 bg-cream font-display font-bold text-deep hover:bg-cream/90"
            >
              {ctaOnline.label}
            </Link>
          )}
          {cta.href === "whatsapp" && (
            <WhatsAppButton
              source="final_cta"
              label="Pedir por WhatsApp"
              className="btn-lg border-0 bg-coral text-cream hover:bg-coral/90"
            />
          )}
        </div>
      </div>
    </section>
  )
}

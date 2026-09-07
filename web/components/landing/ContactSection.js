import Link from "next/link"
import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import config from "@/config"
import WhatsAppButton from "@/components/landing/WhatsAppButton"
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp"

const details = [
  {
    label: "WhatsApp",
    value: config.contact.whatsappDisplay,
    href: getGeneralWhatsAppUrl(),
    external: true,
    icon: Phone,
  },
  {
    label: "Instagram",
    value: config.contact.instagramHandle,
    href: config.contact.instagram,
    external: true,
    icon: Instagram,
  },
  {
    label: "Email",
    value: config.contact.email,
    href: `mailto:${config.contact.email}`,
    external: false,
    icon: Mail,
  },
  {
    label: "Ubicación",
    value: `${config.contact.city}, México • CP ${config.contact.postalCode}`,
    href: null,
    external: false,
    icon: MapPin,
  },
]

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-cream py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <p className="font-ui text-sm font-bold uppercase tracking-[0.18em] text-sky">Contacto</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-5xl">
            Hablemos por WhatsApp
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-deep/70">
            Te ofrecemos una atención cercana y personalizada: resolvemos dudas, te orientamos
            según lo que buscas y coordinamos tu pedido con calma.
          </p>
          <div className="mt-8">
            <WhatsAppButton source="contact" label="WhatsApp" />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-base-300/70 bg-white p-6 shadow-sm md:p-8">
          <ul className="space-y-6">
            {details.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sky/10 text-sky">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-deep">{item.label}</p>
                    <p className="mt-0.5 text-deep/65">{item.value}</p>
                  </div>
                </div>
              )

              if (!item.href) {
                return <li key={item.label}>{content}</li>
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="block rounded-2xl transition hover:bg-cream/80"
                  >
                    {content}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

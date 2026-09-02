import Link from "next/link"
import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import config from "@/config"
import WhatsAppButton from "@/components/landing/WhatsAppButton"
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp"

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-base-200/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
              Contacto
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
              Hablemos por WhatsApp
            </h2>
            <p className="mt-4 text-deep/70">
              Cuéntanos qué buscas, cuántas botellas necesitas y te confirmamos sabores, precios y
              entrega en Chihuahua.
            </p>
            <div className="mt-8">
              <WhatsAppButton source="contact" />
            </div>
          </div>

          <ul className="space-y-5 rounded-3xl border border-base-300 bg-base-100 p-6">
            <li className="flex items-start gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-sky" aria-hidden />
              <div>
                <p className="font-display font-bold text-deep">WhatsApp</p>
                <Link
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep/70 hover:text-sky"
                >
                  {config.contact.whatsappDisplay}
                </Link>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Instagram className="mt-1 size-5 shrink-0 text-sky" aria-hidden />
              <div>
                <p className="font-display font-bold text-deep">Instagram</p>
                <Link
                  href={config.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep/70 hover:text-sky"
                >
                  {config.contact.instagramHandle}
                </Link>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 size-5 shrink-0 text-sky" aria-hidden />
              <div>
                <p className="font-display font-bold text-deep">Email</p>
                <a href={`mailto:${config.contact.email}`} className="text-deep/70 hover:text-sky">
                  {config.contact.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-sky" aria-hidden />
              <div>
                <p className="font-display font-bold text-deep">Ubicación</p>
                <p className="text-deep/70">
                  {config.contact.city}, México · CP {config.contact.postalCode}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

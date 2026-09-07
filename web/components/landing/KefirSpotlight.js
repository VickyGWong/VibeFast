import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import ProductImage from "@/components/landing/ProductImage"
import { getProductWhatsAppUrl } from "@/lib/whatsapp"
import { products } from "@/data/products"

const attributes = [
  "Consistencia cremosa y textura tipo yogurt griego, suave y bebible.",
  "Elaborado con leche entera adicionada con vitaminas, libre de hormonas, con certificación Kosher, y búlgaros vivos.",
  "Naturalmente bajo en lactosa.",
  "Sin conservadores.",
  "Cultivo vivo elaborado en lotes pequeños en Chihuahua.",
]

export default function KefirSpotlight() {
  const kefir = products.find((product) => product.id === "kefir-natural")
  const whatsappUrl = kefir ? getProductWhatsAppUrl(kefir) : "#"

  return (
    <section id="kefir-spotlight" className="bg-yellow py-16 text-deep md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-xl">
          <ProductImage
            src="/images/kefir-natural.jpg"
            alt="Kéfir natural artesanal The Good Co. en botella de 500 ml"
            category="kefir"
          />
        </div>
        <div>
          <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-deep/70">
            Nuestra recomendación para empezar
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold leading-tight md:text-5xl">
            Sin prisas, solo ingredientes naturales y paciencia
          </h2>
          <p className="mt-4 leading-relaxed text-deep/75">
            Nuestro kéfir natural es cremoso, vivo y honesto. Lo elaboramos con cultivo activo y
            tiempos que respetan la fermentación — nada de prisa, nada de sabor artificial.
          </p>
          <ul className="mt-8 space-y-3">
            {attributes.map((item) => (
              <li key={item} className="flex gap-3 text-deep/85">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-deep" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-price mt-8 text-lg font-bold">
            Presentación 500 ml / 390 g · $95 MXN
          </p>
          <div className="mt-5">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn min-h-12 rounded-full border-0 bg-deep px-6 font-ui font-bold text-cream hover:bg-deep/90"
            >
              Pedir kéfir natural
            </Link>
          </div>
          <p className="mt-6 max-w-md text-[11px] leading-relaxed text-deep/60">
            *Las opciones endulzadas se endulzan con edulcorantes naturales.
          </p>
        </div>
      </div>
    </section>
  )
}

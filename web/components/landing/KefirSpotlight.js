import { CheckCircle2 } from "lucide-react"
import ProductImage from "@/components/landing/ProductImage"

const attributes = [
  "Cultivo vivo elaborado en lotes pequeños en Chihuahua",
  "Probióticos naturales sin pasteurizar",
  "Ingredientes reales: leche, fruta y fermento, sin atajos",
  "Textura cremosa y sabor equilibrado, endulzado o sin endulzar",
  "Botella de 500 ml lista para tu rutina diaria",
]

export default function KefirSpotlight() {
  return (
    <section id="kefir-spotlight" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-base-300">
          <ProductImage
            src="/images/kefir-natural.jpg"
            alt="Kéfir natural artesanal The Good Co. en botella de 500 ml"
            category="kefir"
          />
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
            Kéfir spotlight
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
            Cremoso, vivo y honesto
          </h2>
          <p className="mt-4 leading-relaxed text-deep/70">
            Nuestro kéfir natural es el fermento con el que muchas personas descubren The Good Co.
            Lo elaboramos con cultivo activo y tiempos que respetan la fermentación — nada de prisa,
            nada de sabor artificial.
          </p>
          <ul className="mt-8 space-y-4">
            {attributes.map((item) => (
              <li key={item} className="flex gap-3 text-deep/80">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

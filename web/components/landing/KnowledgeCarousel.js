"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    eyebrow: "Definición",
    title: "¿Qué es un fermento?",
    body: "Según la Real Academia Española, un fermento es tanto la sustancia que provoca la fermentación como el producto obtenido por ella. En ciencia de alimentos, un panel internacional de la ISAPP define los alimentos fermentados como aquellos elaborados mediante el crecimiento microbiano deseado y las conversiones enzimáticas de los componentes del alimento.",
    citations: [
      {
        text: "Real Academia Española. Diccionario de la lengua española, 23.ª ed. «fermento». https://dle.rae.es/fermento",
        href: "https://dle.rae.es/fermento",
      },
      {
        text: "Marco, M. L., Sanders, M. E., Gänzle, M., et al. (2021). The International Scientific Association for Probiotics and Prebiotics (ISAPP) consensus statement on fermented foods. Nature Reviews Gastroenterology & Hepatology, 18, 196–208. https://doi.org/10.1038/s41575-020-00390-5",
        href: "https://doi.org/10.1038/s41575-020-00390-5",
      },
    ],
  },
  {
    eyebrow: "Evidencia",
    title: "Diversidad del microbioma",
    body: "Un ensayo clínico de la Stanford School of Medicine observó que una dieta rica en alimentos fermentados —entre ellos kéfir y kombucha— aumentó la diversidad del microbioma intestinal en adultos sanos. El efecto fue más marcado cuando la porción diaria era mayor.",
    citations: [
      {
        text: "Wastyk, H. C., Fragiadakis, G. K., Perelman, D., et al. (2021). Gut-microbiota-targeted diets modulate human immune status. Cell, 184(16), 4137–4153.e14. https://doi.org/10.1016/j.cell.2021.06.019 · Stanford Medicine.",
        href: "https://doi.org/10.1016/j.cell.2021.06.019",
      },
    ],
  },
  {
    eyebrow: "Evidencia",
    title: "Inflamación y digestión",
    body: "En el mismo estudio de Stanford, la dieta fermentada se asoció con la disminución de 19 proteínas inflamatorias en sangre, incluida la interleucina-6. Una revisión de King’s College London señala que el kéfir es el fermento con más ensayos clínicos en salud gastrointestinal, con indicios favorables en la digestión de la lactosa; para la mayoría de los fermentos, la evidencia clínica aún es limitada y no sustituye consejo médico.",
    citations: [
      {
        text: "Wastyk, H. C., et al. (2021). Cell, 184(16), 4137–4153.e14. https://doi.org/10.1016/j.cell.2021.06.019",
        href: "https://doi.org/10.1016/j.cell.2021.06.019",
      },
      {
        text: "Dimidi, E., Cox, S. R., Rossi, M. y Whelan, K. (2019). Fermented Foods: Definitions and Characteristics, Impact on the Gut Microbiota and Effects on Gastrointestinal Health and Disease. Nutrients, 11(8), 1806. King’s College London. https://doi.org/10.3390/nu11081806",
        href: "https://doi.org/10.3390/nu11081806",
      },
    ],
  },
  {
    eyebrow: "Sugerencias",
    title: "Tips para tomar fermentos",
    body: "Empieza con porciones pequeñas si no los consumes habitualmente. Consérvalos refrigerados: los cultivos vivos se cuidan en frío. Intégralos como parte de una alimentación variada, no como un tratamiento. Si tienes una condición de salud, consulta a un profesional: esta información es educativa.",
    citations: [
      {
        text: "Harvard T.H. Chan School of Public Health. The Nutrition Source. «Fermented Foods». https://www.hsph.harvard.edu/nutritionsource/food-features/fermented-foods/",
        href: "https://www.hsph.harvard.edu/nutritionsource/food-features/fermented-foods/",
      },
      {
        text: "Marco, M. L., et al. (2021). ISAPP consensus statement on fermented foods. Nature Reviews Gastroenterology & Hepatology, 18, 196–208.",
        href: "https://doi.org/10.1038/s41575-020-00390-5",
      },
    ],
  },
]

export default function KnowledgeCarousel() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  function goTo(next) {
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <section className="bg-deep py-12 pb-24 text-cream md:py-16" aria-roledescription="carrusel">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-yellow">
              Para saber más
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold md:text-3xl">
              Fermentos, con fuentes
            </h2>
          </div>
          <p className="font-ui hidden text-sm text-cream/60 sm:block">
            {index + 1} / {slides.length}
          </p>
        </div>

        <div className="mt-8 min-h-[22rem] rounded-[1.75rem] border border-cream/15 bg-cream/5 p-6 md:p-8">
          <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-sky">{slide.eyebrow}</p>
          <h3 className="font-display mt-3 text-2xl font-bold md:text-3xl">{slide.title}</h3>
          <p className="mt-4 leading-relaxed text-cream/85">{slide.body}</p>
          <ul className="mt-6 space-y-2">
            {slide.citations.map((citation) => (
              <li key={citation.href} className="text-xs leading-relaxed text-cream/55">
                <a
                  href={citation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-cream/25 underline-offset-2 hover:text-cream/80"
                >
                  {citation.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="btn btn-ghost min-h-11 rounded-full text-cream hover:bg-cream/10"
            aria-label="Dato anterior"
          >
            <ChevronLeft className="size-5" />
            Anterior
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Datos del carrusel">
            {slides.map((item, slideIndex) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={item.title}
                onClick={() => setIndex(slideIndex)}
                className={`size-2.5 rounded-full transition ${
                  slideIndex === index ? "bg-yellow" : "bg-cream/30 hover:bg-cream/50"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="btn btn-ghost min-h-11 rounded-full text-cream hover:bg-cream/10"
            aria-label="Dato siguiente"
          >
            Siguiente
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

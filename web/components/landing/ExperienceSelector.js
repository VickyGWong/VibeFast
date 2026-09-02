"use client"

import { trackCategorySelect, trackScrollToCatalog } from "@/lib/analytics/track"
import { experienceOptions } from "@/data/products"

/**
 * @param {{ onSelect: (category: string) => void }} props
 */
export default function ExperienceSelector({ onSelect }) {
  const accentClasses = {
    sky: "border-sky/30 bg-sky/10 hover:border-sky",
    deep: "border-deep/20 bg-deep/5 hover:border-deep/40",
    orange: "border-orange/30 bg-orange/10 hover:border-orange",
  }

  function handleSelect(category) {
    trackCategorySelect(category, "experience")
    trackScrollToCatalog(category)
    onSelect(category)
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="experiencias" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
          ¿Qué buscas hoy?
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
          Elige tu experiencia
        </h2>
        <p className="mt-4 text-deep/70">
          Tres familias de fermentos, tres sensaciones distintas. Toca la que te antoje y te llevamos al catálogo.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {experienceOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.category)}
            className={`card-lift rounded-3xl border p-6 text-left transition ${accentClasses[option.accent]}`}
          >
            <p className="font-display text-xs font-bold uppercase tracking-wider text-deep/60">
              {option.subtitle}
            </p>
            <h3 className="font-display mt-2 text-xl font-bold text-deep">{option.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-deep/70">{option.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

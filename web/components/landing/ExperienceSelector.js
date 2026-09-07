"use client"

import { ArrowUpRight } from "lucide-react"
import { trackCategorySelect, trackScrollToCatalog } from "@/lib/analytics/track"
import { experienceOptions } from "@/data/products"

/**
 * @param {{ onSelect: (category: string) => void }} props
 */
export default function ExperienceSelector({ onSelect }) {
  const accentClasses = {
    sky: "bg-sky text-cream hover:brightness-105",
    yellow: "bg-yellow text-deep hover:brightness-105",
    orange: "bg-orange text-cream hover:brightness-105",
  }

  function handleSelect(category) {
    trackCategorySelect(category, "experience")
    trackScrollToCatalog(category)
    onSelect(category)
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="experiencias" className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-center text-3xl font-bold text-deep md:text-5xl">
          ¿Qué se te antoja hoy?
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {experienceOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.category)}
              className={`card-lift flex min-h-44 flex-col justify-between rounded-[2rem] p-7 text-left transition ${accentClasses[option.accent]}`}
            >
              <div>
                <p className="font-display text-2xl font-bold leading-tight md:text-[1.7rem]">
                  {option.title}
                </p>
                <p className="mt-2 text-sm font-medium opacity-80">{option.subtitle}</p>
              </div>
              <ArrowUpRight className="mt-8 size-6 opacity-90" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

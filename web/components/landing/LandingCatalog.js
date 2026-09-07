"use client"

import { useMemo, useState } from "react"
import { trackCategorySelect } from "@/lib/analytics/track"
import { categoryLabels } from "@/data/products"
import ExperienceSelector from "@/components/landing/ExperienceSelector"
import ProductCard from "@/components/landing/ProductCard"

const PREVIEW_COUNT = 3

/**
 * @param {{ products: import('@/data/products').Product[] }} props
 */
export default function LandingCatalog({ products }) {
  const [category, setCategory] = useState("all")
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(() => {
    if (category === "all") return products
    return products.filter((p) => p.category === category)
  }, [products, category])

  const visible = expanded ? filtered : filtered.slice(0, PREVIEW_COUNT)
  const hiddenCount = Math.max(filtered.length - PREVIEW_COUNT, 0)

  const filters = [
    { id: "all", label: "Todos" },
    { id: "kefir", label: categoryLabels.kefir },
    { id: "kombucha", label: categoryLabels.kombucha },
    { id: "tibicos", label: categoryLabels.tibicos },
  ]

  function handleFilter(id) {
    setCategory(id)
    setExpanded(false)
    if (id !== "all") {
      trackCategorySelect(id, "catalog_filter")
    }
  }

  function handleExperienceSelect(nextCategory) {
    setCategory(nextCategory)
    setExpanded(false)
  }

  return (
    <>
      <ExperienceSelector onSelect={handleExperienceSelect} />
      <section id="productos" className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-sky">
              Catálogo
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-5xl">
              Conoce a la familia más viva
            </h2>
            <p className="mt-4 text-deep/70">
              Precios, presentaciones y sabores disponibles. Compra en línea o pide directo por WhatsApp.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
            {filters.map((filter) => {
              const pressed = category === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => handleFilter(filter.id)}
                  className={`min-h-11 rounded-full border px-5 text-sm font-medium transition ${
                    pressed
                      ? "border-deep bg-deep text-cream"
                      : "border-base-300 bg-base-100 text-deep hover:border-deep/30"
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          <div className="mt-8 space-y-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>

          {hiddenCount > 0 && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="btn min-h-11 rounded-full border-deep/20 bg-white px-6 font-ui font-bold text-deep hover:border-deep hover:bg-base-200"
                aria-expanded={expanded}
              >
                {expanded ? "Ver menos" : `Ver más (${hiddenCount})`}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

"use client"

import { useMemo, useState } from "react"
import { trackCategorySelect } from "@/lib/analytics/track"
import { categoryLabels } from "@/data/products"
import ExperienceSelector from "@/components/landing/ExperienceSelector"
import ProductCard from "@/components/landing/ProductCard"

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

  const layout = useMemo(() => {
    const featured = filtered.find((product) => product.featured) ?? null
    const others = featured
      ? filtered.filter((product) => product.id !== featured.id)
      : filtered

    if (featured) {
      return {
        featured,
        side: others[0] ?? null,
        preview: others.slice(1, 4),
        rest: others.slice(4),
      }
    }

    return {
      featured: null,
      side: null,
      preview: others.slice(0, 3),
      rest: others.slice(3),
    }
  }, [filtered])

  const hiddenCount = layout.rest.length

  const filters = [
    { id: "all", label: "Todos", active: "border-deep bg-deep text-cream", idle: "border-deep/25 bg-white text-deep" },
    { id: "kefir", label: categoryLabels.kefir, active: "border-sky bg-sky text-cream", idle: "border-sky/40 bg-sky/10 text-deep" },
    { id: "kombucha", label: categoryLabels.kombucha, active: "border-yellow bg-yellow text-deep", idle: "border-yellow/50 bg-yellow/15 text-deep" },
    { id: "tibicos", label: categoryLabels.tibicos, active: "border-orange bg-orange text-cream", idle: "border-orange/40 bg-orange/10 text-deep" },
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
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
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
                    pressed ? filter.active : `${filter.idle} hover:brightness-95`
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {layout.featured && (
              <div className="md:col-span-2">
                <ProductCard product={layout.featured} featured />
              </div>
            )}
            {layout.side && <ProductCard product={layout.side} />}
            {layout.preview.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hiddenCount > 0 && !expanded && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="btn min-h-11 rounded-full border-0 bg-coral px-8 font-ui font-bold text-cream hover:bg-coral/90"
                aria-expanded={false}
              >
                Ver más ({hiddenCount})
              </button>
            </div>
          )}

          {expanded && hiddenCount > 0 && (
            <>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {layout.rest.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="btn min-h-11 rounded-full border-deep/20 bg-white px-8 font-ui font-bold text-deep hover:border-deep hover:bg-base-200"
                  aria-expanded={true}
                >
                  Ver menos
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

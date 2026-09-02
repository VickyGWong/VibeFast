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

  const filtered = useMemo(() => {
    if (category === "all") return products
    return products.filter((p) => p.category === category)
  }, [products, category])

  const filters = [
    { id: "all", label: "Todos" },
    { id: "kefir", label: categoryLabels.kefir },
    { id: "kombucha", label: categoryLabels.kombucha },
    { id: "tibicos", label: categoryLabels.tibicos },
  ]

  function handleFilter(id) {
    setCategory(id)
    if (id !== "all") {
      trackCategorySelect(id, "catalog_filter")
    }
  }

  function handleExperienceSelect(nextCategory) {
    setCategory(nextCategory)
  }

  return (
    <>
      <ExperienceSelector onSelect={handleExperienceSelect} />
      <section id="productos" className="bg-base-200/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
              Catálogo
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
              Nuestros fermentos
            </h2>
            <p className="mt-4 text-deep/70">
              Precios en pesos mexicanos. Compra en línea con Mercado Pago o pide por WhatsApp — elige
              la ruta que prefieras en cada producto.
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

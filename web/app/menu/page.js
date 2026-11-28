import config from "@/config"
import MenuBoard from "@/components/menu/MenuBoard"
import { categoryLabels, getAvailableProducts } from "@/data/products"
import { isSizeVariant } from "@/lib/products/pricing"
import "@/components/menu/menu-board.css"

export const metadata = {
  title: "Carta",
  description:
    "Menú actual de The Good Co. en Chihuahua: overnight oats, kéfir y kombucha artesanales. Precios y presentaciones disponibles hoy.",
  openGraph: {
    title: `Carta · ${config.app.name}`,
    description: "Fermentos muy vivitos — carta de productos disponibles.",
  },
}

const sectionCopy = {
  kefir: {
    blurb: "Endulzado o sin endulzar.",
    tone: "sky",
  },
  kombucha: {
    blurb: "Té fermentado burbujeante.",
    tone: "coral",
  },
  tibicos: {
    blurb: "Ligera y refrescante.",
    tone: "orange",
  },
}

/** Overnight Oats — solo eventos; no está en el catálogo web. */
const overnightOatsSection = {
  id: "overnight-oats",
  label: "Overnight Oats",
  blurb:
    "Avena trasnochada con chía y kéfir natural, monk fruit, canela y leche deslactosada. Opción con fresa orgánica o banana cacao (cacao orgánico).",
  tone: "yellow",
  featured: true,
  items: [
    {
      id: "oats-porcion",
      name: "Overnight Oats",
      size: "",
      priceCents: 5000,
    },
  ],
}

function buildCatalogSections(products) {
  const byCategory = new Map()

  for (const product of products) {
    if (!byCategory.has(product.category)) {
      const copy = sectionCopy[product.category] ?? sectionCopy.kefir
      byCategory.set(product.category, {
        id: product.category,
        label: categoryLabels[product.category] ?? product.category,
        blurb: copy.blurb,
        tone: copy.tone,
        featured: false,
        items: [],
      })
    }

    const section = byCategory.get(product.category)
    const sizeVariants = (product.variants || []).filter(isSizeVariant)

    if (sizeVariants.length > 0) {
      for (const variant of sizeVariants) {
        section.items.push({
          id: `${product.id}-${variant.id}`,
          name: product.name,
          size: variant.size || product.size,
          priceCents: variant.priceCents ?? product.priceCents,
        })
      }
      continue
    }

    section.items.push({
      id: product.id,
      name: product.name,
      size: product.size,
      priceCents: product.priceCents,
    })
  }

  const order = ["kefir", "kombucha", "tibicos"]
  return order.map((id) => byCategory.get(id)).filter(Boolean)
}

export default async function MenuPage({ searchParams }) {
  const available = getAvailableProducts()
  const catalogSections = buildCatalogSections(available)
  const sections = [overnightOatsSection, ...catalogSections]
  const params = await searchParams
  const captureMode = params?.capture === "1"

  return <MenuBoard sections={sections} captureMode={captureMode} />
}

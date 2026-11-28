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
    blurb: "Cremoso, vivo y perfecto frío. Elige endulzado o sin endulzar.",
    tone: "sky",
  },
  kombucha: {
    blurb: "Té fermentado con burbujas naturales y carácter propio.",
    tone: "yellow",
  },
  tibicos: {
    blurb: "Agua de kefir de frutos: ligera, refrescante y probiótica.",
    tone: "orange",
  },
}

/** Overnight Oats — solo eventos; no está en el catálogo web. */
const overnightOatsSection = {
  id: "overnight-oats",
  label: "Overnight Oats",
  blurb:
    "Avena trasnochada con chía y kéfir natural, endulzada con monk fruit, un toque de canela y un chirris de leche deslactosada (para adecuar la consistencia).",
  detail:
    "Sabores con fresa orgánica y cacao 100% natural orgánico. Disponible solo en eventos.",
  tone: "featured",
  featured: true,
  items: [
    {
      id: "oats-fresa",
      name: "Fresa",
      size: "",
      priceCents: 5000,
      note: "fresa orgánica",
    },
    {
      id: "oats-banana-cacao",
      name: "Banana cacao",
      size: "",
      priceCents: 5000,
      note: "cacao 100% natural orgánico",
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
    const hasSweeteningVariants =
      (product.variants || []).length > 0 && sizeVariants.length === 0

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

    const item = {
      id: product.id,
      name: product.name,
      size: product.size,
      priceCents: product.priceCents,
    }
    if (hasSweeteningVariants) item.note = "endulzado o sin endulzar"
    section.items.push(item)
  }

  const order = ["kefir", "kombucha", "tibicos"]
  return order.map((id) => byCategory.get(id)).filter(Boolean)
}

export default function MenuPage() {
  const available = getAvailableProducts()
  const catalogSections = buildCatalogSections(available)
  const sections = [overnightOatsSection, ...catalogSections]

  return <MenuBoard sections={sections} />
}

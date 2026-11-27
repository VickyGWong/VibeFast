import config from "@/config"
import MenuBoard from "@/components/menu/MenuBoard"
import { categoryLabels, getAvailableProducts } from "@/data/products"
import "@/components/menu/menu-board.css"

export const metadata = {
  title: "Carta",
  description:
    "Menú actual de kéfir, kombucha y tíbicos artesanales de The Good Co. en Chihuahua. Precios y presentaciones disponibles hoy.",
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

function buildSections(products) {
  const byCategory = new Map()

  for (const product of products) {
    if (!byCategory.has(product.category)) {
      const copy = sectionCopy[product.category] ?? sectionCopy.kefir
      byCategory.set(product.category, {
        id: product.category,
        label: categoryLabels[product.category] ?? product.category,
        blurb: copy.blurb,
        tone: copy.tone,
        items: [],
      })
    }

    const hasVariants = product.variants?.length > 0

    const item = {
      id: product.id,
      name: product.name,
      size: product.size,
      priceCents: product.priceCents,
    }
    if (hasVariants) item.note = "endulzado o sin endulzar"
    byCategory.get(product.category).items.push(item)
  }

  const order = ["kefir", "kombucha", "tibicos"]
  return order.map((id) => byCategory.get(id)).filter(Boolean)
}

export default function MenuPage() {
  const available = getAvailableProducts()
  const sections = buildSections(available)

  return <MenuBoard sections={sections} />
}

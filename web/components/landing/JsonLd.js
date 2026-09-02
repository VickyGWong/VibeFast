import config from "@/config"
import { formatPrice } from "@/lib/whatsapp"

/**
 * @param {{ products: import('@/data/products').Product[] }} props
 */
export default function JsonLd({ products }) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.app.name,
    description: config.app.description,
    url: `https://${config.app.domain}`,
    telephone: `+52-${config.contact.whatsappDisplay.replace(/\s/g, "-")}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.contact.city,
      postalCode: config.contact.postalCode,
      addressCountry: config.contact.country,
    },
    sameAs: [config.contact.instagram],
  }

  const productSchemas = products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://${config.app.domain}${product.imageUrl}`,
    sku: product.sku,
    brand: { "@type": "Brand", name: config.app.name },
    offers: {
      "@type": "Offer",
      price: formatPrice(product.priceCents),
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      url: `https://${config.app.domain}/#productos`,
    },
  }))

  const payload = [localBusiness, ...productSchemas]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}

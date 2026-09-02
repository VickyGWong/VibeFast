import config from "@/config"

/**
 * @param {number} priceCents
 */
export function formatPrice(priceCents) {
  return (priceCents / 100).toFixed(0)
}

/**
 * @param {import('@/data/products').Product} product
 * @param {{ messageLabel?: string } | null} [variant]
 */
export function buildProductWhatsAppMessage(product, variant = null) {
  const price = formatPrice(product.priceCents)
  const variantText = variant?.messageLabel ? ` ${variant.messageLabel}` : ""
  return `Hola, vi la página de The Good Co. y quiero pedir ${product.whatsappName}${variantText}, presentación de ${product.size}, con precio de $${price} MXN. ¿Tienen disponibilidad?`
}

export function buildGeneralWhatsAppMessage() {
  return "Hola, vi la página de The Good Co. y quiero conocer los productos disponibles."
}

/**
 * @param {string} message
 */
export function buildWhatsAppUrl(message) {
  const phone = config.contact.whatsapp
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/**
 * @param {import('@/data/products').Product} product
 * @param {{ messageLabel?: string } | null} [variant]
 */
export function getProductWhatsAppUrl(product, variant = null) {
  return buildWhatsAppUrl(buildProductWhatsAppMessage(product, variant))
}

export function getGeneralWhatsAppUrl() {
  return buildWhatsAppUrl(buildGeneralWhatsAppMessage())
}

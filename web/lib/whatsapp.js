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
 * @param {number} [quantity]
 */
export function buildProductWhatsAppMessage(product, variant = null, quantity = 1) {
  const price = formatPrice(product.priceCents)
  const variantText = variant?.messageLabel ? ` ${variant.messageLabel}` : ""
  const qtyText = quantity > 1 ? `${quantity}x ` : ""
  return `Hola, vi la página de The Good Co. y quiero pedir ${qtyText}${product.whatsappName}${variantText}, presentación de ${product.size}, con precio de $${price} MXN c/u. ¿Tienen disponibilidad y me ayudan a coordinar entrega?`
}

/**
 * @param {Array<{ whatsappName: string, size: string, quantity: number, priceCents: number, variantMessage?: string | null }>} items
 * @param {number} totalCents
 */
export function buildCartWhatsAppMessage(items, totalCents) {
  const lines = items.map((item) => {
    const variantText = item.variantMessage ? ` ${item.variantMessage}` : ""
    return `• ${item.quantity}x ${item.whatsappName}${variantText} (${item.size}) — $${formatPrice(item.priceCents * item.quantity)} MXN`
  })
  return `Hola, vi la página de The Good Co. y quiero confirmar este pedido:\n\n${lines.join("\n")}\n\nTotal: $${formatPrice(totalCents)} MXN\n¿Me ayudan a coordinar zona y hora de entrega?`
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
 * @param {number} [quantity]
 */
export function getProductWhatsAppUrl(product, variant = null, quantity = 1) {
  return buildWhatsAppUrl(buildProductWhatsAppMessage(product, variant, quantity))
}

/**
 * @param {Array<{ whatsappName: string, size: string, quantity: number, priceCents: number, variantMessage?: string | null }>} items
 * @param {number} totalCents
 */
export function getCartWhatsAppUrl(items, totalCents) {
  return buildWhatsAppUrl(buildCartWhatsAppMessage(items, totalCents))
}

export function getGeneralWhatsAppUrl() {
  return buildWhatsAppUrl(buildGeneralWhatsAppMessage())
}

/**
 * Eventos del embudo MVP (The Good Co.)
 * @see MVP_Landing_Page_The_Good_Co.pdf
 */

/** @param {string} name @param {Record<string, unknown>} [properties] */
export function trackEvent(name, properties = {}) {
  if (typeof window === "undefined") return

  if (window.va?.track) {
    window.va.track(name, properties)
  }

  if (window.gtag) {
    window.gtag("event", name, properties)
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, properties)
  }
}

/** Intención de compra — clic en Mercado Pago */
export function trackBeginCheckout(product, variant = null) {
  trackEvent("begin_checkout", {
    product_id: product.id,
    variant_id: variant?.id ?? null,
    value: product.priceCents / 100,
    currency: product.currency,
    channel: "mercadopago",
  })
}

/** Compra completada (retorno de MP o webhook futuro) */
export function trackPurchase(product, variant = null) {
  trackEvent("purchase", {
    product_id: product.id,
    variant_id: variant?.id ?? null,
    value: product.priceCents / 100,
    currency: product.currency,
    channel: "mercadopago",
  })
}

/** WhatsApp — conversación iniciada desde producto */
export function trackWhatsAppProduct(product, variant = null) {
  trackEvent("whatsapp_product_click", {
    product_id: product.id,
    variant_id: variant?.id ?? null,
    channel: "whatsapp",
  })
}

/** WhatsApp — clic general */
export function trackWhatsAppGeneral(source) {
  trackEvent("whatsapp_general_click", { source, channel: "whatsapp" })
}

export function trackVariantSelect(productId, variantId) {
  trackEvent("variant_select", { product_id: productId, variant_id: variantId })
}

export function trackCategorySelect(category, source) {
  trackEvent("category_select", { category, source })
}

export function trackScrollToCatalog(category) {
  trackEvent("scroll_to_catalog", { category })
}

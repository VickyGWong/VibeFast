import config from "@/config"

/**
 * Resuelve el link de Mercado Pago para un producto y variante opcional.
 * Las URLs se configuran en config.payments.links (crear en MP → Link de pago).
 *
 * @param {import('@/data/products').Product} product
 * @param {import('@/data/products').ProductVariant | null} [variant]
 * @returns {string | null}
 */
export function getCheckoutUrl(product, variant = null) {
  if (!config.payments?.enabled) return null

  const links = config.payments.links ?? {}

  if (variant?.id && links[`${product.id}:${variant.id}`]) {
    return links[`${product.id}:${variant.id}`]
  }

  if (links[product.id]) {
    return links[product.id]
  }

  if (product.checkoutUrl) {
    return product.checkoutUrl
  }

  if (variant?.checkoutUrl) {
    return variant.checkoutUrl
  }

  return null
}

/** @returns {boolean} */
export function hasOnlineCheckout(product, variant = null) {
  return Boolean(getCheckoutUrl(product, variant))
}

/**
 * @param {import('@/data/products').Product} product
 * @param {import('@/data/products').ProductVariant | null} [variant]
 */
export function getCheckoutReturnUrls(product, variant = null) {
  const base =
    process.env.NEXT_PUBLIC_APP_URL || config.app.defaultUrl
  const params = new URLSearchParams({
    product: product.id,
    ...(variant?.id ? { variant: variant.id } : {}),
  })

  return {
    success: `${base}${config.payments.successPath}?${params}&status=approved`,
    pending: `${base}${config.payments.pendingPath}?${params}&status=pending`,
  }
}

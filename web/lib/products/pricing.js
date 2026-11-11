/**
 * @param {import('@/data/products').Product} product
 * @param {import('@/data/products').ProductVariant | null} [variant]
 */
export function resolvePriceCents(product, variant = null) {
  return variant?.priceCents ?? product.priceCents
}

/**
 * @param {import('@/data/products').Product} product
 * @param {import('@/data/products').ProductVariant | null} [variant]
 */
export function resolveSize(product, variant = null) {
  return variant?.size ?? product.size
}

/**
 * True when the variant is a size/presentation choice (not flavor sweetening).
 * @param {import('@/data/products').ProductVariant | null | undefined} variant
 */
export function isSizeVariant(variant) {
  return Boolean(variant?.size)
}

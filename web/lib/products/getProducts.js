import { createClient } from "@/lib/supabase/server"
import { products as seedProducts } from "@/data/products"

/**
 * @param {Record<string, unknown> & { product_variants?: Array<Record<string, unknown>> }} row
 * @returns {import('@/data/products').Product}
 */
function mapDbRow(row) {
  const variants = (row.product_variants ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((v) => ({
      id: String(v.id),
      label: String(v.label),
      messageLabel: String(v.message_label),
    }))

  return {
    id: String(row.id),
    category: /** @type {'kefir'|'kombucha'|'tibicos'} */ (row.category),
    name: String(row.name),
    flavor: String(row.flavor ?? ""),
    description: String(row.description ?? ""),
    size: String(row.size),
    weight: row.weight ? String(row.weight) : null,
    priceCents: Number(row.price_cents),
    currency: String(row.currency ?? "MXN"),
    imageUrl: String(row.image_url),
    imageAlt: String(row.image_alt),
    featured: Boolean(row.featured),
    active: Boolean(row.active),
    whatsappName: String(row.whatsapp_name),
    sku: String(row.sku),
    stock: row.stock != null ? Number(row.stock) : null,
    seasonal: Boolean(row.seasonal),
    temporaryImage: Boolean(row.temporary_image),
    sortOrder: Number(row.sort_order ?? 0),
    variants,
  }
}

function getSeedProducts() {
  return seedProducts.filter((p) => p.active).sort((a, b) => a.sortOrder - b.sortOrder)
}

/**
 * @returns {Promise<import('@/data/products').Product[]>}
 */
export async function getProducts() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return getSeedProducts()
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, category, name, flavor, description, size, weight, price_cents, currency, image_url, image_alt, featured, active, whatsapp_name, sku, stock, seasonal, temporary_image, sort_order, product_variants(id, label, message_label, sort_order)"
      )
      .eq("active", true)
      .order("sort_order")

    if (error || !data?.length) {
      return getSeedProducts()
    }

    return data.map(mapDbRow)
  } catch {
    return getSeedProducts()
  }
}

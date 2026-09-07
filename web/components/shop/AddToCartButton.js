"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart/CartProvider"

/**
 * @param {{ product: import('@/data/products').Product, variant?: { id: string, label: string, messageLabel: string } | null, quantity?: number, className?: string }} props
 */
export default function AddToCartButton({
  product,
  variant = null,
  quantity = 1,
  className = "",
}) {
  const { addItem } = useCart()

  return (
    <button
      type="button"
      className={`btn min-h-11 gap-2 rounded-full bg-deep font-ui font-bold text-cream hover:bg-deep/90 ${className}`}
      onClick={() => addItem(product, variant, quantity)}
    >
      <ShoppingBag className="size-5" />
      Agregar al pedido
    </button>
  )
}

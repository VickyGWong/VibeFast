"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart/CartProvider"
import { formatPrice } from "@/lib/whatsapp"

export default function CartPageClient() {
  const { items, count, totalCents, updateQuantity, removeItem, setOpen } = useCart()

  useEffect(() => {
    setOpen(false)
  }, [setOpen])

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-base-300 bg-white p-8 text-center">
        <ShoppingBag className="mx-auto size-10 text-sky" />
        <p className="font-display mt-4 text-2xl font-bold text-deep">Aún no hay botellas</p>
        <p className="mt-2 text-deep/70">Agrega fermentos desde el catálogo para armar tu pedido.</p>
        <Link href="/#productos" className="btn mt-6 rounded-full bg-deep font-ui font-bold text-cream">
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.key} className="rounded-[1.5rem] border border-base-300 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold text-deep">{item.name}</p>
                <p className="text-sm text-deep/60">
                  {item.size}
                  {item.variantLabel ? ` · ${item.variantLabel}` : ""}
                </p>
                <p className="mt-2 font-ui font-bold text-deep">
                  ${formatPrice(item.priceCents * item.quantity)} MXN
                </p>
              </div>
              <button
                type="button"
                className="text-xs text-deep/50 underline-offset-2 hover:text-coral hover:underline"
                onClick={() => removeItem(item.key)}
              >
                Quitar
              </button>
            </div>
            <div className="mt-4 inline-flex items-center rounded-full border border-base-300">
              <button
                type="button"
                className="flex size-10 items-center justify-center"
                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                aria-label="Quitar una"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-8 text-center font-display font-bold">{item.quantity}</span>
              <button
                type="button"
                className="flex size-10 items-center justify-center"
                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                aria-label="Agregar una"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-[2rem] border border-base-300 bg-white p-6 lg:sticky lg:top-24">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-sky">Resumen</p>
        <h2 className="font-display mt-2 text-xl font-bold text-deep">
          {count} producto{count === 1 ? "" : "s"}
        </h2>
        <div className="mt-4 flex items-center justify-between font-display text-lg font-bold text-deep">
          <span>Total</span>
          <span>${formatPrice(totalCents)} MXN</span>
        </div>
        <p className="mt-3 text-xs text-deep/60">
          En el siguiente paso eliges entrega, zona y horario. WhatsApp solo se habilita al final.
        </p>
        <Link
          href="/compra"
          className="btn mt-5 min-h-12 w-full rounded-full bg-coral font-display font-bold text-cream hover:bg-coral/90"
        >
          Continuar con la compra
        </Link>
      </aside>
    </div>
  )
}

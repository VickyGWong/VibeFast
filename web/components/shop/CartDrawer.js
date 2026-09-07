"use client"

import Link from "next/link"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/lib/cart/CartProvider"
import { formatPrice, getCartWhatsAppUrl } from "@/lib/whatsapp"
import { trackWhatsAppGeneral } from "@/lib/analytics/track"

export default function CartDrawer() {
  const { items, count, totalCents, open, setOpen, updateQuantity, removeItem } = useCart()
  const checkoutUrl = getCartWhatsAppUrl(items, totalCents)

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Cerrar pedido"
          className="fixed inset-0 z-50 bg-deep/40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider text-sky">
              Tu pedido
            </p>
            <h2 className="font-display text-xl font-bold text-deep">
              {count === 0 ? "Aún no hay botellas" : `${count} producto${count === 1 ? "" : "s"}`}
            </h2>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="rounded-[1.5rem] border border-base-300 bg-white p-6 text-center">
              <ShoppingBag className="mx-auto size-8 text-sky" />
              <p className="mt-3 text-deep/70">Agrega fermentos desde el catálogo para armar tu pedido.</p>
              <Link
                href="/#productos"
                className="btn mt-4 rounded-full bg-deep font-display font-bold text-cream"
                onClick={() => setOpen(false)}
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.key} className="rounded-[1.25rem] border border-base-300 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display font-bold text-deep">{item.name}</p>
                      <p className="text-sm text-deep/60">
                        {item.size}
                        {item.variantLabel ? ` · ${item.variantLabel}` : ""}
                      </p>
                      <p className="mt-1 text-sm font-bold text-deep">
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
                  <div className="mt-3 inline-flex items-center rounded-full border border-base-300">
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
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-base-300 bg-white px-5 py-4">
            <div className="flex items-center justify-between font-display font-bold text-deep">
              <span>Total</span>
              <span>${formatPrice(totalCents)} MXN</span>
            </div>
            <p className="mt-2 text-xs text-deep/60">
              Coordinamos zona, horario y pago por WhatsApp. Los productos viajan refrigerados.
            </p>
            <Link
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-4 min-h-12 w-full rounded-full bg-coral font-display font-bold text-cream hover:bg-coral/90"
              onClick={() => trackWhatsAppGeneral("cart")}
            >
              Confirmar pedido por WhatsApp
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

export function CartButton() {
  const { count, setOpen } = useCart()

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="btn btn-ghost relative min-h-11 rounded-full px-3 text-deep"
      aria-label={`Abrir pedido, ${count} productos`}
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-coral font-display text-[11px] font-bold text-cream">
          {count}
        </span>
      )}
    </button>
  )
}

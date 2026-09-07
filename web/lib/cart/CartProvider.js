"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "tgc-cart"
const CartContext = createContext(null)

function itemKey(productId, variantId) {
  return `${productId}:${variantId || "default"}`
}

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(nextItems) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setItems(readCart())
  }, [])

  function commit(updater) {
    setItems((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater
      writeCart(next)
      return next
    })
  }

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalCents = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0)

    return {
      items,
      count,
      totalCents,
      open,
      setOpen,
      addItem(product, variant = null, quantity = 1) {
        const key = itemKey(product.id, variant?.id)
        commit((prev) => {
          const existing = prev.find((item) => item.key === key)
          if (existing) {
            return prev.map((item) =>
              item.key === key ? { ...item, quantity: item.quantity + quantity } : item
            )
          }
          return [
            ...prev,
            {
              key,
              productId: product.id,
              name: product.name,
              size: product.size,
              priceCents: product.priceCents,
              variantId: variant?.id ?? null,
              variantLabel: variant?.label ?? null,
              variantMessage: variant?.messageLabel ?? null,
              whatsappName: product.whatsappName,
              quantity,
              category: product.category,
              imageUrl: product.imageUrl,
              imageAlt: product.imageAlt,
              temporaryImage: product.temporaryImage,
            },
          ]
        })
        setOpen(true)
      },
      updateQuantity(key, quantity) {
        commit((prev) =>
          quantity < 1
            ? prev.filter((item) => item.key !== key)
            : prev.map((item) => (item.key === key ? { ...item, quantity } : item))
        )
      },
      removeItem(key) {
        commit((prev) => prev.filter((item) => item.key !== key))
      },
      clear() {
        commit([])
      },
    }
  }, [items, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider")
  }
  return context
}

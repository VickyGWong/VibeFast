"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, MessageCircle, Star } from "lucide-react"
import config from "@/config"
import ProductImage from "@/components/landing/ProductImage"
import { formatPrice, getProductWhatsAppUrl } from "@/lib/whatsapp"
import { getCheckoutUrl, hasOnlineCheckout } from "@/lib/payments/checkout"
import {
  trackBeginCheckout,
  trackVariantSelect,
  trackWhatsAppProduct,
} from "@/lib/analytics/track"

/**
 * @param {{ product: import('@/data/products').Product }} props
 */
export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] ?? null
  )

  const price = formatPrice(product.priceCents)
  const whatsappUrl = getProductWhatsAppUrl(product, selectedVariant)
  const checkoutUrl = getCheckoutUrl(product, selectedVariant)
  const onlineAvailable = hasOnlineCheckout(product, selectedVariant)
  const paymentsEnabled = config.features.payments && config.payments?.enabled

  function handleVariantSelect(variant) {
    setSelectedVariant(variant)
    trackVariantSelect(product.id, variant.id)
  }

  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-100">
      <div className="relative aspect-square">
        <ProductImage
          src={product.imageUrl}
          alt={product.imageAlt}
          category={product.category}
          temporary={product.temporaryImage}
        />
        {product.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-yellow px-3 py-1 text-xs font-bold text-deep">
            <Star className="size-3.5" aria-hidden />
            Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-sky">
          {product.category}
        </p>
        <h3 className="font-display mt-1 text-xl font-bold text-deep">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-deep/70">
          {product.description}
        </p>
        <p className="mt-3 text-sm text-deep/60">
          {product.size}
          {product.weight ? ` · ${product.weight}` : ""}
        </p>
        <p className="font-display mt-2 text-2xl font-bold text-deep">${price} MXN</p>

        {product.variants.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Variante">
            {product.variants.map((variant) => {
              const pressed = selectedVariant?.id === variant.id
              return (
                <button
                  key={variant.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => handleVariantSelect(variant)}
                  className={`min-h-11 rounded-full border px-4 text-sm font-medium transition ${
                    pressed
                      ? "border-deep bg-deep text-cream"
                      : "border-base-300 bg-base-100 text-deep hover:border-deep/30"
                  }`}
                >
                  {variant.label}
                </button>
              )
            })}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2">
          {paymentsEnabled && (
            onlineAvailable ? (
              <Link
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary min-h-11 w-full gap-2 rounded-full font-display font-bold"
                onClick={() => trackBeginCheckout(product, selectedVariant)}
              >
                <CreditCard className="size-5" />
                Comprar en línea
              </Link>
            ) : (
              <button
                type="button"
                disabled
                title="Configura el link de Mercado Pago en config.payments.links"
                className="btn btn-primary min-h-11 w-full gap-2 rounded-full font-display font-bold btn-disabled opacity-60"
              >
                <CreditCard className="size-5" />
                Comprar en línea
              </button>
            )
          )}

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn min-h-11 w-full gap-2 rounded-full font-display font-bold ${
              paymentsEnabled ? "btn-outline border-deep/25 text-deep hover:bg-base-200" : "btn-accent"
            }`}
            onClick={() => trackWhatsAppProduct(product, selectedVariant)}
          >
            <MessageCircle className="size-5" />
            Pedir por WhatsApp
          </Link>
        </div>
      </div>
    </article>
  )
}

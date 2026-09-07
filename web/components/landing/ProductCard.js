"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, MessageCircle, Star } from "lucide-react"
import config from "@/config"
import ProductImage from "@/components/landing/ProductImage"
import AddToCartButton from "@/components/shop/AddToCartButton"
import { formatPrice, getProductWhatsAppUrl } from "@/lib/whatsapp"
import { getCheckoutUrl, hasOnlineCheckout } from "@/lib/payments/checkout"
import {
  trackBeginCheckout,
  trackVariantSelect,
  trackWhatsAppProduct,
} from "@/lib/analytics/track"

/**
 * @param {{ product: import('@/data/products').Product, compact?: boolean }} props
 */
export default function ProductCard({ product, compact = false }) {
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

  const variants = product.variants.length > 0 && (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Variante">
      {product.variants.map((variant) => {
        const pressed = selectedVariant?.id === variant.id
        return (
          <button
            key={variant.id}
            type="button"
            aria-pressed={pressed}
            onClick={() => handleVariantSelect(variant)}
            className={`rounded-full border px-3 text-sm font-medium transition ${
              compact ? "min-h-9" : "min-h-11 px-4"
            } ${
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
  )

  const actions = (
    <div className={compact ? "flex flex-wrap gap-2" : "mt-5 flex flex-col gap-2"}>
      <AddToCartButton
        product={product}
        variant={selectedVariant}
        className={compact ? "min-h-10" : "w-full"}
      />
      {paymentsEnabled && (
        onlineAvailable ? (
          <Link
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary gap-2 rounded-full font-ui font-bold ${
              compact ? "min-h-10" : "min-h-11 w-full"
            }`}
            onClick={() => trackBeginCheckout(product, selectedVariant)}
          >
            <CreditCard className="size-4" />
            Comprar en línea
          </Link>
        ) : (
          <button
            type="button"
            disabled
            title="Configura el link de Mercado Pago en config.payments.links"
            className={`btn btn-primary btn-disabled gap-2 rounded-full font-ui font-bold opacity-60 ${
              compact ? "min-h-10" : "min-h-11 w-full"
            }`}
          >
            <CreditCard className="size-4" />
            Comprar en línea
          </button>
        )
      )}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn gap-2 rounded-full border-0 bg-yellow font-ui font-bold text-deep hover:bg-yellow/85 ${
          compact ? "min-h-10" : "min-h-11 w-full"
        }`}
        onClick={() => trackWhatsAppProduct(product, selectedVariant)}
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </Link>
    </div>
  )

  if (compact) {
    return (
      <article className="flex gap-4 overflow-hidden rounded-[1.25rem] border border-base-300/70 bg-white p-3 shadow-sm md:p-4">
        <Link
          href={`/producto/${product.id}`}
          className="relative block size-24 shrink-0 overflow-hidden rounded-2xl md:size-28"
        >
          <ProductImage
            src={product.imageUrl}
            alt={product.imageAlt}
            category={product.category}
            temporary={product.temporaryImage}
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-bold leading-tight text-deep md:text-xl">
                <Link href={`/producto/${product.id}`} className="hover:text-sky">
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-deep/60">
                {product.size}
                {product.weight ? ` · ${product.weight}` : ""}
              </p>
            </div>
            <p className="font-price text-lg font-bold text-deep">${price} MXN</p>
          </div>
          {product.featured && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-coral">
              <Star className="size-3" aria-hidden />
              Recomendado
            </span>
          )}
          <div className="mt-3 space-y-2">
            {variants}
            {actions}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-[2rem] border border-base-300/70 bg-white shadow-sm">
      <Link href={`/producto/${product.id}`} className="relative block aspect-[4/3]">
        <ProductImage
          src={product.imageUrl}
          alt={product.imageAlt}
          category={product.category}
          temporary={product.temporaryImage}
        />
        {product.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-coral px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
            <Star className="size-3.5" aria-hidden />
            Producto protagonista
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-ui text-xs font-bold uppercase tracking-wider text-sky">
          {product.flavor}
        </p>
        <h3 className="font-display mt-1 text-xl font-bold text-deep">
          <Link href={`/producto/${product.id}`} className="hover:text-sky">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-deep/70">
          {product.description}
        </p>
        <p className="mt-3 text-sm text-deep/60">
          {product.size}
          {product.weight ? ` · ${product.weight}` : ""}
        </p>
        <p className="font-price mt-2 text-2xl font-bold text-deep">${price} MXN</p>
        {variants && <div className="mt-4">{variants}</div>}
        {actions}
      </div>
    </article>
  )
}

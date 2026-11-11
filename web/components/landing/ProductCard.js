"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, MessageCircle, Star } from "lucide-react"
import config from "@/config"
import ProductImage from "@/components/landing/ProductImage"
import AddToCartButton from "@/components/shop/AddToCartButton"
import { formatPrice, getProductWhatsAppUrl } from "@/lib/whatsapp"
import { getCheckoutUrl, hasOnlineCheckout } from "@/lib/payments/checkout"
import { isSizeVariant, resolvePriceCents, resolveSize } from "@/lib/products/pricing"
import {
  trackBeginCheckout,
  trackVariantSelect,
  trackWhatsAppProduct,
} from "@/lib/analytics/track"

const categoryTheme = {
  kefir: {
    flavor: "bg-sky/15 text-sky",
    border: "border-sky/35",
    ring: "hover:border-sky",
  },
  kombucha: {
    flavor: "bg-yellow/25 text-deep",
    border: "border-yellow/60",
    ring: "hover:border-yellow",
  },
  tibicos: {
    flavor: "bg-orange/15 text-orange",
    border: "border-orange/40",
    ring: "hover:border-orange",
  },
}

/**
 * @param {{ product: import('@/data/products').Product, featured?: boolean }} props
 */
export default function ProductCard({ product, featured = false }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] ?? null
  )

  const price = formatPrice(resolvePriceCents(product, selectedVariant))
  const size = resolveSize(product, selectedVariant)
  const whatsappUrl = getProductWhatsAppUrl(product, selectedVariant)
  const checkoutUrl = getCheckoutUrl(product, selectedVariant)
  const onlineAvailable = hasOnlineCheckout(product, selectedVariant)
  const paymentsEnabled = config.features.payments && config.payments?.enabled
  const theme = categoryTheme[product.category] ?? categoryTheme.kefir
  const comingSoon = Boolean(product.comingSoon)
  const usesSizeVariants = product.variants.some((variant) => isSizeVariant(variant))

  function handleVariantSelect(variant) {
    setSelectedVariant(variant)
    trackVariantSelect(product.id, variant.id)
  }

  const variants = !comingSoon && product.variants.length > 0 && (
    <div className="flex flex-wrap gap-2" role="group" aria-label={usesSizeVariants ? "Presentación" : "Variante"}>
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
            {typeof variant.priceCents === "number" ? ` · $${formatPrice(variant.priceCents)}` : ""}
          </button>
        )
      })}
    </div>
  )

  const actions = comingSoon ? (
    <div className="mt-5">
      <p className="rounded-full bg-deep/10 px-4 py-3 text-center font-ui text-sm font-bold uppercase tracking-wide text-deep">
        Próximamente
      </p>
    </div>
  ) : (
    <div className="mt-5 flex flex-col gap-2">
      <AddToCartButton
        product={product}
        variant={selectedVariant}
        className="w-full"
      />
      {paymentsEnabled && (
        onlineAvailable ? (
          <Link
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary min-h-11 w-full gap-2 rounded-full font-ui font-bold"
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
            className="btn btn-primary btn-disabled min-h-11 w-full gap-2 rounded-full font-ui font-bold opacity-60"
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
        className="btn min-h-11 w-full gap-2 rounded-full border-0 bg-yellow font-ui font-bold text-deep hover:bg-yellow/85"
        onClick={() => trackWhatsAppProduct(product, selectedVariant)}
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </Link>
    </div>
  )

  if (featured) {
    return (
      <article className={`card-lift flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-coral bg-white shadow-sm md:flex-row ${comingSoon ? "opacity-95" : ""}`}>
        <Link
          href={`/producto/${product.id}`}
          className="relative block aspect-[4/3] md:w-[46%] md:shrink-0 md:self-stretch md:aspect-auto"
        >
          <ProductImage
            src={product.imageUrl}
            alt={product.imageAlt}
            category={product.category}
            temporary={product.temporaryImage}
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-coral px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
            <Star className="size-3.5" aria-hidden />
            Producto protagonista
          </span>
          {comingSoon && (
            <span className="absolute right-3 top-3 rounded-full bg-deep px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
              Próximamente
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p className={`font-display inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${theme.flavor}`}>
            {product.flavor}
          </p>
          <h3 className="font-display mt-2 text-2xl font-bold text-deep md:text-3xl">
            <Link href={`/producto/${product.id}`} className="hover:text-sky">
              {product.name}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-deep/70 md:text-base">
            {product.description}
          </p>
          {!comingSoon && (
            <p className="mt-4 text-sm text-deep/60">
              {size}
              {product.weight ? ` / ${product.weight}` : ""}
            </p>
          )}
          <p className="font-display mt-2 text-3xl font-bold text-deep">
            {comingSoon ? "Próximamente" : `$${price} MXN`}
          </p>
          {variants && <div className="mt-4">{variants}</div>}
          {actions}
        </div>
      </article>
    )
  }

  return (
    <article
      className={`card-lift flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white shadow-sm ${theme.border} ${comingSoon ? "" : theme.ring}`}
    >
      <Link href={`/producto/${product.id}`} className="relative block aspect-[4/3]">
        <ProductImage
          src={product.imageUrl}
          alt={product.imageAlt}
          category={product.category}
          temporary={product.temporaryImage}
        />
        {comingSoon && (
          <span className="absolute left-3 top-3 rounded-full bg-deep px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
            Próximamente
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className={`font-display inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${theme.flavor}`}>
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
        {!comingSoon && (
          <p className="mt-3 text-sm text-deep/60">
            {size}
            {product.weight ? ` · ${product.weight}` : ""}
          </p>
        )}
        <p className="font-display mt-2 text-2xl font-bold text-deep">
          {comingSoon ? "Próximamente" : `$${price} MXN`}
        </p>
        {variants && <div className="mt-4">{variants}</div>}
        {actions}
      </div>
    </article>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, MessageCircle, Minus, Plus } from "lucide-react"
import config from "@/config"
import ProductImage from "@/components/landing/ProductImage"
import AddToCartButton from "@/components/shop/AddToCartButton"
import { categoryDetails, categoryLabels } from "@/data/products"
import { formatPrice, getProductWhatsAppUrl } from "@/lib/whatsapp"
import { getCheckoutUrl, hasOnlineCheckout } from "@/lib/payments/checkout"
import { trackBeginCheckout, trackVariantSelect, trackWhatsAppProduct } from "@/lib/analytics/track"

/**
 * @param {{ product: import('@/data/products').Product, related: import('@/data/products').Product[] }} props
 */
export default function ProductDetail({ product, related }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] ?? null)
  const [quantity, setQuantity] = useState(1)
  const details = categoryDetails[product.category]
  const price = formatPrice(product.priceCents)
  const whatsappUrl = getProductWhatsAppUrl(product, selectedVariant, quantity)
  const checkoutUrl = getCheckoutUrl(product, selectedVariant)
  const onlineAvailable = hasOnlineCheckout(product, selectedVariant)
  const paymentsEnabled = config.features.payments && config.payments?.enabled

  return (
    <section className="bg-cream py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Link href="/#productos" className="inline-flex items-center gap-2 text-sm text-deep/70 hover:text-deep">
          <ArrowLeft className="size-4" />
          Volver al catálogo
        </Link>

        <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <ProductImage
              src={product.imageUrl}
              alt={product.imageAlt}
              category={product.category}
              temporary={product.temporaryImage}
            />
          </div>

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
              {categoryLabels[product.category]} · {product.flavor}
            </p>
            <h1 className="font-display mt-3 text-4xl font-bold text-deep md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-deep/75">{product.description}</p>
            <p className="mt-3 text-sm text-deep/60">
              {product.size}
              {product.weight ? ` · ${product.weight}` : ""}
            </p>
            <p className="font-display mt-4 text-3xl font-bold text-deep">${price} MXN</p>

            {product.variants.length > 0 && (
              <div className="mt-6">
                <p className="font-display text-sm font-bold text-deep">Variante</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const pressed = selectedVariant?.id === variant.id
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        aria-pressed={pressed}
                        onClick={() => {
                          setSelectedVariant(variant)
                          trackVariantSelect(product.id, variant.id)
                        }}
                        className={`min-h-11 rounded-full border px-4 text-sm font-medium ${
                          pressed
                            ? "border-deep bg-deep text-cream"
                            : "border-base-300 bg-white text-deep hover:border-deep/30"
                        }`}
                      >
                        {variant.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="font-display text-sm font-bold text-deep">Cantidad</p>
              <div className="mt-2 inline-flex items-center rounded-full border border-base-300 bg-white">
                <button
                  type="button"
                  className="flex size-11 items-center justify-center"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Quitar una"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-8 text-center font-display font-bold">{quantity}</span>
                <button
                  type="button"
                  className="flex size-11 items-center justify-center"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Agregar una"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <AddToCartButton product={product} variant={selectedVariant} quantity={quantity} />
              {paymentsEnabled && onlineAvailable && (
                <Link
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary min-h-11 gap-2 rounded-full font-display font-bold"
                  onClick={() => trackBeginCheckout(product, selectedVariant)}
                >
                  <CreditCard className="size-5" />
                  Comprar esta botella en línea
                </Link>
              )}
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline min-h-11 gap-2 rounded-full border-deep/20 font-display font-bold text-deep"
                onClick={() => trackWhatsAppProduct(product, selectedVariant)}
              >
                <MessageCircle className="size-5" />
                Pedir solo este por WhatsApp
              </Link>
            </div>

            {details && (
              <div className="mt-8 rounded-[1.5rem] bg-white p-5">
                <p className="font-display font-bold text-deep">Por qué se siente vivo</p>
                <ul className="mt-3 space-y-2 text-sm text-deep/75">
                  {details.benefits.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-deep/65">{details.keep}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-deep">También te puede gustar</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/producto/${item.id}`}
                  className="rounded-[1.5rem] border border-base-300 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-sky">{item.flavor}</p>
                  <p className="font-display mt-1 text-lg font-bold text-deep">{item.name}</p>
                  <p className="mt-1 text-sm text-deep/60">${formatPrice(item.priceCents)} MXN</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

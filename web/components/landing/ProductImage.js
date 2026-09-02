"use client"

import { useState } from "react"
import Image from "next/image"

const categoryGradients = {
  kefir: "from-sky/30 to-yellow/20",
  kombucha: "from-deep/20 to-sky/25",
  tibicos: "from-orange/25 to-yellow/20",
}

/**
 * @param {{ src: string, alt: string, category?: string, priority?: boolean, temporary?: boolean, className?: string }} props
 */
export default function ProductImage({
  src,
  alt,
  category = "kefir",
  priority = false,
  temporary = true,
  className = "",
}) {
  const [failed, setFailed] = useState(false)
  const gradient = categoryGradients[category] || categoryGradients.kefir

  if (temporary || failed) {
    return (
      <div
        className={`image-placeholder flex h-full w-full items-end justify-center bg-gradient-to-br ${gradient} p-4 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-center text-sm font-bold text-deep/60">{alt}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  )
}

export function HeroImage({ src, alt, className = "" }) {
  return (
    <ProductImage
      src={src}
      alt={alt}
      category="kefir"
      priority
      temporary
      className={className}
    />
  )
}

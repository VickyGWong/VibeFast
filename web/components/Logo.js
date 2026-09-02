import Image from "next/image"
import config from "@/config"

export default function Logo({ className = "size-8" }) {
  if (config.brand.logoSrc) {
    return (
      <Image
        src={config.brand.logoSrc}
        alt={config.app.name}
        width={32}
        height={32}
        className={className}
      />
    )
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-sky text-cream ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" fill="none" className="size-[70%]">
        <circle cx="11" cy="14" r="4" fill="currentColor" />
        <circle cx="19" cy="11" r="3" fill="currentColor" opacity="0.85" />
        <circle cx="21" cy="19" r="3.5" fill="currentColor" opacity="0.9" />
      </svg>
    </span>
  )
}

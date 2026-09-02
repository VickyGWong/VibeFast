"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp"
import { trackWhatsAppGeneral } from "@/lib/analytics/track"

/**
 * @param {{ source?: string, className?: string, label?: string }} props
 */
export default function WhatsAppButton({
  source = "general",
  className = "",
  label = "WhatsApp",
}) {
  const url = getGeneralWhatsAppUrl()

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-accent min-h-11 gap-2 rounded-full px-6 font-display font-bold ${className}`}
      onClick={() => trackWhatsAppGeneral(source)}
    >
      <MessageCircle className="size-5" aria-hidden />
      {label}
    </Link>
  )
}

export function WhatsAppFab() {
  const url = getGeneralWhatsAppUrl()

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      className="btn btn-accent btn-circle fixed bottom-5 right-5 z-50 size-14 shadow-lg md:hidden"
      onClick={() => trackWhatsAppGeneral("fab_mobile")}
    >
      <MessageCircle className="size-7" />
    </Link>
  )
}

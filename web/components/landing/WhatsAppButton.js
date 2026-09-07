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
  label = "Pedir por WhatsApp",
}) {
  const url = getGeneralWhatsAppUrl()

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn min-h-11 gap-2 rounded-full border-0 bg-yellow px-6 font-ui font-bold text-deep hover:bg-yellow/85 ${className}`}
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
      className="btn btn-circle fixed bottom-5 right-5 z-50 size-14 border-0 bg-yellow text-deep shadow-lg hover:bg-yellow/85 md:hidden"
      onClick={() => trackWhatsAppGeneral("fab_mobile")}
    >
      <MessageCircle className="size-7" />
    </Link>
  )
}

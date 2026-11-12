import { NextResponse } from "next/server"
import { annotateSlots, formatDateKey, generateBaseSlots } from "@/lib/checkout/schedule"
import { listBlockedSlots, listBookedSlotIds } from "@/lib/checkout/store"

export const runtime = "nodejs"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from") || formatDateKey()
    let blocked = []
    let booked = []
    try {
      ;[blocked, booked] = await Promise.all([listBlockedSlots(), listBookedSlotIds()])
    } catch (storeError) {
      console.warn("[availability] store unavailable, using open calendar", storeError)
    }

    const base = generateBaseSlots(from)
    const slots = annotateSlots(base, blocked, booked)

    const byDate = {}
    for (const slot of slots) {
      if (!byDate[slot.dateKey]) byDate[slot.dateKey] = []
      byDate[slot.dateKey].push(slot)
    }

    const dates = Object.keys(byDate).sort()
    if (!dates.length) {
      return NextResponse.json(
        { ok: false, error: "No hay horarios generados. Revisa la configuración." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      from,
      dates,
      byDate,
      slots,
    })
  } catch (error) {
    console.error("[availability]", error)
    return NextResponse.json({ ok: false, error: "No pudimos cargar horarios." }, { status: 500 })
  }
}

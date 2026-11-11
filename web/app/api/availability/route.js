import { NextResponse } from "next/server"
import { annotateSlots, formatDateKey, generateBaseSlots } from "@/lib/checkout/schedule"
import { listBlockedSlots, listBookedSlotIds } from "@/lib/checkout/store"

export const runtime = "nodejs"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from") || formatDateKey()
    const [blocked, booked] = await Promise.all([listBlockedSlots(), listBookedSlotIds()])
    const base = generateBaseSlots(from)
    const slots = annotateSlots(base, blocked, booked)

    const byDate = {}
    for (const slot of slots) {
      if (!byDate[slot.dateKey]) byDate[slot.dateKey] = []
      byDate[slot.dateKey].push(slot)
    }

    return NextResponse.json({
      ok: true,
      from,
      dates: Object.keys(byDate).sort(),
      byDate,
      slots,
    })
  } catch (error) {
    console.error("[availability]", error)
    return NextResponse.json({ ok: false, error: "No pudimos cargar horarios." }, { status: 500 })
  }
}

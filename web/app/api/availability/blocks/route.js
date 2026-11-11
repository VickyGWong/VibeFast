import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { listBlockedSlots, setSlotBlocked } from "@/lib/checkout/store"

const ADMIN_PIN = process.env.CHECKOUT_ADMIN_PIN || "thegoodco"

export const runtime = "nodejs"

const COOKIE = "tgc_availability_admin"

async function isAuthed() {
  const jar = await cookies()
  return jar.get(COOKIE)?.value === "1"
}

export async function GET() {
  const blockedSlots = await listBlockedSlots()
  return NextResponse.json({
    ok: true,
    blockedSlots,
    authed: await isAuthed(),
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const action = String(body?.action || "")

    if (action === "login") {
      const pin = String(body?.pin || "")
      if (pin !== ADMIN_PIN) {
        return NextResponse.json({ ok: false, error: "PIN incorrecto." }, { status: 401 })
      }
      const response = NextResponse.json({ ok: true, authed: true })
      response.cookies.set(COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 12,
      })
      return response
    }

    if (action === "logout") {
      const response = NextResponse.json({ ok: true, authed: false })
      response.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 })
      return response
    }

    if (!(await isAuthed())) {
      return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 })
    }

    if (action === "toggle") {
      const slotId = String(body?.slotId || "")
      const blocked = Boolean(body?.blocked)
      if (!slotId.includes("T")) {
        return NextResponse.json({ ok: false, error: "slotId inválido." }, { status: 400 })
      }
      const blockedSlots = await setSlotBlocked(slotId, blocked)
      return NextResponse.json({ ok: true, blockedSlots })
    }

    return NextResponse.json({ ok: false, error: "Acción no soportada." }, { status: 400 })
  } catch (error) {
    console.error("[availability/blocks]", error)
    return NextResponse.json({ ok: false, error: "Error al actualizar disponibilidad." }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getOrderById } from "@/lib/checkout/store"

export const runtime = "nodejs"

export async function GET(_request, context) {
  const { id } = await context.params
  const order = await getOrderById(id)
  if (!order) {
    return NextResponse.json({ ok: false, error: "Pedido no encontrado." }, { status: 404 })
  }
  return NextResponse.json({ ok: true, order })
}

"use client"

import { useEffect, useState } from "react"
import { Loader2, Lock, Unlock } from "lucide-react"

export default function AvailabilityAdmin() {
  const [pin, setPin] = useState("")
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState("")
  const [error, setError] = useState("")
  const [availability, setAvailability] = useState({ dates: [], byDate: {} })

  async function refresh() {
    setLoading(true)
    setError("")
    try {
      const [slotsRes, authRes] = await Promise.all([
        fetch("/api/availability"),
        fetch("/api/availability/blocks"),
      ])
      const slotsData = await slotsRes.json()
      const authData = await authRes.json()
      if (slotsData.ok) {
        setAvailability({ dates: slotsData.dates, byDate: slotsData.byDate })
      }
      setAuthed(Boolean(authData.authed))
    } catch {
      setError("No pudimos cargar la disponibilidad.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function login(event) {
    event.preventDefault()
    setError("")
    const response = await fetch("/api/availability/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", pin }),
    })
    const data = await response.json()
    if (!response.ok || !data.ok) {
      setError(data.error || "PIN incorrecto")
      return
    }
    setAuthed(true)
    setPin("")
  }

  async function logout() {
    await fetch("/api/availability/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    })
    setAuthed(false)
  }

  async function toggleSlot(slot) {
    if (!authed) return
    setSaving(slot.id)
    setError("")
    const response = await fetch("/api/availability/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "toggle",
        slotId: slot.id,
        blocked: !slot.blocked,
      }),
    })
    const data = await response.json()
    setSaving("")
    if (!response.ok || !data.ok) {
      setError(data.error || "No se pudo actualizar el horario.")
      return
    }
    await refresh()
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-deep/70">
        <Loader2 className="size-4 animate-spin" /> Cargando calendario…
      </div>
    )
  }

  if (!authed) {
    return (
      <form onSubmit={login} className="mx-auto max-w-md rounded-[2rem] border border-base-300 bg-white p-6">
        <h1 className="font-display text-2xl font-bold text-deep">Disponibilidad</h1>
        <p className="mt-2 text-sm text-deep/70">
          Entra con tu PIN para bloquear o liberar horarios de entrega/recolección.
        </p>
        <input
          type="password"
          className="input input-bordered mt-4 w-full rounded-2xl"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
        />
        {error && <p className="mt-3 text-sm text-coral">{error}</p>}
        <button type="submit" className="btn mt-4 w-full rounded-full bg-deep font-ui font-bold text-cream">
          Entrar
        </button>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-deep">Calendario de horarios</h1>
          <p className="mt-2 max-w-2xl text-sm text-deep/70">
            Toca un espacio para bloquearlo o desbloquearlo. Los bloqueados no se ofrecen en el
            checkout. Defaults: lun–vie 7–20, sáb 9–20, dom 12–17.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="btn rounded-full border-deep/20 bg-white font-ui font-bold text-deep"
        >
          Salir
        </button>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-deep">{error}</p>}

      <div className="space-y-5">
        {availability.dates.map((dateKey) => {
          const slots = availability.byDate[dateKey] || []
          const title = slots[0]?.displayDate || dateKey
          return (
            <section key={dateKey} className="rounded-[1.75rem] border border-base-300 bg-white p-4 md:p-5">
              <h2 className="font-display text-lg font-bold text-deep">{title}</h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {slots.map((slot) => {
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={slot.booked || slot.past || saving === slot.id}
                      onClick={() => toggleSlot(slot)}
                      className={`rounded-2xl border px-3 py-3 text-left text-sm ${
                        slot.blocked
                          ? "border-coral/40 bg-coral/10 text-deep"
                          : slot.booked
                            ? "border-base-300 bg-base-200 text-deep/50"
                            : slot.past
                              ? "border-base-200 bg-base-200 text-deep/40"
                              : "border-success/30 bg-success/10 text-deep"
                      }`}
                      title={
                        slot.booked
                          ? "Ya tiene pedido"
                          : slot.blocked
                            ? "Bloqueado — clic para liberar"
                            : "Disponible — clic para bloquear"
                      }
                    >
                      <span className="flex items-center justify-between gap-2 font-ui font-bold">
                        {slot.start}
                        {slot.blocked ? <Lock className="size-3.5" /> : <Unlock className="size-3.5" />}
                      </span>
                      <span className="mt-1 block text-[11px] uppercase tracking-wide opacity-70">
                        {slot.booked
                          ? "Reservado"
                          : slot.blocked
                            ? "Bloqueado"
                            : slot.past
                              ? "Pasado"
                              : "Libre"}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

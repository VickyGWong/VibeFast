"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Loader2, MapPin, Search } from "lucide-react"
import WhatsAppButton from "@/components/landing/WhatsAppButton"
import { trackEvent } from "@/lib/analytics/track"

const DeliveryMap = dynamic(() => import("@/components/landing/DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 items-center justify-center rounded-[1.5rem] border border-deep/10 bg-cream text-sm text-deep/60 md:h-[22rem]">
      Cargando mapa…
    </div>
  ),
})

const statusStyles = {
  free: "border-success/30 bg-success/10 text-deep",
  paid: "border-orange/30 bg-orange/10 text-deep",
  out_of_zone: "border-coral/30 bg-coral/10 text-deep",
}

export default function DeliveryZoneChecker() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState(null)

  async function handleCheck(event) {
    event.preventDefault()
    const value = query.trim()
    if (!value) {
      setError("Escribe tu código postal o una dirección en Chihuahua.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/delivery/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: value }),
      })
      const data = await response.json()

      if (!response.ok || !data.ok) {
        setResult(null)
        setError(data.error || "No pudimos consultar esa ubicación.")
        trackEvent("delivery_check_error", { query: value })
        return
      }

      setResult(data)
      trackEvent("delivery_check", {
        query: value,
        status: data.quote?.status,
        fee_cents: data.quote?.feeCents ?? null,
        distance_km: data.distanceKm,
      })
    } catch {
      setResult(null)
      setError("Hubo un problema de conexión. Intenta de nuevo.")
      trackEvent("delivery_check_error", { query: value })
    } finally {
      setLoading(false)
    }
  }

  const quote = result?.quote
  const destination = result?.location
    ? {
        lat: result.location.lat,
        lng: result.location.lng,
        label: result.location.label,
      }
    : null

  return (
    <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="rounded-[2rem] border border-deep/10 bg-cream p-6 shadow-sm md:p-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Revisa tu zona
        </p>
        <h3 className="font-display mt-3 text-2xl font-bold text-deep md:text-3xl">
          ¿Llegamos gratis a tu colonia?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-deep/70 md:text-base">
          Calculamos la distancia desde nuestro centro en CP <strong>31216</strong>. Hasta 8 km la
          entrega es gratuita; después aplica un cargo según el radio. Solo Chihuahua capital por
          ahora.
        </p>

        <form onSubmit={handleCheck} className="mt-6 space-y-3">
          <label htmlFor="delivery-query" className="font-ui text-sm font-bold text-deep">
            Código postal o dirección
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-deep/40" />
              <input
                id="delivery-query"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej. 31216 o Col. Nombre de Dios"
                className="input input-bordered min-h-12 w-full rounded-full border-deep/15 bg-white pl-11 font-ui text-deep"
                autoComplete="postal-code"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn min-h-12 gap-2 rounded-full border-0 bg-deep px-6 font-ui font-bold text-cream hover:bg-deep/90"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Calculando
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  Consultar
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 rounded-2xl border border-coral/25 bg-coral/10 px-4 py-3 text-sm text-deep" role="alert">
            {error}
          </p>
        )}

        {quote && (
          <div className={`mt-5 rounded-2xl border px-4 py-4 ${statusStyles[quote.status]}`}>
            <p className="font-display text-lg font-bold">{quote.message}</p>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {result.distanceKm != null && (
                <div>
                  <dt className="text-deep/60">Distancia estimada</dt>
                  <dd className="font-ui font-bold">{result.distanceKm} km</dd>
                </div>
              )}
              <div>
                <dt className="text-deep/60">Cargo de entrega</dt>
                <dd className="font-ui font-bold">{quote.feeLabel}</dd>
              </div>
              {result.location?.postalCode && (
                <div>
                  <dt className="text-deep/60">CP detectado</dt>
                  <dd className="font-ui font-bold">{result.location.postalCode}</dd>
                </div>
              )}
              <div className="sm:col-span-2">
                <dt className="text-deep/60">Ubicación</dt>
                <dd className="font-ui text-deep/80">{result.location?.label}</dd>
              </div>
            </dl>

            {quote.status === "out_of_zone" && (
              <div className="mt-4">
                <WhatsAppButton
                  source="delivery_out_of_zone"
                  label="Pedir entrega especial"
                />
              </div>
            )}
            {quote.deliverable && (
              <p className="mt-4 text-xs leading-relaxed text-deep/65">
                La distancia es aproximada en línea recta desde el CP 31216. Al confirmar tu pedido por
                WhatsApp afinamos colonia, horario y el cargo final si aplica.
              </p>
            )}
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-white/70 p-4 text-sm text-deep/70">
          <p className="font-display font-bold text-deep">Cómo se cobra</p>
          <ul className="mt-2 space-y-1.5">
            <li>• 0 a 8 km → entrega gratuita</li>
            <li>• 8.1 a 10 km → $20</li>
            <li>• 10.1 a 15 km → $30 · luego +$10 cada 5 km</li>
            <li>• Hasta ~40 km (límites de ciudad) · fuera = entrega especial</li>
          </ul>
        </div>
      </div>

      <DeliveryMap destination={destination} status={quote?.status || "idle"} />
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { DELIVERY_HUB, DELIVERY_RINGS } from "@/lib/delivery/zones"

/**
 * @param {{
 *   destination?: { lat: number, lng: number, label?: string } | null,
 *   status?: 'idle' | 'free' | 'paid' | 'out_of_zone',
 * }} props
 */
export default function DeliveryMap({ destination = null, status = "idle" }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const leafletRef = useRef(null)
  const overlayRef = useRef({ dest: null, line: null })
  const latestRef = useRef({ destination, status })
  const paintRef = useRef(() => {})

  latestRef.current = { destination, status }

  useEffect(() => {
    let cancelled = false

    function paintDestination() {
      const map = mapRef.current
      const L = leafletRef.current
      if (!map || !L) return

      const { destination: nextDestination, status: nextStatus } = latestRef.current

      if (overlayRef.current.dest) {
        map.removeLayer(overlayRef.current.dest)
        overlayRef.current.dest = null
      }
      if (overlayRef.current.line) {
        map.removeLayer(overlayRef.current.line)
        overlayRef.current.line = null
      }

      if (!nextDestination?.lat || !nextDestination?.lng) {
        map.setView([DELIVERY_HUB.lat, DELIVERY_HUB.lng], 11)
        return
      }

      const color =
        nextStatus === "free" ? "#16a34a" : nextStatus === "paid" ? "#fb6a40" : "#ff4a4a"

      const dest = L.circleMarker([nextDestination.lat, nextDestination.lng], {
        radius: 9,
        color: "#1b4268",
        weight: 2,
        fillColor: color,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(nextDestination.label || "Tu ubicación")

      const line = L.polyline(
        [
          [DELIVERY_HUB.lat, DELIVERY_HUB.lng],
          [nextDestination.lat, nextDestination.lng],
        ],
        {
          color,
          weight: 3,
          dashArray: "6 8",
          opacity: 0.85,
        }
      ).addTo(map)

      overlayRef.current = { dest, line }

      if (nextStatus === "out_of_zone") {
        // Keep focus on Chihuahua coverage; far cities only get a pin if nearby enough.
        map.setView([DELIVERY_HUB.lat, DELIVERY_HUB.lng], 11)
      } else {
        const bounds = L.latLngBounds([
          [DELIVERY_HUB.lat, DELIVERY_HUB.lng],
          [nextDestination.lat, nextDestination.lng],
        ])
        map.fitBounds(bounds.pad(0.35), { maxZoom: 13 })
      }
      dest.openPopup()
    }

    paintRef.current = paintDestination

    async function init() {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")
      if (cancelled || !containerRef.current || mapRef.current) return

      // Fix default marker icons under Next bundling.
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([DELIVERY_HUB.lat, DELIVERY_HUB.lng], 11)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      ;[...DELIVERY_RINGS].reverse().forEach((ring) => {
        L.circle([DELIVERY_HUB.lat, DELIVERY_HUB.lng], {
          radius: ring.km * 1000,
          color: ring.color,
          weight: 1.5,
          fillColor: ring.color,
          fillOpacity: ring.fillOpacity,
          interactive: false,
        }).addTo(map)
      })

      L.circleMarker([DELIVERY_HUB.lat, DELIVERY_HUB.lng], {
        radius: 8,
        color: "#1b4268",
        weight: 2,
        fillColor: "#4c9ff2",
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(`<strong>The Good Co.</strong><br/>Centro de entrega · ${DELIVERY_HUB.label}`)

      leafletRef.current = L
      mapRef.current = map
      paintDestination()
    }

    init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      leafletRef.current = null
    }
  }, [])

  useEffect(() => {
    paintRef.current()
  }, [destination, status])

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-deep/10 bg-cream shadow-sm">
      <div
        ref={containerRef}
        className="h-72 w-full md:h-[22rem]"
        role="img"
        aria-label={`Mapa de zonas de entrega The Good Co. desde ${DELIVERY_HUB.label}`}
      />
      <div className="flex flex-wrap gap-3 border-t border-deep/10 bg-white px-4 py-3 text-xs text-deep/70">
        {DELIVERY_RINGS.map((ring) => (
          <span key={ring.km} className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: ring.color }}
              aria-hidden
            />
            {ring.label}
          </span>
        ))}
      </div>
    </div>
  )
}

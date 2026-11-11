import { NextResponse } from "next/server"
import {
  DELIVERY_HUB,
  detectQueryKind,
  haversineKm,
  isWithinChihuahuaCity,
  quoteDeliveryFee,
} from "@/lib/delivery/zones"

export const runtime = "nodejs"

/** @type {Map<string, { expires: number, payload: object }>} */
const cache = new Map()
const CACHE_TTL_MS = 1000 * 60 * 60 * 6

function getCached(key) {
  const hit = cache.get(key)
  if (!hit) return null
  if (Date.now() > hit.expires) {
    cache.delete(key)
    return null
  }
  return hit.payload
}

function setCached(key, payload) {
  cache.set(key, { expires: Date.now() + CACHE_TTL_MS, payload })
}

/**
 * @param {URLSearchParams} params
 */
async function nominatimSearch(params) {
  const url = new URL("https://nominatim.openstreetmap.org/search")
  params.forEach((value, key) => url.searchParams.set(key, value))
  url.searchParams.set("format", "json")
  url.searchParams.set("addressdetails", "1")
  url.searchParams.set("limit", "5")
  url.searchParams.set("countrycodes", "mx")

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "TheGoodCoDeliveryChecker/1.0 (hola@thegoodco.com.mx)",
    },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Geocoder HTTP ${response.status}`)
  }

  const results = await response.json()
  return Array.isArray(results) ? results : []
}

/**
 * Prefers Chihuahua municipality / matching postcode.
 * @param {Array<Record<string, any>>} results
 * @param {{ expectedPostal?: string | null }} [opts]
 */
function pickBestResult(results, opts = {}) {
  if (!results.length) return null

  const expected = opts.expectedPostal || null

  const scored = results.map((place) => {
    const address = place.address || {}
    const displayName = String(place.display_name || "")
    let score = 0

    if (isWithinChihuahuaCity(address, displayName)) score += 5
    if ((address.state || "").toLowerCase().includes("chihuahua")) score += 2
    if ((address.county || "").toLowerCase().includes("municipio de chihuahua")) score += 3
    if (expected && String(address.postcode || "") === expected) score += 10
    if (place.type === "postcode" && expected && place.name === expected) score += 8

    // Penalize other cities in the state.
    const hay = displayName.toLowerCase()
    if (hay.includes("juárez") || hay.includes("juarez")) score -= 20
    if (hay.includes("delicias") || hay.includes("cuauhtémoc") || hay.includes("cuauhtemoc")) {
      score -= 20
    }

    return { place, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored[0]?.score > 0 ? scored[0].place : scored[0]?.place ?? null
}

/**
 * @param {string} query
 * @param {'postal' | 'address'} kind
 */
async function geocode(query, kind) {
  if (kind === "postal") {
    // Exact hub short-circuit for the operational center.
    if (query === DELIVERY_HUB.postalCode) {
      return {
        lat: String(DELIVERY_HUB.lat),
        lon: String(DELIVERY_HUB.lng),
        display_name: `${DELIVERY_HUB.postalCode}, Municipio de Chihuahua, Chihuahua, México`,
        address: {
          postcode: DELIVERY_HUB.postalCode,
          county: "Municipio de Chihuahua",
          state: "Chihuahua",
          country_code: "mx",
        },
      }
    }

    const structured = await nominatimSearch(
      new URLSearchParams({
        postalcode: query,
        state: "Chihuahua",
        country: "Mexico",
      })
    )
    const structuredPick = pickBestResult(structured, { expectedPostal: query })
    if (structuredPick && String(structuredPick.address?.postcode || structuredPick.name || "") === query) {
      return structuredPick
    }

    const freeform = await nominatimSearch(
      new URLSearchParams({
        q: `${query}, Municipio de Chihuahua, Chihuahua, México`,
      })
    )
    return pickBestResult(freeform, { expectedPostal: query }) || structuredPick
  }

  const results = await nominatimSearch(
    new URLSearchParams({
      q: `${query}, Municipio de Chihuahua, Chihuahua, México`,
    })
  )
  return pickBestResult(results)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const raw = String(body?.query || "").trim()

    if (raw.length < 3) {
      return NextResponse.json(
        { ok: false, error: "Escribe un código postal de 5 dígitos o una dirección en Chihuahua." },
        { status: 400 }
      )
    }

    const kind = detectQueryKind(raw)
    if (kind === "postal" && !/^\d{5}$/.test(raw)) {
      return NextResponse.json(
        { ok: false, error: "El código postal debe tener 5 dígitos." },
        { status: 400 }
      )
    }

    const cacheKey = `${kind}:${raw.toLowerCase()}`
    const cached = getCached(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    const place = await geocode(raw, kind)
    if (!place) {
      return NextResponse.json({
        ok: false,
        error:
          "No encontramos esa ubicación. Prueba con el CP de 5 dígitos o una colonia/calle más específica en Chihuahua.",
      })
    }

    const lat = Number(place.lat)
    const lng = Number(place.lon)
    const address = place.address || {}
    const displayName = String(place.display_name || "")
    const resolvedPostal = address.postcode || (kind === "postal" ? raw : null)

    // If user typed a CP and Nominatim resolved a different one far away, reject.
    if (kind === "postal" && resolvedPostal && resolvedPostal !== raw) {
      const payload = {
        ok: false,
        error: `No encontramos el CP ${raw} dentro de Chihuahua capital. Verifica el código o escribe colonia y calle.`,
      }
      return NextResponse.json(payload)
    }

    if (!isWithinChihuahuaCity(address, displayName)) {
      const payload = {
        ok: true,
        query: raw,
        kind,
        location: {
          lat,
          lng,
          label: displayName,
          postalCode: resolvedPostal,
        },
        distanceKm: null,
        quote: {
          deliverable: false,
          feeCents: 0,
          feeLabel: "No aplica",
          status: "out_of_zone",
          message:
            "Por ahora solo entregamos dentro de Chihuahua capital. Otras ciudades requieren una entrega especial programada — escríbenos por WhatsApp.",
        },
        hub: DELIVERY_HUB,
      }
      setCached(cacheKey, payload)
      return NextResponse.json(payload)
    }

    const distanceKm = Number(
      haversineKm(DELIVERY_HUB.lat, DELIVERY_HUB.lng, lat, lng).toFixed(2)
    )
    const quote = quoteDeliveryFee(distanceKm)

    const payload = {
      ok: true,
      query: raw,
      kind,
      location: {
        lat,
        lng,
        label: displayName,
        postalCode: resolvedPostal,
      },
      distanceKm,
      quote,
      hub: DELIVERY_HUB,
    }

    setCached(cacheKey, payload)
    return NextResponse.json(payload)
  } catch (error) {
    console.error("[delivery/check]", error)
    return NextResponse.json(
      {
        ok: false,
        error: "No pudimos consultar la zona en este momento. Intenta de nuevo en unos segundos.",
      },
      { status: 502 }
    )
  }
}

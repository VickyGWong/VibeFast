/**
 * Zonas de entrega The Good Co.
 * Centro operativo: CP 31216 (Municipio de Chihuahua).
 *
 * Tarifas (km en línea recta desde el centro):
 * - 0–8 km → gratis
 * - 8.1–10 km → $20
 * - 10.1–15 → $30, 15.1–20 → $40, … (+$10 cada 5 km)
 * Más allá del límite urbano → sin entrega regular.
 */

export const DELIVERY_HUB = {
  postalCode: "31216",
  label: "CP 31216 · Chihuahua",
  lat: 28.6374577,
  lng: -106.137572,
  city: "Chihuahua",
  state: "Chihuahua",
  countryCode: "mx",
}

/** Radio máximo de entrega regular dentro de la ciudad (km). */
export const MAX_CITY_RADIUS_KM = 40

/** Anillos visibles en el mapa (km → cargo MXN). */
export const DELIVERY_RINGS = [
  { km: 8, fee: 0, label: "Gratis", color: "#16a34a", fillOpacity: 0.12 },
  { km: 10, fee: 20, label: "$20", color: "#ffb636", fillOpacity: 0.1 },
  { km: 15, fee: 30, label: "$30", color: "#fb6a40", fillOpacity: 0.08 },
  { km: 20, fee: 40, label: "$40", color: "#fb6a40", fillOpacity: 0.07 },
  { km: 25, fee: 50, label: "$50", color: "#ff4a4a", fillOpacity: 0.06 },
  { km: 30, fee: 60, label: "$60", color: "#ff4a4a", fillOpacity: 0.05 },
  { km: 35, fee: 70, label: "$70", color: "#1b4268", fillOpacity: 0.05 },
  { km: 40, fee: 80, label: "Hasta $80", color: "#1b4268", fillOpacity: 0.04 },
]

/**
 * Distancia Haversine en kilómetros.
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 */
export function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * @param {number} distanceKm
 * @returns {{
 *   deliverable: boolean,
 *   feeCents: number,
 *   feeLabel: string,
 *   status: 'free' | 'paid' | 'out_of_zone',
 *   message: string,
 * }}
 */
export function quoteDeliveryFee(distanceKm) {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) {
    return {
      deliverable: false,
      feeCents: 0,
      feeLabel: "—",
      status: "out_of_zone",
      message: "No pudimos calcular la distancia. Revisa el código postal o la dirección.",
    }
  }

  if (distanceKm > MAX_CITY_RADIUS_KM) {
    return {
      deliverable: false,
      feeCents: 0,
      feeLabel: "No aplica",
      status: "out_of_zone",
      message:
        "Esta ubicación queda fuera de nuestro radio de entrega regular en Chihuahua. Aún no hacemos entregas a otras ciudades, salvo entregas especiales programadas.",
    }
  }

  if (distanceKm <= 8) {
    return {
      deliverable: true,
      feeCents: 0,
      feeLabel: "Gratis",
      status: "free",
      message: "¡Estás en zona de entrega a domicilio gratuita!",
    }
  }

  if (distanceKm <= 10) {
    return {
      deliverable: true,
      feeCents: 2000,
      feeLabel: "$20 MXN",
      status: "paid",
      message: "Entregamos a tu zona con un cargo de $20 MXN sobre el total del pedido.",
    }
  }

  const steps = Math.ceil((distanceKm - 10) / 5)
  const fee = 20 + steps * 10
  return {
    deliverable: true,
    feeCents: fee * 100,
    feeLabel: `$${fee} MXN`,
    status: "paid",
    message: `Entregamos a tu zona con un cargo de $${fee} MXN sobre el total del pedido.`,
  }
}

/**
 * Heurística para aceptar solo Chihuahua capital / municipio.
 * @param {{ city?: string, county?: string, state?: string, town?: string, municipality?: string, village?: string, country_code?: string }} address
 * @param {string} [displayName]
 */
export function isWithinChihuahuaCity(address = {}, displayName = "") {
  const country = (address.country_code || "").toLowerCase()
  if (country && country !== "mx") return false

  const state = (address.state || "").toLowerCase()
  if (state && !state.includes("chihuahua")) return false

  const haystack = [
    address.city,
    address.town,
    address.municipality,
    address.county,
    address.village,
    displayName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  const blocked = [
    "juárez",
    "juarez",
    "delicias",
    "cuauhtémoc",
    "cuauhtemoc",
    "parral",
    "meoqui",
    "camargo",
    "nuevo casas grandes",
    "aldama",
  ]
  if (blocked.some((name) => haystack.includes(name))) return false

  // Acepta municipio / ciudad Chihuahua; también display_name genérico del estado si el CP es local.
  return (
    haystack.includes("municipio de chihuahua") ||
    haystack.includes("chihuahua") ||
    !haystack // CP puro a veces viene sin ciudad
  )
}

/**
 * @param {string} input
 * @returns {'postal' | 'address'}
 */
export function detectQueryKind(input) {
  const cleaned = String(input || "").trim()
  if (/^\d{5}$/.test(cleaned)) return "postal"
  return "address"
}

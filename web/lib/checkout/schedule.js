import config from "@/config"

const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
]

/**
 * @param {string} hhmm
 */
export function timeToMinutes(hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number)
  return h * 60 + m
}

/**
 * @param {number} minutes
 */
export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

/**
 * Fecha local YYYY-MM-DD en la zona configurada.
 * @param {Date} [date]
 */
export function formatDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: config.checkout.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

/**
 * @param {string} dateKey YYYY-MM-DD
 */
export function getWeekdayIndex(dateKey) {
  // Interpret noon UTC-ish via Date to avoid DST edge for weekday label in MX.
  const [y, m, d] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d, 18, 0, 0))
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: config.checkout.timezone,
    weekday: "short",
  }).format(utc)
  const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return map[weekday] ?? utc.getUTCDay()
}

/**
 * @param {string} dateKey
 */
export function formatDisplayDate(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d, 18, 0, 0))
  const weekday = DAY_NAMES[getWeekdayIndex(dateKey)]
  const label = new Intl.DateTimeFormat("es-MX", {
    timeZone: config.checkout.timezone,
    day: "numeric",
    month: "long",
  }).format(utc)
  return `${weekday} ${label}`
}

/**
 * @param {string} dateKey
 * @param {string} start
 */
export function makeSlotId(dateKey, start) {
  return `${dateKey}T${start}`
}

/**
 * @param {string} slotId
 */
export function parseSlotId(slotId) {
  const [dateKey, start] = String(slotId).split("T")
  return { dateKey, start }
}

/**
 * Genera slots base según ventanas default (sin restar bloqueos).
 * @param {string} fromDateKey
 * @param {number} [days]
 */
export function generateBaseSlots(fromDateKey = formatDateKey(), days = config.checkout.horizonDays) {
  const slotMinutes = config.checkout.slotMinutes
  const windows = config.checkout.windows
  /** @type {Array<{ id: string, dateKey: string, start: string, end: string, weekday: number }>} */
  const slots = []

  const [y, m, d] = fromDateKey.split("-").map(Number)
  for (let i = 0; i < days; i++) {
    const cursor = new Date(Date.UTC(y, m - 1, d + i, 18, 0, 0))
    const dateKey = formatDateKey(cursor)
    const weekday = getWeekdayIndex(dateKey)
    const window = windows[weekday]
    if (!window) continue

    const startMin = timeToMinutes(window.start)
    const endMin = timeToMinutes(window.end)
    for (let t = startMin; t + slotMinutes <= endMin; t += slotMinutes) {
      const start = minutesToTime(t)
      const end = minutesToTime(t + slotMinutes)
      slots.push({
        id: makeSlotId(dateKey, start),
        dateKey,
        start,
        end,
        weekday,
      })
    }
  }

  return slots
}

/**
 * @param {Array<{ id: string, dateKey: string, start: string, end: string, weekday: number }>} baseSlots
 * @param {Set<string> | string[]} blockedIds
 * @param {Set<string> | string[]} bookedIds
 * @param {string} [nowDateKey]
 * @param {string} [nowTimeHHMM]
 */
export function annotateSlots(
  baseSlots,
  blockedIds = [],
  bookedIds = [],
  nowDateKey = formatDateKey(),
  nowTimeHHMM = new Intl.DateTimeFormat("en-GB", {
    timeZone: config.checkout.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date())
) {
  const blocked = blockedIds instanceof Set ? blockedIds : new Set(blockedIds)
  const booked = bookedIds instanceof Set ? bookedIds : new Set(bookedIds)

  return baseSlots.map((slot) => {
    const past =
      slot.dateKey < nowDateKey ||
      (slot.dateKey === nowDateKey && slot.start <= nowTimeHHMM)
    const isBlocked = blocked.has(slot.id)
    const isBooked = booked.has(slot.id)
    const available = !past && !isBlocked && !isBooked
    return {
      ...slot,
      past,
      blocked: isBlocked,
      booked: isBooked,
      available,
      label: `${slot.start} – ${slot.end}`,
      displayDate: formatDisplayDate(slot.dateKey),
    }
  })
}

export { DAY_NAMES }

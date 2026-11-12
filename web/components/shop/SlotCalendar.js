"use client"

import { Loader2 } from "lucide-react"

const WEEKDAY_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

/**
 * @param {{
 *   loading?: boolean,
 *   error?: string,
 *   dates: string[],
 *   byDate: Record<string, Array<{ id: string, available: boolean, start: string, displayDate?: string, weekday?: number }>>,
 *   selectedDate: string,
 *   slotId: string,
 *   onSelectDate: (dateKey: string) => void,
 *   onSelectSlot: (slotId: string) => void,
 *   onRetry?: () => void,
 * }} props
 */
export default function SlotCalendar({
  loading = false,
  error = "",
  dates,
  byDate,
  selectedDate,
  slotId,
  onSelectDate,
  onSelectSlot,
  onRetry,
}) {
  const daySlots = byDate[selectedDate] || []

  const calendarCells = buildMonthCells(dates, byDate)

  if (loading) {
    return (
      <div className="mt-5 flex min-h-48 items-center justify-center gap-2 rounded-2xl border border-base-200 bg-cream/60 text-sm text-deep/70">
        <Loader2 className="size-4 animate-spin" />
        Cargando calendario…
      </div>
    )
  }

  if (error || !dates.length) {
    return (
      <div className="mt-5 rounded-2xl border border-coral/25 bg-coral/10 px-4 py-4 text-sm text-deep">
        <p>{error || "No hay horarios disponibles por ahora."}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="btn mt-3 min-h-10 rounded-full border-0 bg-deep px-4 font-ui font-bold text-cream"
          >
            Reintentar
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="mt-5 space-y-5">
      <div className="rounded-2xl border border-base-200 bg-cream/50 p-3 sm:p-4">
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-ui font-bold uppercase tracking-wide text-deep/50">
          {WEEKDAY_SHORT.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {calendarCells.map((cell, index) => {
            if (!cell) {
              return <span key={`empty-${index}`} className="aspect-square" />
            }
            const selected = selectedDate === cell.dateKey
            return (
              <button
                key={cell.dateKey}
                type="button"
                disabled={!cell.hasOpen}
                onClick={() => onSelectDate(cell.dateKey)}
                className={`aspect-square rounded-xl text-sm font-ui font-bold transition ${
                  selected
                    ? "bg-deep text-cream shadow-sm"
                    : cell.hasOpen
                      ? "bg-white text-deep hover:border-deep/30 border border-base-200"
                      : "cursor-not-allowed bg-base-200/70 text-deep/30"
                }`}
                aria-label={cell.label}
                title={cell.label}
              >
                {cell.dayNumber}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="font-ui text-sm font-bold text-deep">
          Horarios · {daySlots[0]?.displayDate || selectedDate}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {daySlots.length === 0 ? (
            <p className="col-span-full text-sm text-deep/60">Elige un día del calendario.</p>
          ) : (
            daySlots.map((slot) => {
              const selected = slotId === slot.id
              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectSlot(slot.id)}
                  className={`rounded-2xl border px-3 py-3 text-sm font-ui font-bold ${
                    selected
                      ? "border-coral bg-coral text-cream"
                      : slot.available
                        ? "border-base-300 bg-white text-deep hover:border-deep/40"
                        : "cursor-not-allowed border-base-200 bg-base-200 text-deep/35 line-through"
                  }`}
                >
                  {slot.start}
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Builds a Mon–Sun grid covering the horizon dates.
 * @param {string[]} dates
 * @param {Record<string, Array<{ available: boolean, displayDate?: string, weekday?: number }>>} byDate
 */
function buildMonthCells(dates, byDate) {
  if (!dates.length) return []

  const first = dates[0]
  const last = dates[dates.length - 1]
  const openSet = new Set(dates)

  /** Monday=0 … Sunday=6 for grid columns */
  const firstWeekday = mondayBasedIndex(first)
  /** @type {Array<null | { dateKey: string, dayNumber: number, hasOpen: boolean, label: string }>} */
  const cells = []

  for (let i = 0; i < firstWeekday; i++) cells.push(null)

  const cursor = parseDateParts(first)
  const end = parseDateParts(last)

  while (compareParts(cursor, end) <= 0) {
    const dateKey = toDateKey(cursor)
    const daySlots = byDate[dateKey] || []
    const hasOpen = openSet.has(dateKey) && daySlots.some((slot) => slot.available)
    cells.push({
      dateKey,
      dayNumber: cursor.d,
      hasOpen,
      label: daySlots[0]?.displayDate || dateKey,
    })
    bumpDay(cursor)
  }

  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function parseDateParts(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number)
  return { y, m, d }
}

function toDateKey({ y, m, d }) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}

function bumpDay(parts) {
  const date = new Date(Date.UTC(parts.y, parts.m - 1, parts.d + 1))
  parts.y = date.getUTCFullYear()
  parts.m = date.getUTCMonth() + 1
  parts.d = date.getUTCDate()
}

function compareParts(a, b) {
  if (a.y !== b.y) return a.y - b.y
  if (a.m !== b.m) return a.m - b.m
  return a.d - b.d
}

/** Convert dateKey weekday to Monday-first index. */
function mondayBasedIndex(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d, 18, 0, 0))
  // getUTCDay: 0=Sun … 6=Sat → Mon-first
  return (utc.getUTCDay() + 6) % 7
}

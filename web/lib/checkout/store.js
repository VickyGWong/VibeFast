import { promises as fs } from "fs"
import path from "path"

const STORE_DIR = path.join(process.cwd(), ".data")
const STORE_FILE = path.join(STORE_DIR, "checkout-store.json")

/**
 * @typedef {{
 *   orders: Array<Record<string, unknown>>,
 *   blockedSlots: string[],
 * }} CheckoutStore
 */

/** @returns {CheckoutStore} */
function emptyStore() {
  return { orders: [], blockedSlots: [] }
}

async function ensureStore() {
  await fs.mkdir(STORE_DIR, { recursive: true })
  try {
    await fs.access(STORE_FILE)
  } catch {
    await fs.writeFile(STORE_FILE, JSON.stringify(emptyStore(), null, 2), "utf8")
  }
}

/** @returns {Promise<CheckoutStore>} */
export async function readStore() {
  await ensureStore()
  const raw = await fs.readFile(STORE_FILE, "utf8")
  try {
    const parsed = JSON.parse(raw)
    return {
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      blockedSlots: Array.isArray(parsed.blockedSlots) ? parsed.blockedSlots : [],
    }
  } catch {
    return emptyStore()
  }
}

/** @param {CheckoutStore} store */
export async function writeStore(store) {
  await ensureStore()
  await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2), "utf8")
}

export async function listBlockedSlots() {
  const store = await readStore()
  return store.blockedSlots
}

/** @param {string} slotId */
export async function setSlotBlocked(slotId, blocked) {
  const store = await readStore()
  const set = new Set(store.blockedSlots)
  if (blocked) set.add(slotId)
  else set.delete(slotId)
  store.blockedSlots = [...set].sort()
  await writeStore(store)
  return store.blockedSlots
}

export async function listOrders() {
  const store = await readStore()
  return store.orders
}

/** @param {string} id */
export async function getOrderById(id) {
  const store = await readStore()
  return store.orders.find((order) => order.id === id) ?? null
}

/** @param {Record<string, unknown>} order */
export async function saveOrder(order) {
  const store = await readStore()
  store.orders.unshift(order)
  await writeStore(store)
  return order
}

export async function listBookedSlotIds() {
  const store = await readStore()
  return store.orders
    .map((order) => order.slotId)
    .filter((id) => typeof id === "string" && id.length > 0)
}

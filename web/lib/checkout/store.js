import { promises as fs } from "fs"
import path from "path"

/**
 * En Vercel / serverless el filesystem del proyecto es de solo lectura.
 * Persistimos en /tmp (efímero por instancia) o en web/.data en local.
 */
function resolveStorePaths() {
  const useTmp = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)
  if (useTmp) {
    return {
      dir: "/tmp",
      file: path.join("/tmp", "tgc-checkout-store.json"),
    }
  }
  const dir = path.join(process.cwd(), ".data")
  return { dir, file: path.join(dir, "checkout-store.json") }
}

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
  const { dir, file } = resolveStorePaths()
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.access(file)
  } catch {
    await fs.writeFile(file, JSON.stringify(emptyStore(), null, 2), "utf8")
  }
}

/** @returns {Promise<CheckoutStore>} */
export async function readStore() {
  try {
    await ensureStore()
    const { file } = resolveStorePaths()
    const raw = await fs.readFile(file, "utf8")
    try {
      const parsed = JSON.parse(raw)
      return {
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        blockedSlots: Array.isArray(parsed.blockedSlots) ? parsed.blockedSlots : [],
      }
    } catch {
      return emptyStore()
    }
  } catch (error) {
    console.warn("[checkout-store] read fallback", error?.message || error)
    return emptyStore()
  }
}

/** @param {CheckoutStore} store */
export async function writeStore(store) {
  await ensureStore()
  const { file } = resolveStorePaths()
  await fs.writeFile(file, JSON.stringify(store, null, 2), "utf8")
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

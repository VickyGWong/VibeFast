import config from "@/config"

/** @typedef {'transfer' | 'oxxo' | 'on_delivery' | 'whatsapp'} PaymentMethodId */

export const PAYMENT_METHODS = [
  {
    id: /** @type {PaymentMethodId} */ ("transfer"),
    label: "Transferencia SPEI",
    shortLabel: "SPEI",
    description: "Paga desde tu banco con CLABE. Usa tu número de pedido como concepto.",
    status: "awaiting_transfer",
  },
  {
    id: /** @type {PaymentMethodId} */ ("oxxo"),
    label: "Pago en Oxxo",
    shortLabel: "Oxxo",
    description: "Generamos una referencia para pagar en tienda. Se confirma al reflejar el pago.",
    status: "awaiting_oxxo",
    enabled: config.checkout.oxxo?.enabled !== false,
  },
  {
    id: /** @type {PaymentMethodId} */ ("on_delivery"),
    label: "Pago al recibir",
    shortLabel: "Contra entrega",
    description: "Paga en efectivo o transferencia al momento de la entrega o recolección.",
    status: "pay_on_delivery",
  },
  {
    id: /** @type {PaymentMethodId} */ ("whatsapp"),
    label: "Continuar por WhatsApp",
    shortLabel: "WhatsApp",
    description: "Opcional: si prefieres coordinar el pedido por chat en lugar de completar aquí.",
    status: "whatsapp",
    optionalChannel: true,
  },
].filter((method) => method.enabled !== false)

/**
 * @param {string} orderId
 */
export function buildOxxoReference(orderId) {
  const digits = String(orderId).replace(/\D/g, "").slice(-10).padStart(10, "0")
  return `TGC${digits}`
}

/**
 * @param {string} orderId
 */
export function getTransferInstructions(orderId) {
  const bank = config.checkout.bankTransfer
  return {
    bank: bank.bank,
    holder: bank.holder,
    clabe: bank.clabe,
    concept: orderId,
    hint: bank.conceptHint,
  }
}

// ============================================================
// Resend · helpers de envío
// ------------------------------------------------------------
// Cada helper hace no-op silencioso si el email no está
// configurado (getResend() === null). Así el resto del código
// llama sin preocuparse de si Resend está activo o no.
//
// Devuelven { ok, skipped?, error? } para que el caller decida.
// ============================================================

import config from "@/config"
import { getResend } from "@/lib/resend/client"
import WaitlistConfirm from "@/lib/resend/templates/WaitlistConfirm"
import Welcome from "@/lib/resend/templates/Welcome"

// Email genérico de texto plano. Lo usa la tool `enviar_email` del
// registry (lib/tools) para que un agente pueda mandar correos.
export async function sendEmail({ to, subject, body }) {
  const resend = getResend()
  if (!resend) return { ok: false, skipped: true }

  const { error } = await resend.emails.send({
    from: config.email.from,
    replyTo: config.email.replyTo,
    to,
    subject,
    text: body,
  })

  if (error) {
    console.error("[resend] sendEmail:", error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

export async function sendWaitlistConfirm(to) {
  const resend = getResend()
  if (!resend) return { ok: false, skipped: true }

  const { error } = await resend.emails.send({
    from: config.email.from,
    replyTo: config.email.replyTo,
    to,
    subject: `Estás en la lista de ${config.app.name}`,
    react: <WaitlistConfirm />,
  })

  if (error) {
    console.error("[resend] waitlist confirm:", error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

export async function sendWelcome(to, name) {
  const resend = getResend()
  if (!resend) return { ok: false, skipped: true }

  const { error } = await resend.emails.send({
    from: config.email.from,
    replyTo: config.email.replyTo,
    to,
    subject: `Bienvenido a ${config.app.name}`,
    react: <Welcome name={name} />,
  })

  if (error) {
    console.error("[resend] welcome:", error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

const PURCHASE_LABELS = {
  mercadopago: "Mercado Pago (en línea)",
  en_linea: "En línea",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  muestra_gratis: "Muestra gratis",
  otro: "Otro",
}

const FERMENTED_LABELS = {
  si: "Sí",
  no: "No",
  no_conocia: "No los conocía / nunca los había escuchado",
  escuchado_no_probado: "Los había escuchado, pero no los había probado",
  probado_poco: "Los había probado, pero no los consumo frecuentemente",
  consumo_habitual: "Ya los consumía de forma habitual",
}

const SAMPLE_CHANNEL_LABELS = {
  evento: "Evento",
  popup: "Pop Up",
  mercadito: "Mercadito",
  otro: "Otro",
}

/** Notifica al equipo cuando llega una retroalimentación de producto. */
export async function sendFeedbackNotification(row) {
  const to = config.email.supportEmail || config.email.replyTo
  if (!to) return { ok: false, skipped: true }

  const isFreeSample = row.purchase_method === "muestra_gratis"
  const sampleLabel = row.sample_channel
    ? SAMPLE_CHANNEL_LABELS[row.sample_channel] || row.sample_channel
    : null

  const lines = [
    `Producto: ${row.product_name} (${row.product_id})`,
    `Experiencia con fermentados: ${FERMENTED_LABELS[row.fermented_before] || row.fermented_before}`,
    row.acidity_rating != null ? `Acidez: ${row.acidity_rating}/10` : null,
    row.creaminess_rating != null ? `Cremosidad: ${row.creaminess_rating}/10` : null,
    row.sweetness_rating != null ? `Dulzor: ${row.sweetness_rating}/10` : null,
    row.bubbles_rating != null ? `Burbujas: ${row.bubbles_rating}/10` : null,
    `Sabor en general: ${row.taste_rating}/10`,
    row.taste_comment ? `  Comentario sabor: ${row.taste_comment}` : null,
    `Presentación: ${row.presentation_rating}/10`,
    row.presentation_comment
      ? `  Comentario presentación: ${row.presentation_comment}`
      : null,
    `Cómo lo obtuvo: ${PURCHASE_LABELS[row.purchase_method] || row.purchase_method}`,
    isFreeSample
      ? `Lugar de la muestra: ${sampleLabel}${
          row.sample_channel_other ? ` (${row.sample_channel_other})` : ""
        }`
      : row.delivery_rating != null
        ? `Entrega: ${row.delivery_rating}/10`
        : "Entrega: (sin calificar)",
    !isFreeSample && row.delivery_comment
      ? `  Comentario entrega: ${row.delivery_comment}`
      : null,
    row.name ? `Nombre: ${row.name}` : null,
    row.contact ? `Contacto: ${row.contact}` : null,
    row.extra_comment ? `Comentario extra: ${row.extra_comment}` : null,
  ].filter(Boolean)

  return sendEmail({
    to,
    subject: `Nueva retroalimentación · ${row.product_name}`,
    body: lines.join("\n"),
  })
}

"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { categoryLabels, getAvailableProducts } from "@/data/products"

const FERMENTED_BEFORE_OPTIONS = [
  { value: "no_conocia", label: "No los conocía / nunca los había escuchado" },
  { value: "escuchado_no_probado", label: "Los había escuchado, pero no los había probado" },
  { value: "probado_poco", label: "Los había probado, pero no los consumo frecuentemente" },
  { value: "consumo_habitual", label: "Ya los consumía de forma habitual" },
]

const PURCHASE_OPTIONS = [
  { value: "en_linea", label: "En línea" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "muestra_gratis", label: "Muestra gratis" },
  { value: "otro", label: "Otro" },
]

const SAMPLE_CHANNEL_OPTIONS = [
  { value: "evento", label: "Evento" },
  { value: "popup", label: "Pop Up" },
  { value: "mercadito", label: "Mercadito" },
  { value: "otro", label: "Otro" },
]

const emptyForm = {
  productId: "",
  fermentedBefore: "",
  acidityRating: "",
  creaminessRating: "",
  sweetnessRating: "",
  bubblesRating: "",
  tasteRating: "",
  tasteComment: "",
  presentationRating: "",
  presentationComment: "",
  purchaseMethod: "",
  deliveryRating: "",
  deliveryComment: "",
  sampleChannel: "",
  sampleChannelOther: "",
  name: "",
  contact: "",
  extraComment: "",
}

function ChoiceGroup({ name, options, value, onChange, required = false, columns = "sm:grid-cols-2" }) {
  return (
    <div className={`mt-4 grid gap-2 ${columns}`} role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            className={`flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 text-center text-sm font-medium leading-snug transition ${
              selected
                ? "border-sky bg-sky text-cream shadow-sm"
                : "border-base-300 bg-white text-deep/75 hover:border-sky/50"
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={opt.value}
              checked={selected}
              required={required}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        )
      })}
    </div>
  )
}

function RatingScale({ id, name, label, value, onChange, required = false }) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-medium text-deep/80">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const selected = Number(value) === n
          return (
            <label
              key={n}
              className={`flex size-10 min-h-11 min-w-10 cursor-pointer items-center justify-center rounded-xl border transition sm:size-11 sm:rounded-2xl ${
                selected
                  ? "border-sky bg-sky text-cream shadow-sm"
                  : "border-base-300 bg-white text-deep/80 hover:border-sky/50"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                name={name}
                value={n}
                checked={selected}
                required={required && n === 1}
                onChange={() => onChange(String(n))}
                aria-describedby={`${id}-hint`}
              />
              <span className="font-display text-base font-bold leading-none sm:text-lg">{n}</span>
            </label>
          )
        })}
      </div>
      <p id={`${id}-hint`} className="mt-2 text-xs text-deep/50">
        1 = muy mal · 10 = excelente
      </p>
    </fieldset>
  )
}

export default function FeedbackForm() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  const availableProducts = getAvailableProducts()
  const selectedProduct = availableProducts.find((p) => p.id === form.productId) ?? null
  const isKefir = selectedProduct?.category === "kefir"
  const isBubbly =
    selectedProduct?.category === "kombucha" || selectedProduct?.category === "tibicos"
  const isFreeSample = form.purchaseMethod === "muestra_gratis"

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleProductChange(productId) {
    const next = availableProducts.find((p) => p.id === productId)
    setForm((prev) => ({
      ...prev,
      productId,
      creaminessRating: next?.category === "kefir" ? prev.creaminessRating : "",
      bubblesRating:
        next?.category === "kombucha" || next?.category === "tibicos"
          ? prev.bubblesRating
          : "",
    }))
  }

  function handlePurchaseChange(purchaseMethod) {
    setForm((prev) => ({
      ...prev,
      purchaseMethod,
      ...(purchaseMethod === "muestra_gratis"
        ? { deliveryRating: "", deliveryComment: "" }
        : { sampleChannel: "", sampleChannelOther: "" }),
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "No pudimos enviar tu retroalimentación.")
      }
      setStatus("success")
      setForm(emptyForm)
    } catch (err) {
      setError(err.message)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[1.75rem] border border-success/30 bg-white px-6 py-10 text-center shadow-sm md:px-10"
      >
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <h2 className="font-display mt-5 text-2xl font-bold text-deep md:text-3xl">
          ¡Gracias por tu voz!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-deep/70">
          Ya recibimos tu opinión. Nos ayuda a cuidar el sabor, la presentación y
          cómo llega cada fermento a Chihuahua.
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-6 min-h-11 rounded-full font-display font-bold text-sky"
          onClick={() => setStatus("idle")}
        >
          Enviar otra opinión
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-10 rounded-[1.75rem] border border-base-300/70 bg-white p-6 shadow-sm md:p-10"
    >
      {/* Producto */}
      <section className="relative z-10">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Producto
        </p>
        <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
          ¿Qué fermento probaste?
        </h2>
        <label htmlFor="productId" className="mt-4 block text-sm font-medium text-deep/80">
          Producto disponible
        </label>
        <select
          id="productId"
          name="productId"
          required
          value={form.productId}
          onChange={(e) => handleProductChange(e.target.value)}
          className="select select-bordered relative z-20 mt-2 w-full min-h-12 rounded-2xl border-base-300 bg-white"
          disabled={status === "loading"}
        >
          <option value="">Elige un producto</option>
          {availableProducts.map((p) => (
            <option key={p.id} value={p.id}>
              {categoryLabels[p.category]} · {p.name}
            </option>
          ))}
        </select>
      </section>

      {/* Experiencia previa */}
      <section>
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Experiencia
        </p>
        <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
          ¿Conocías o habías probado fermentados antes?
        </h2>
        <p className="mt-2 text-sm text-deep/65">
          Kéfir, kombucha, yogurt vivo, chucrut u otros fermentos.
        </p>
        <ChoiceGroup
          name="fermentedBefore"
          options={FERMENTED_BEFORE_OPTIONS}
          value={form.fermentedBefore}
          onChange={(v) => update("fermentedBefore", v)}
          required
          columns="sm:grid-cols-1"
        />
      </section>

      {/* Sabor */}
      <section>
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Sabor
        </p>
        <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
          ¿Qué tal estuvo el sabor?
        </h2>
        <p className="mt-2 text-sm text-deep/65">
          Califica cada atributo. Las opciones cambian según el tipo de fermento.
        </p>

        {!selectedProduct && (
          <p className="mt-4 rounded-2xl bg-cream/80 px-4 py-3 text-sm text-deep/60">
            Elige un producto arriba para ver las calificaciones de sabor.
          </p>
        )}

        {selectedProduct && (
          <>
            <RatingScale
              id="acidity"
              name="acidityRating"
              label="Acidez"
              value={form.acidityRating}
              required
              onChange={(v) => update("acidityRating", v)}
            />
            {isKefir && (
              <RatingScale
                id="creaminess"
                name="creaminessRating"
                label="Cremosidad"
                value={form.creaminessRating}
                required
                onChange={(v) => update("creaminessRating", v)}
              />
            )}
            <RatingScale
              id="sweetness"
              name="sweetnessRating"
              label="Dulzor"
              value={form.sweetnessRating}
              required
              onChange={(v) => update("sweetnessRating", v)}
            />
            {isBubbly && (
              <RatingScale
                id="bubbles"
                name="bubblesRating"
                label="Burbujas / efervescencia"
                value={form.bubblesRating}
                required
                onChange={(v) => update("bubblesRating", v)}
              />
            )}
            <RatingScale
              id="taste"
              name="tasteRating"
              label="Sabor en general"
              value={form.tasteRating}
              required
              onChange={(v) => update("tasteRating", v)}
            />
          </>
        )}

        <label htmlFor="tasteComment" className="mt-5 block text-sm font-medium text-deep/80">
          Comentario libre de sabor <span className="font-normal text-deep/45">(opcional)</span>
        </label>
        <textarea
          id="tasteComment"
          name="tasteComment"
          rows={3}
          maxLength={1000}
          value={form.tasteComment}
          onChange={(e) => update("tasteComment", e.target.value)}
          placeholder="Ej. Más ácido de lo esperado, cremoso justito, muy refrescante…"
          className="textarea textarea-bordered mt-2 w-full rounded-2xl border-base-300 bg-cream/40"
          disabled={status === "loading"}
        />
      </section>

      {/* Presentación */}
      <section>
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Presentación
        </p>
        <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
          ¿Cómo se vio la botella?
        </h2>
        <p className="mt-2 text-sm text-deep/65">
          Etiqueta, tapa, limpieza, si llegó bien cerrado y con buena cara.
        </p>
        <RatingScale
          id="presentation"
          name="presentationRating"
          label="Presentación en general"
          value={form.presentationRating}
          required
          onChange={(v) => update("presentationRating", v)}
        />
        <label
          htmlFor="presentationComment"
          className="mt-5 block text-sm font-medium text-deep/80"
        >
          Detalle de presentación <span className="font-normal text-deep/45">(opcional)</span>
        </label>
        <textarea
          id="presentationComment"
          name="presentationComment"
          rows={3}
          maxLength={1000}
          value={form.presentationComment}
          onChange={(e) => update("presentationComment", e.target.value)}
          placeholder="Ej. La etiqueta se veía nítida, la tapa venía firme…"
          className="textarea textarea-bordered mt-2 w-full rounded-2xl border-base-300 bg-cream/40"
          disabled={status === "loading"}
        />
      </section>

      {/* Compra */}
      <section>
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Compra
        </p>
        <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
          ¿Cómo lo obtuviste?
        </h2>
        <ChoiceGroup
          name="purchaseMethod"
          options={PURCHASE_OPTIONS}
          value={form.purchaseMethod}
          onChange={handlePurchaseChange}
          required
          columns="sm:grid-cols-2 lg:grid-cols-3"
        />
      </section>

      {/* Entrega o muestra */}
      {isFreeSample ? (
        <section>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
            Muestra
          </p>
          <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
            ¿Dónde recibiste tu muestra?
          </h2>
          <ChoiceGroup
            name="sampleChannel"
            options={SAMPLE_CHANNEL_OPTIONS}
            value={form.sampleChannel}
            onChange={(v) => update("sampleChannel", v)}
            required
            columns="sm:grid-cols-2"
          />
          <label
            htmlFor="sampleChannelOther"
            className="mt-4 block text-sm font-medium text-deep/80"
          >
            ¿Cuál?
            {form.sampleChannel !== "otro" && (
              <span className="font-normal text-deep/45"> (opcional)</span>
            )}
          </label>
          <input
            id="sampleChannelOther"
            name="sampleChannelOther"
            type="text"
            required={form.sampleChannel === "otro"}
            maxLength={160}
            value={form.sampleChannelOther}
            onChange={(e) => update("sampleChannelOther", e.target.value)}
            placeholder="Ej. nombre del evento, mercadito o lugar"
            className="input input-bordered mt-2 w-full min-h-12 rounded-2xl border-base-300 bg-cream/40"
            disabled={status === "loading"}
          />
        </section>
      ) : (
        <section>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
            Entrega
          </p>
          <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
            ¿Cómo fue la entrega?
          </h2>
          <p className="mt-2 text-sm text-deep/65">
            Tiempo, coordinación y si llegó fresco y en buen estado.
          </p>
          <RatingScale
            id="delivery"
            name="deliveryRating"
            label="Entrega en general"
            value={form.deliveryRating}
            onChange={(v) => update("deliveryRating", v)}
          />
          <label htmlFor="deliveryComment" className="mt-5 block text-sm font-medium text-deep/80">
            Detalle de entrega <span className="font-normal text-deep/45">(opcional)</span>
          </label>
          <textarea
            id="deliveryComment"
            name="deliveryComment"
            rows={3}
            maxLength={1000}
            value={form.deliveryComment}
            onChange={(e) => update("deliveryComment", e.target.value)}
            placeholder="Ej. Llegó frío y a tiempo, me avisaron por WhatsApp…"
            className="textarea textarea-bordered mt-2 w-full rounded-2xl border-base-300 bg-cream/40"
            disabled={status === "loading"}
          />
        </section>
      )}

      {/* Contacto + extra */}
      <section>
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Para cerrar
        </p>
        <h2 className="font-display mt-2 text-xl font-bold text-deep md:text-2xl">
          ¿Algo más que quieras contarnos?
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-deep/80">
              Nombre <span className="font-normal text-deep/45">(opcional)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={120}
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input input-bordered mt-2 w-full min-h-12 rounded-2xl border-base-300 bg-cream/40"
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-deep/80">
              WhatsApp o correo <span className="font-normal text-deep/45">(opcional)</span>
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              maxLength={160}
              autoComplete="tel"
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
              placeholder="Por si queremos agradecerte"
              className="input input-bordered mt-2 w-full min-h-12 rounded-2xl border-base-300 bg-cream/40"
              disabled={status === "loading"}
            />
          </div>
        </div>
        <label htmlFor="extraComment" className="mt-4 block text-sm font-medium text-deep/80">
          Comentario libre <span className="font-normal text-deep/45">(opcional)</span>
        </label>
        <textarea
          id="extraComment"
          name="extraComment"
          rows={3}
          maxLength={1000}
          value={form.extraComment}
          onChange={(e) => update("extraComment", e.target.value)}
          placeholder="Sugerencias, sabores que te gustaría ver, lo que sea…"
          className="textarea textarea-bordered mt-2 w-full rounded-2xl border-base-300 bg-cream/40"
          disabled={status === "loading"}
        />
      </section>

      {status === "error" && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 border-t border-base-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-deep/50">
          Tu opinión se usa para mejorar productos y entregas. No la publicamos sin pedirte permiso.
        </p>
        <button
          type="submit"
          className="btn min-h-12 shrink-0 rounded-full border-0 bg-coral px-8 font-ui font-bold text-cream hover:bg-coral/90"
          disabled={status === "loading"}
        >
          {status === "loading" && <span className="loading loading-spinner loading-sm" />}
          {status === "loading" ? "Enviando…" : "Enviar retroalimentación"}
        </button>
      </div>
    </form>
  )
}

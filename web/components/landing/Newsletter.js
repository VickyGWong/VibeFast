"use client"

import { useState } from "react"
import config from "@/config"

export default function Newsletter() {
  const { eyebrow, title, subtitle, buttonLabel, placeholder, successMessage } =
    config.landing.newsletter

  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  async function onSubmit(event) {
    event.preventDefault()
    setStatus("loading")
    setError(null)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "No pudimos guardar tu correo.")
      }
      setStatus("success")
      setEmail("")
    } catch (err) {
      setError(err.message)
      setStatus("error")
    }
  }

  return (
    <section id="novedades" className="bg-sky py-16 text-cream md:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-cream/80">
          {eyebrow}
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
        <p className="mt-4 text-cream/85">{subtitle}</p>

        {status === "success" ? (
          <p className="mt-8 rounded-[1.5rem] bg-cream px-5 py-6 font-display font-bold text-deep">
            {successMessage}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={placeholder}
              className="input input-bordered min-h-12 flex-1 rounded-full border-0 bg-cream text-deep"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="btn min-h-12 rounded-full border-0 bg-coral font-display font-bold text-cream hover:bg-coral/90"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando…" : buttonLabel}
            </button>
          </form>
        )}

        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-cream">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}

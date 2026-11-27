"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import config from "@/config"
import { formatPrice, getGeneralWhatsAppUrl } from "@/lib/whatsapp"

/**
 * @typedef {{ id: string, name: string, size: string, priceCents: number, note?: string }} MenuItem
 * @typedef {{ id: string, label: string, blurb: string, tone: 'sky' | 'yellow' | 'orange', items: MenuItem[] }} MenuSection
 */

/**
 * @param {{ sections: MenuSection[] }} props
 */
export default function MenuBoard({ sections }) {
  const [ready, setReady] = useState(false)
  const [captureMode, setCaptureMode] = useState(false)
  const whatsappUrl = getGeneralWhatsAppUrl()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setCaptureMode(params.get("capture") === "1")
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  function handlePrint() {
    window.print()
  }

  return (
    <div
      className={`menu-board ${ready ? "menu-board--ready" : ""} ${captureMode ? "menu-board--capture" : ""}`}
    >
      <div className="menu-chrome print:hidden">
        <Link href="/" className="menu-chrome__link">
          Volver al sitio
        </Link>
        <div className="menu-chrome__actions">
          <a
            href="/menu/carta-the-good-co.png"
            download="carta-the-good-co.png"
            className="menu-chrome__link"
          >
            Descargar imagen
          </a>
          <button type="button" onClick={handlePrint} className="menu-chrome__btn">
            Imprimir / PDF
          </button>
        </div>
      </div>

      <article className="menu-sheet" aria-label="Menú The Good Co.">
        <header className="menu-hero">
          <div className="menu-bubbles" aria-hidden>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className={`menu-bubble menu-bubble--${i}`} />
            ))}
          </div>

          <div className="menu-hero__mark">
            <Image
              src={config.brand.logoSrc}
              alt=""
              width={96}
              height={96}
              className="menu-hero__icon"
              priority
            />
            <p className="font-brand menu-hero__brand">{config.brand.logoText}</p>
          </div>

          <p className="menu-hero__claim">{config.app.claim}</p>
          <h1 className="menu-hero__title">Carta de hoy</h1>
          <p className="menu-hero__place">
            Hechos artesanalmente en {config.contact.city}
          </p>
        </header>

        <div className="menu-grid">
          {sections.map((section, index) => (
            <section
              key={section.id}
              className={`menu-section menu-section--${section.tone}`}
              style={{ "--delay": `${0.12 + index * 0.1}s` }}
            >
              <div className="menu-section__head">
                <h2 className="menu-section__title">{section.label}</h2>
                <p className="menu-section__blurb">{section.blurb}</p>
              </div>

              <ul className="menu-list">
                {section.items.map((item) => (
                  <li key={item.id} className="menu-item">
                    <div className="menu-item__row">
                      <span className="menu-item__name">{item.name}</span>
                      <span className="menu-item__rule" aria-hidden />
                      <span className="menu-item__price">
                        ${formatPrice(item.priceCents)}
                        <span className="menu-item__currency"> MXN</span>
                      </span>
                    </div>
                    <p className="menu-item__meta">
                      {item.size}
                      {item.note ? ` · ${item.note}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="menu-aside">
          <p className="menu-aside__tagline">{config.app.tagline}</p>
          <p className="menu-aside__note">
            Cultivos vivos, lotes pequeños e ingredientes reales. Conservar refrigerado.
          </p>
        </aside>

        <footer className="menu-foot">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-foot__pill menu-foot__pill--wa"
          >
            WhatsApp {config.contact.whatsappDisplay}
          </a>
          <a
            href={config.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-foot__pill"
          >
            {config.contact.instagramHandle}
          </a>
          <p className="menu-foot__city">{config.contact.city}, México</p>
        </footer>
      </article>
    </div>
  )
}

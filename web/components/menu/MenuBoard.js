"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import config from "@/config"
import { formatPrice, getGeneralWhatsAppUrl } from "@/lib/whatsapp"

/**
 * @typedef {{ id: string, name: string, size: string, priceCents: number, note?: string }} MenuItem
 * @typedef {{
 *   id: string,
 *   label: string,
 *   blurb: string,
 *   detail?: string,
 *   tone: 'sky' | 'yellow' | 'orange' | 'featured',
 *   featured?: boolean,
 *   items: MenuItem[]
 * }} MenuSection
 */

/**
 * @param {{ sections: MenuSection[] }} props
 */
export default function MenuBoard({ sections }) {
  const [ready, setReady] = useState(false)
  const [captureMode, setCaptureMode] = useState(false)
  const whatsappUrl = getGeneralWhatsAppUrl()
  const siteUrl = `https://${config.app.domain}`
  const featured = sections.filter((section) => section.featured)
  const rest = sections.filter((section) => !section.featured)

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

          <div className="menu-hero__logo-wrap">
            <Image
              src="/brand/logotipo-horizontal.png"
              alt={config.app.name}
              width={2063}
              height={599}
              className="menu-hero__logo"
              priority
            />
          </div>

          <p className="menu-hero__place">
            Hechos artesanalmente en {config.contact.city}
          </p>
        </header>

        {featured.map((section, index) => (
          <MenuSectionBlock
            key={section.id}
            section={section}
            delay={0.08 + index * 0.08}
          />
        ))}

        <div className="menu-grid">
          {rest.map((section, index) => (
            <MenuSectionBlock
              key={section.id}
              section={section}
              delay={0.18 + index * 0.1}
            />
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
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-foot__pill menu-foot__pill--web"
          >
            {config.app.domain}
          </a>
          <p className="menu-foot__city">{config.contact.city}, México</p>
        </footer>
      </article>
    </div>
  )
}

/**
 * @param {{ section: MenuSection, delay: number }} props
 */
function MenuSectionBlock({ section, delay }) {
  return (
    <section
      className={`menu-section menu-section--${section.tone}${section.featured ? " menu-section--featured" : ""}`}
      style={{ "--delay": `${delay}s` }}
    >
      <div className="menu-section__head">
        {section.featured && <p className="menu-section__eyebrow">Lo de hoy · eventos</p>}
        <h2 className="menu-section__title">{section.label}</h2>
        <p className="menu-section__blurb">{section.blurb}</p>
        {section.detail && <p className="menu-section__detail">{section.detail}</p>}
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
            {(item.size || item.note) && (
              <p className="menu-item__meta">
                {[item.size, item.note].filter(Boolean).join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

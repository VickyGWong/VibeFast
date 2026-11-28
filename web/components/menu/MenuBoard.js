"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import config from "@/config"
import { formatPrice, getGeneralWhatsAppUrl } from "@/lib/whatsapp"

/**
 * @typedef {{ id: string, name: string, size: string, priceCents: number, note?: string }} MenuItem
 * @typedef {{
 *   id: string,
 *   label: string,
 *   blurb: string,
 *   detail?: string,
 *   tone: 'sky' | 'yellow' | 'orange' | 'coral',
 *   featured?: boolean,
 *   items: MenuItem[]
 * }} MenuSection
 */

/**
 * @param {{ sections: MenuSection[], captureMode?: boolean }} props
 */
export default function MenuBoard({ sections, captureMode = false }) {
  const [ready, setReady] = useState(false)
  const whatsappUrl = getGeneralWhatsAppUrl()
  const siteUrl = `https://${config.app.domain}`
  const featured = sections.filter((section) => section.featured)
  const rest = sections.filter((section) => !section.featured)

  useEffect(() => {
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
        <div className="menu-main">
          {featured.map((section, index) => (
            <FeaturedOatsBlock
              key={section.id}
              section={section}
              delay={0.08 + index * 0.08}
            />
          ))}

          <div className="menu-grid">
            {rest.map((section, index) => (
              <CatalogSectionBlock
                key={section.id}
                section={section}
                delay={0.16 + index * 0.08}
              />
            ))}
          </div>
        </div>

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
        </footer>
      </article>
    </div>
  )
}

/**
 * @param {{ section: MenuSection, delay: number }} props
 */
function FeaturedOatsBlock({ section, delay }) {
  const priceCents = section.items[0]?.priceCents ?? 0

  return (
    <section
      className={`menu-section menu-section--${section.tone} menu-section--featured`}
      style={{ "--delay": `${delay}s` }}
    >
      <div className="menu-featured__layout">
        <div className="menu-section__head menu-section__head--featured">
          <p className="menu-section__eyebrow">Solo en eventos</p>
          <h2 className="menu-section__title menu-section__title--hero">{section.label}</h2>
          <p className="menu-section__blurb menu-section__blurb--featured">{section.blurb}</p>
        </div>

        <div className="menu-featured__price">
          <span className="menu-item__price menu-item__price--hero">
            ${formatPrice(priceCents)}
            <span className="menu-item__currency">MXN</span>
          </span>
          <p className="menu-item__meta menu-item__meta--hero">c/u</p>
        </div>
      </div>
    </section>
  )
}

/**
 * @param {{ section: MenuSection, delay: number }} props
 */
function CatalogSectionBlock({ section, delay }) {
  return (
    <section
      className={`menu-section menu-section--${section.tone}`}
      style={{ "--delay": `${delay}s` }}
    >
      <div className="menu-section__head">
        <h2 className="menu-section__title">{section.label}</h2>
        {section.blurb && <p className="menu-section__blurb">{section.blurb}</p>}
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

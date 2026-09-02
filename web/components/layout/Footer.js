import Link from "next/link"
import config from "@/config"
import Logo from "@/components/Logo"
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp"

function FooterLink({ link, className }) {
  if (link.href === "whatsapp") {
    return (
      <Link
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {link.label}
    </Link>
  )
}

export default function Footer() {
  const { tagline, columns = [] } = config.landing.footer

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="size-7" />
              <span className="font-display text-lg font-bold text-deep">
                {config.brand.logoText}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-deep/60">{tagline}</p>
            <p className="mt-2 text-sm text-deep/50">{config.app.claim}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-bold text-deep">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      link={link}
                      className="text-sm text-deep/60 transition hover:text-sky"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-base-300 pt-6 text-sm text-deep/50 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {config.brand.logoText} · {config.contact.city}, México
          </span>
          <span>{config.app.domain}</span>
        </div>
      </div>
    </footer>
  )
}

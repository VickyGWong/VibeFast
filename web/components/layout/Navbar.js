import Link from "next/link"
import { Menu } from "lucide-react"
import config from "@/config"
import Logo from "@/components/Logo"
import TopBar from "@/components/landing/TopBar"
import WhatsAppButton from "@/components/landing/WhatsAppButton"
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp"

function NavLink({ item, className }) {
  if (item.href === "whatsapp") {
    return (
      <Link
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.label}
      </Link>
    )
  }
  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  )
}

export default function Navbar() {
  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-40 w-full border-b border-base-300/80 bg-base-100/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="dropdown md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-sm min-h-11 px-2" aria-label="Abrir menú">
                <Menu className="size-5" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-2 w-52 rounded-2xl border border-base-300 bg-base-100 p-2 shadow"
              >
                {config.landing.nav.map((item) => (
                  <li key={item.href}>
                    <NavLink item={item} />
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/" className="flex items-center gap-2">
              <Logo className="size-8" />
              <span className="font-display text-lg font-bold tracking-tight text-deep">
                {config.brand.logoText}
              </span>
            </Link>
          </div>

          <ul className="hidden items-center gap-6 md:flex">
            {config.landing.nav.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  className="text-sm text-deep/70 transition hover:text-deep"
                />
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <WhatsAppButton source="navbar" className="btn-sm" />
          </div>
        </nav>
      </header>
    </>
  )
}

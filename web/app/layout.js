import "./globals.css"
import VercelAnalytics from "@/components/Analytics"
import config from "@/config"

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || config.app.defaultUrl
  ),
  title: {
    default: config.app.seoTitle || config.app.name,
    template: `%s · ${config.app.name}`,
  },
  description: config.app.description,
  openGraph: {
    title: config.app.seoTitle || config.app.name,
    description: config.app.description,
    type: "website",
    locale: config.app.locale === "es" ? "es_MX" : "en_US",
    siteName: config.app.name,
    url: `https://${config.app.domain}`,
  },
  twitter: {
    card: "summary_large_image",
    title: config.app.seoTitle || config.app.name,
    description: config.app.description,
  },
  alternates: {
    canonical: `https://${config.app.domain}`,
  },
  icons: { icon: "/favicon.svg" },
}

export const viewport = {
  themeColor: config.brand.primary,
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html
      lang={config.app.locale}
      data-theme="thegoodco"
      suppressHydrationWarning
      style={{ "--color-primary": config.brand.primary }}
    >
      <body className="bg-base-100 text-base-content antialiased">
        {children}
        <VercelAnalytics />
      </body>
    </html>
  )
}

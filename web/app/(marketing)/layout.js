import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { WhatsAppFab } from "@/components/landing/WhatsAppButton"

export default function MarketingLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}

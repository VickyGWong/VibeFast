import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { WhatsAppFab } from "@/components/landing/WhatsAppButton"
import { CartProvider } from "@/lib/cart/CartProvider"
import CartDrawer from "@/components/shop/CartDrawer"

export default function MarketingLayout({ children }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}

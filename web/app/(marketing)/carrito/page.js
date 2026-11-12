import CartPageClient from "@/components/shop/CartPageClient"

export const metadata = {
  title: "Carrito | The Good Co.",
  description: "Revisa tu pedido de fermentos y continúa con la compra.",
}

export default function CarritoPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Carrito
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold text-deep md:text-5xl">
          Tu pedido
        </h1>
        <p className="mt-4 max-w-2xl text-deep/75">
          Ajusta cantidades y continúa con la compra. WhatsApp se habilita después de elegir entrega,
          zona y horario.
        </p>
        <div className="mt-10">
          <CartPageClient />
        </div>
      </div>
    </main>
  )
}

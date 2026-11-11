import CheckoutForm from "@/components/shop/CheckoutForm"

export const metadata = {
  title: "Checkout | The Good Co.",
  description: "Completa tu pedido de fermentos artesanales con entrega o recolección en Chihuahua.",
}

export default function CheckoutPage() {
  return (
    <section className="bg-cream py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Checkout
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold text-deep md:text-5xl">
          Completa tu compra aquí
        </h1>
        <p className="mt-4 max-w-2xl text-deep/70">
          Elige entrega o recolección, agenda horario y paga por SPEI, Oxxo o al recibir. WhatsApp
          solo si tú lo decides.
        </p>
        <div className="mt-10">
          <CheckoutForm />
        </div>
      </div>
    </section>
  )
}

import config from "@/config"

export const metadata = {
  title: "Términos de servicio",
  description: `Términos de servicio de ${config.app.name}.`,
}

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">Legal</p>
      <h1 className="font-display mt-3 text-4xl font-bold text-deep">Términos de servicio</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-deep/75">
        <p>
          Al usar {config.app.domain} o pedirnos por WhatsApp, aceptas estos términos. Vendemos
          fermentos artesanales vivos, elaborados en {config.contact.city}, México.
        </p>
        <p>
          Los precios están en pesos mexicanos y pueden cambiar. La disponibilidad depende del lote
          del día. Un pedido se confirma cuando te respondemos por WhatsApp o cuando el pago en
          línea queda acreditado.
        </p>
        <p>
          Como son productos refrigerados y perecederos, coordinamos entrega local. Si no hay quien
          reciba en el horario acordado, reprogramamos contigo. No hacemos devoluciones de producto
          abierto o que no se mantuvo en frío.
        </p>
        <p>
          El pago en línea se procesa con Mercado Pago. El pedido por WhatsApp puede pagarse por los
          medios que acordemos al confirmar.
        </p>
        <p>
          Dudas: {config.contact.email} o WhatsApp {config.contact.whatsappDisplay}.
        </p>
        <p>Última actualización: septiembre 2026.</p>
      </div>
    </article>
  )
}

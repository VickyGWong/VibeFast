import config from "@/config"

export const metadata = {
  title: "Aviso de privacidad",
  description: `Aviso de privacidad de ${config.app.name}.`,
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">Legal</p>
      <h1 className="font-display mt-3 text-4xl font-bold text-deep">Aviso de privacidad</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-deep/75">
        <p>
          {config.app.name} ({config.app.domain}), con domicilio en {config.contact.city}, México,
          es responsable del tratamiento de tus datos personales.
        </p>
        <p>
          Recabamos nombre, teléfono, correo y datos de pedido cuando escribes por WhatsApp, te
          suscribes al boletín o compras en línea. Los usamos para atender tu pedido, coordinar
          entregas y, si lo aceptas, enviarte novedades de la marca.
        </p>
        <p>
          No vendemos tu información. Podemos comunicarla a proveedores que nos ayudan a operar
          (por ejemplo, WhatsApp, correo o pagos), solo para cumplir el servicio que pediste.
        </p>
        <p>
          Para acceder, corregir o cancelar tus datos, o para dejar de recibir novedades, escríbenos
          a {config.contact.email} o por WhatsApp al {config.contact.whatsappDisplay}.
        </p>
        <p>Última actualización: septiembre 2026.</p>
      </div>
    </article>
  )
}

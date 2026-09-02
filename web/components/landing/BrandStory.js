import config from "@/config"

export default function BrandStory() {
  return (
    <section id="historia" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">
            Nuestra historia
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
            Fermentos honestos desde Chihuahua
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-deep/75">
            <p>
              The Good Co. nació con una idea simple: hacer fermentos que se sientan vivos, frescos y
              cercanos — sin estética fría ni promesas vacías. Elaboramos en Chihuahua con ingredientes
              reales y lotes pequeños porque creemos que lo bueno se nota en el sabor.
            </p>
            <p>
              Cada botella lleva el cuidado de un proceso artesanal: cultivo activo, tiempos de
              fermentación respetados y una obsesión sana por la calidad. No somos una fábrica
              impersonale — somos una marca con cara, burbujas y mucha personalidad.
            </p>
            <p className="font-display text-lg font-bold text-deep">{config.app.tagline}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-base-300 bg-gradient-to-br from-sky/20 via-base-100 to-yellow/20 p-8">
          <blockquote className="font-display text-2xl font-bold leading-snug text-deep">
            &ldquo;Seguimos comprometidos con ofrecer productos honestos, deliciosos y realmente
            buenos… no, excelentes.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-deep/60">— Equipo {config.app.name}</p>
          <ul className="mt-8 space-y-2 text-sm text-deep/70">
            <li>📍 {config.contact.city}, México · CP {config.contact.postalCode}</li>
            <li>📱 WhatsApp {config.contact.whatsappDisplay}</li>
            <li>🌐 {config.app.domain}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

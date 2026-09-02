import config from "@/config"

export default function FAQ() {
  const { eyebrow, title, items } = config.landing.faq

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:py-20">
      <div className="text-center">
        <p className="font-display text-sm font-bold uppercase tracking-wider text-sky">{eyebrow}</p>
        <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">{title}</h2>
      </div>

      <div className="mt-10 space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-3xl border border-base-300 bg-base-100 px-5 py-4 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-display font-bold text-deep marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-sky transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-deep/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

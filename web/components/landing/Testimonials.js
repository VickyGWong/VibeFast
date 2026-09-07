import { Star } from "lucide-react"
import config from "@/config"

export default function Testimonials() {
  const { eyebrow, title, subtitle, items } = config.landing.testimonials

  return (
    <section id="testimonios" className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
            {eyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-deep md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-4 text-deep/70">{subtitle}</p>}
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.author} className="flex flex-col rounded-[1.5rem] bg-white p-6 shadow-sm">
              <div className="flex gap-0.5 text-yellow">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-deep/80">
                “{item.quote}”
              </blockquote>
              <div className="mt-5">
                <p className="font-display font-bold text-deep">{item.author}</p>
                <p className="text-sm text-deep/55">{item.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

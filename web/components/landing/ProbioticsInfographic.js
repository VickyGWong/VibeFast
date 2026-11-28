"use client"

import { useId } from "react"
import {
  Apple,
  Banana,
  CircleDot,
  Droplets,
  Leaf,
  Milk,
  Salad,
  Sparkles,
  Wheat,
} from "lucide-react"

const citations = [
  {
    id: "hill2014",
    short: "ISAPP, 2014",
    href: "https://doi.org/10.1038/nrgastro.2014.66",
    full: "Hill, C. et al. (2014). Consenso ISAPP sobre el término probiótico. Nat. Rev. Gastroenterol. Hepatol.",
  },
  {
    id: "gibson2017",
    short: "ISAPP, 2017",
    href: "https://doi.org/10.1038/nrgastro.2017.75",
    full: "Gibson, G. R. et al. (2017). Consenso ISAPP sobre prebióticos. Nat. Rev. Gastroenterol. Hepatol.",
  },
  {
    id: "swanson2020",
    short: "ISAPP, 2020",
    href: "https://doi.org/10.1038/s41575-020-0344-2",
    full: "Swanson, K. S. et al. (2020). Consenso ISAPP sobre sinbióticos. Nat. Rev. Gastroenterol. Hepatol.",
  },
  {
    id: "marco2021",
    short: "ISAPP, 2021",
    href: "https://doi.org/10.1038/s41575-020-00390-5",
    full: "Marco, M. L. et al. (2021). Consenso ISAPP sobre alimentos fermentados. Nat. Rev. Gastroenterol. Hepatol.",
  },
  {
    id: "wastyk2021",
    short: "Stanford / Cell, 2021",
    href: "https://doi.org/10.1016/j.cell.2021.06.019",
    full: "Wastyk, H. C. et al. (2021). Dietas fermentadas y microbioma. Cell. Stanford Medicine.",
  },
  {
    id: "dimidi2019",
    short: "King’s College London, 2019",
    href: "https://doi.org/10.3390/nu11081806",
    full: "Dimidi, E. et al. (2019). Fermented foods y salud gastrointestinal. Nutrients. King’s College London.",
  },
  {
    id: "azizi2021",
    short: "meta-análisis, 2021",
    href: "https://pubmed.ncbi.nlm.nih.gov/34280689/",
    full: "Azizi et al. (2021). Meta-análisis de RCTs: kéfir y control glucémico. PubMed.",
  },
  {
    id: "kombucha2025",
    short: "revisión clínica, 2025",
    href: "https://doi.org/10.3390/fermentation11060353",
    full: "Revisión sistemática de ensayos clínicos sobre kombucha, microbiota y salud metabólica (2025).",
  },
  {
    id: "isapp-prebiotic-foods",
    short: "ISAPP, guía",
    href: "https://isappscience.org/topic/prebiotics/",
    full: "ISAPP. Prebióticos: definición y alimentos que contienen sustratos prebióticos (cebolla, ajo, plátano, avena, etc.).",
  },
]

function Cite({ id }) {
  const citation = citations.find((item) => item.id === id)
  if (!citation) return null
  return (
    <>
      <a
        href={citation.href}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 align-super text-[0.7rem] font-ui font-semibold text-deep/55 underline decoration-deep/25 underline-offset-2 transition hover:text-sky"
        title={citation.full}
        aria-label={`Fuente: ${citation.short}`}
      >
        {citation.short}
      </a>{" "}
    </>
  )
}

const companionFoods = [
  {
    name: "Plátano",
    tip: "Fibra amable para acompañar el kéfir en el desayuno.",
    icon: Banana,
    tone: "bg-yellow/25 text-deep",
  },
  {
    name: "Avena",
    tip: "Perfecta en bowl o smoothie con kéfir natural.",
    icon: Wheat,
    tone: "bg-sky/20 text-deep",
  },
  {
    name: "Manzana",
    tip: "Pectina y crujiente: buena pareja del fermento.",
    icon: Apple,
    tone: "bg-coral/15 text-deep",
  },
  {
    name: "Cebolla y ajo",
    tip: "En comidas reales; la kombucha acompaña sin drama.",
    icon: Leaf,
    tone: "bg-orange/15 text-deep",
  },
  {
    name: "Verduras de hoja",
    tip: "Ensalada + kombucha = combo fresco y ligero.",
    icon: Salad,
    tone: "bg-sky/15 text-deep",
  },
  {
    name: "Legumbres",
    tip: "Fibra de verdad para que tu microbiota tenga con qué trabajar.",
    icon: Sparkles,
    tone: "bg-yellow/20 text-deep",
  },
]

const combos = [
  {
    title: "Kéfir + avena + plátano",
    body: "Bowl cremoso de mañana. Los cultivitos llegan con compañía fibrosa.",
    badge: "Desayuno",
    accent: "bg-sky text-cream",
  },
  {
    title: "Kombucha + comida con verduras",
    body: "En vez del refresco, un sorbo vivo junto a tu plato de siempre.",
    badge: "Comida",
    accent: "bg-yellow text-deep",
  },
  {
    title: "Kéfir + granola + fruta",
    body: "Snack sin complicarte: cremoso, fresco y con textura.",
    badge: "Entre horas",
    accent: "bg-orange text-cream",
  },
  {
    title: "Kombucha bien fría + tarde calurosa",
    body: "Burbujas para bajarle al calor. Sin sermón, solo gusto.",
    badge: "Tarde",
    accent: "bg-coral text-cream",
  },
]

export default function ProbioticsInfographic() {
  const titleId = useId()

  return (
    <section
      id="infografia"
      aria-labelledby={titleId}
      className="relative scroll-mt-28 overflow-hidden bg-cream"
    >
      {/* Intro */}
      <div className="relative bg-deep text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute -left-10 top-8 size-40 rounded-full bg-sky/40 blur-3xl" />
          <div className="absolute right-0 top-0 size-52 rounded-full bg-yellow/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-36 rounded-full bg-orange/25 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-yellow">
            Infografía · The Good Co.
          </p>
          <h2
            id={titleId}
            className="font-display mt-3 max-w-3xl text-balance text-3xl font-bold leading-tight md:text-5xl"
          >
            Probióticos, kéfir y kombucha… sin que te duerma la explicación
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/85">
            Aquí va lo importante, en español de a diario: qué son esos microorganismos
            amigables, por qué nuestros fermentos pueden acompañarte, y con qué
            comiditas se llevan mejor. Con ciencia detrás, pero sin tono de tesis.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 md:space-y-20 md:py-20">
        {/* Qué son */}
        <div className="grid items-start gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
              Paso 1 · Lo básico
            </p>
            <h3 className="font-display mt-3 text-3xl font-bold text-deep md:text-4xl">
              ¿Qué son los probióticos?
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-deep/80">
              En corto: son microorganismos vivos que, en la cantidad adecuada, pueden
              aportar un beneficio a tu salud.
              <Cite id="hill2014" />
              No son magia ni pastilla milagro: son “bichitos buenos” que llegan vivos
              y, si el contexto ayuda, hacen su chamba.
            </p>
            <p className="mt-4 leading-relaxed text-deep/70">
              Ojo con el detalle fino: un alimento fermentado (como kéfir o kombucha)
              trae cultivos vivos, pero no todo fermento se etiqueta automáticamente
              como “probiótico”. Eso pide evidencia específica.
              <Cite id="marco2021" />
              Nosotros hablamos con honestidad: fermentos vivos, ricos, y con estudios
              que sí respaldan hábitos de consumo.
            </p>
          </div>

          <aside className="rounded-[1.75rem] border border-sky/25 bg-sky/10 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-sky text-cream">
                <CircleDot className="size-6" aria-hidden />
              </span>
              <p className="font-display text-xl font-bold text-deep">Traducción casera</p>
            </div>
            <ul className="mt-5 space-y-3 text-deep/80">
              <li className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-yellow" aria-hidden />
                Vivos (no pasteurizados a muerte).
              </li>
              <li className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-yellow" aria-hidden />
                En cantidad que importe.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-yellow" aria-hidden />
                Con beneficio documentado — no solo “suena sano”.
              </li>
            </ul>
          </aside>
        </div>

        {/* Beneficios kéfir / kombucha */}
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Paso 2 · Por qué te pueden caer bien
          </p>
          <h3 className="font-display mt-3 max-w-3xl text-3xl font-bold text-deep md:text-4xl">
            Beneficios de consumir kéfir y kombucha
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-deep/70">
            No te vamos a vender milagros. Te contamos lo que sí se ha visto en
            investigación seria — y con N de verdad, no de anuncio de Instagram.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="overflow-hidden rounded-[1.75rem] border border-sky/30 bg-white">
              <div className="flex items-center gap-3 bg-sky px-6 py-5 text-cream">
                <Milk className="size-7" aria-hidden />
                <div>
                  <p className="font-display text-2xl font-bold">Kéfir</p>
                  <p className="text-sm text-cream/85">Cremoso, lácteo y con carácter</p>
                </div>
              </div>
              <ul className="space-y-4 p-6 text-deep/80">
                <li>
                  <p className="font-display font-bold text-deep">Diversidad intestinal</p>
                  <p className="mt-1 leading-relaxed">
                    En un ensayo de Stanford, una dieta rica en fermentados (incluido
                    kéfir) aumentó la diversidad del microbioma en adultos sanos.
                    <Cite id="wastyk2021" />
                  </p>
                </li>
                <li>
                  <p className="font-display font-bold text-deep">Señales de menos inflamación</p>
                  <p className="mt-1 leading-relaxed">
                    En ese mismo estudio bajaron varias proteínas inflamatorias en
                    sangre — entre ellas la IL-6.
                    <Cite id="wastyk2021" />
                  </p>
                </li>
                <li>
                  <p className="font-display font-bold text-deep">Digestión y más evidencia</p>
                  <p className="mt-1 leading-relaxed">
                    Revisiones académicas señalan al kéfir como uno de los fermentos
                    con más ensayos clínicos en salud gastrointestinal, con indicios
                    favorables para digerir lactosa.
                    <Cite id="dimidi2019" />
                    También hay meta-análisis de RCTs sobre marcadores glucémicos.
                    <Cite id="azizi2021" />
                  </p>
                </li>
              </ul>
            </article>

            <article className="overflow-hidden rounded-[1.75rem] border border-yellow/40 bg-white">
              <div className="flex items-center gap-3 bg-yellow px-6 py-5 text-deep">
                <Droplets className="size-7" aria-hidden />
                <div>
                  <p className="font-display text-2xl font-bold">Kombucha</p>
                  <p className="text-sm text-deep/75">Té fermentado con burbujas</p>
                </div>
              </div>
              <ul className="space-y-4 p-6 text-deep/80">
                <li>
                  <p className="font-display font-bold text-deep">Parte del pack fermentado</p>
                  <p className="mt-1 leading-relaxed">
                    La kombucha entró en el menú fermentado del ensayo de Stanford:
                    más diversidad microbiana cuando sube el consumo de fermentos.
                    <Cite id="wastyk2021" />
                  </p>
                </li>
                <li>
                  <p className="font-display font-bold text-deep">Síntomas digestivos</p>
                  <p className="mt-1 leading-relaxed">
                    Una revisión reciente de ensayos clínicos reportó indicios de
                    alivio en molestias gastrointestinales y cambios modestos en la
                    microbiota.
                    <Cite id="kombucha2025" />
                  </p>
                </li>
                <li>
                  <p className="font-display font-bold text-deep">Con los pies en la tierra</p>
                  <p className="mt-1 leading-relaxed">
                    La evidencia humana de kombucha todavía es más chiquita que la del
                    kéfir. Se investiga; no es un tratamiento médico.
                    <Cite id="marco2021" />
                  </p>
                </li>
              </ul>
            </article>
          </div>
        </div>

        {/* Combinaciones */}
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-coral">
            Paso 3 · El dúo dinámico
          </p>
          <h3 className="font-display mt-3 max-w-3xl text-3xl font-bold text-deep md:text-4xl">
            ¿Con qué combinarlos para potenciar beneficios?
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-deep/70">
            Aquí entra el concepto de{" "}
            <span className="font-semibold text-deep">prebiótico</span>: un “alimento”
            para tus microorganismos que, al usarse de forma selectiva, puede aportar
            beneficio.
            <Cite id="gibson2017" />
            Cuando juntas microorganismos vivos + esos sustratos, te acercas a la idea
            de un <span className="font-semibold text-deep">sinbiótico</span> — la
            ciencia lo define así, con evidencia de por medio.
            <Cite id="swanson2020" />
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-deep/70">
            En la práctica diaria (sin laboratorio en la cocina): acompaña tu kéfir o
            kombucha con fibra de plantas. No es receta mágica; es buena compañía.
            <Cite id="isapp-prebiotic-foods" />
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {combos.map((combo) => (
              <article
                key={combo.title}
                className="rounded-[1.5rem] border border-base-300/80 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className={`inline-flex rounded-full px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider ${combo.accent}`}
                >
                  {combo.badge}
                </span>
                <h4 className="font-display mt-3 text-xl font-bold text-deep">{combo.title}</h4>
                <p className="mt-2 leading-relaxed text-deep/70">{combo.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Lista de alimentos */}
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sky">
            Paso 4 · La lista del refri y la despensa
          </p>
          <h3 className="font-display mt-3 max-w-3xl text-3xl font-bold text-deep md:text-4xl">
            Otros alimentos que les caen de perlas
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-deep/70">
            La ISAPP menciona alimentos que de forma natural aportan sustratos tipo
            prebiótico (aunque a veces en cantidades modestas): cebolla, ajo, plátano,
            avena, alcachofa, puerro, espárrago y más.
            <Cite id="isapp-prebiotic-foods" />
            Aquí van ejemplos fáciles de meter al día a día en Chihuahua.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {companionFoods.map((food) => {
              const Icon = food.icon
              return (
                <li
                  key={food.name}
                  className="flex gap-4 rounded-[1.25rem] border border-base-300/70 bg-white p-4"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${food.tone}`}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-deep">{food.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-deep/70">{food.tip}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 rounded-[1.5rem] bg-orange/10 px-5 py-4 text-sm leading-relaxed text-deep/75">
            <p>
              <span className="font-display font-bold text-deep">Tip cotorro:</span> no
              necesitas volverte influencer de bowls. Un plátano con kéfir, avena en el
              desayuno o verduras en la comida ya le dan chance a tus cultivitos.
              Empieza poquito si eres nuevo en fermentos, guárdalos en frío y disfruta.
            </p>
          </div>
        </div>

        {/* Fuentes + disclaimer */}
        <footer className="rounded-[1.75rem] border border-deep/10 bg-deep px-6 py-8 text-cream md:px-8">
          <p className="font-display text-xl font-bold">Fuentes (discreitas, pero firmes)</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-cream/70">
            Info educativa para clientes curiosos. No sustituye consejo médico. Si tienes
            una condición de salud, pregunta a tu profesional de confianza.
          </p>
          <ol className="mt-5 grid gap-2 text-xs leading-relaxed text-cream/70 md:grid-cols-2">
            {citations.map((citation, index) => (
              <li key={citation.id}>
                <a
                  href={citation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-cream/30 underline-offset-2 transition hover:text-cream"
                >
                  {index + 1}. {citation.full}
                </a>
              </li>
            ))}
          </ol>
        </footer>
      </div>
    </section>
  )
}

// ============================================================
// The Good Co. · config.js
// Identidad, contacto, copy de landing y toggles de features.
// ============================================================

const config = {
  app: {
    name: "The Good Co.",
    description:
      "Compra kéfir, kombucha y tíbicos artesanales de The Good Co. en Chihuahua. Pago en línea con Mercado Pago o pedido por WhatsApp.",
    seoTitle: "The Good Co. | Kéfir, kombucha y tíbicos en Chihuahua",
    domain: "thegoodco.com.mx",
    locale: "es",
    defaultUrl: "http://localhost:3000",
    claim: "Fermentos muy vivitos",
    tagline: "Buenos no, excelentes.",
  },

  brand: {
    primary: "#4c9ff2",
    logoText: "The Good Co.",
    logoSrc: "/logo.svg",
    radius: "1.5rem",
  },

  contact: {
    whatsapp: "5216141287489",
    whatsappDisplay: "614 128 7489",
    instagram: "https://instagram.com/co.thegood",
    instagramHandle: "@co.thegood",
    email: "vickygwong@gmail.com",
    city: "Chihuahua",
    postalCode: "31216",
    country: "MX",
  },

  features: {
    waitlist: false,
    googleAuth: false,
    emailLogin: false,
    aiChat: true,
    toolUse: true,
    agents: true,
    mcp: true,
    rag: false,
    posthog: false,
    resend: true,
    pricing: false,
    payments: true, // MVP: Mercado Pago + WhatsApp
    hardware: false,
  },

  // Mercado Pago — Link de pago por producto (sin costo mensual fijo).
  // Crear links en: https://www.mercadopago.com.mx/herramientas-para-vender/link-de-pago
  // Clave: product id, o "productId:variantId" para variantes con precio distinto.
  payments: {
    enabled: true,
    provider: "mercadopago",
    providerLabel: "Mercado Pago",
    successPath: "/compra/gracias",
    pendingPath: "/compra/pendiente",
    links: {
      // Ejemplo (reemplazar con tus links reales de Mercado Pago):
      // "kefir-natural": "https://mpago.li/XXXXX",
      // "kefir-fresa:endulzado": "https://mpago.li/XXXXX",
      // "kefir-fresa:sin-endulzar": "https://mpago.li/XXXXX",
    },
  },

  ai: {
    chatModel: "gpt-4o-mini",
    structuredModel: "gpt-4o-mini",
    agentModel: "gpt-4o",
    embeddingModel: "text-embedding-3-small",
    maxTokens: 1500,
    temperature: 0.4,
  },

  email: {
    from: "The Good Co. <onboarding@resend.dev>",
    replyTo: "vickygwong@gmail.com",
    supportEmail: "vickygwong@gmail.com",
  },

  auth: {
    loginUrl: "/login",
    afterLoginUrl: "/dashboard",
    afterLogoutUrl: "/",
    providers: ["google"],
  },

  landing: {
    topBar: "Elaborados en Chihuahua · Compra en línea o por WhatsApp · Entrega local",
    nav: [
      { label: "Productos", href: "#productos" },
      { label: "Kéfir", href: "#kefir-spotlight" },
      { label: "Proceso", href: "#proceso" },
      { label: "Historia", href: "#historia" },
      { label: "FAQ", href: "#faq" },
    ],
    hero: {
      eyebrow: "Fermentos muy vivitos",
      title: "Buenos no, excelentes.",
      subtitle:
        "Kéfir, kombucha y tíbicos artesanales en Chihuahua. Explora sabores y precios, elige tu presentación y compra en línea con Mercado Pago o pide por WhatsApp — sin vueltas.",
      cta: { label: "Ver catálogo", href: "#productos" },
      ctaSecondary: { label: "Pedir por WhatsApp", href: "whatsapp" },
      ctaOnline: { label: "Comprar en línea", href: "#productos" },
      trust: [
        "Pago seguro con Mercado Pago o WhatsApp",
        "Ingredientes reales, cultivo vivo",
        "Entrega local en Chihuahua",
      ],
    },
    purchaseSteps: {
      eyebrow: "Cómo comprar",
      title: "Del catálogo a tu pedido en minutos",
      subtitle: "Dos caminos, misma calidad: pago en línea o atención personalizada por WhatsApp.",
      steps: [
        { number: "01", title: "Descubre", body: "Conoce qué vendemos y por qué nuestros fermentos son diferentes." },
        { number: "02", title: "Compara", body: "Explora kéfir, kombucha y tíbicos con sabores, tamaños y precios claros." },
        { number: "03", title: "Elige", body: "Selecciona producto y variante (endulzado o sin endulzar, cuando aplique)." },
        { number: "04", title: "Paga o escribe", body: "Compra en línea con Mercado Pago o inicia tu pedido por WhatsApp." },
        { number: "05", title: "Confirma", body: "Recibe confirmación de pago o coordinamos entrega contigo por chat." },
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo que más nos preguntan",
      items: [
        {
          q: "¿Cómo hago mi pedido?",
          a: "Elige tu producto en el catálogo. Puedes pagar en línea con Mercado Pago (tarjeta, transferencia u otros medios) o tocar «Pedir por WhatsApp» para coordinar tu pedido con nosotros.",
        },
        {
          q: "¿Qué métodos de pago aceptan?",
          a: "En línea aceptamos Mercado Pago (sin costo mensual de plataforma; solo comisión por venta). Por WhatsApp también puedes coordinar transferencia u otras formas de pago acordadas.",
        },
        {
          q: "¿Hacen entregas en Chihuahua?",
          a: "Sí, coordinamos entrega local en Chihuahua por WhatsApp. Si estás fuera de la ciudad, escríbenos y vemos opciones.",
        },
        {
          q: "¿Cuánto duran los fermentos?",
          a: "Son productos vivos. Recomendamos consumirlos refrigerados y dentro de las fechas que te indicamos al confirmar tu pedido.",
        },
        {
          q: "¿Qué diferencia hay entre kéfir, kombucha y tíbicos?",
          a: "El kéfir es cremoso (base láctea), la kombucha es burbujeante con té fermentado y los tíbicos son ligeros y refrescantes (agua de kefir de frutos).",
        },
        {
          q: "¿Puedo pedir kéfir sin endulzar?",
          a: "Sí. En kéfir de fresa y mango puedes elegir la variante endulzada o sin endulzar antes de enviar tu mensaje por WhatsApp.",
        },
      ],
    },
    finalCta: {
      eyebrow: "¿Listo para probar?",
      title: "Tu próximo fermento favorito te espera.",
      subtitle:
        "Compra en línea con Mercado Pago o escríbenos por WhatsApp. Te ayudamos a elegir el fermento perfecto.",
      cta: { label: "Pedir por WhatsApp", href: "whatsapp" },
      ctaOnline: { label: "Ver catálogo", href: "#productos" },
    },
    footer: {
      tagline: "Fermentos muy vivitos · Chihuahua, México",
      columns: [
        {
          title: "Productos",
          links: [
            { label: "Catálogo", href: "#productos" },
            { label: "Kéfir", href: "#kefir-spotlight" },
            { label: "Kombucha", href: "#productos" },
            { label: "Tíbicos", href: "#productos" },
          ],
        },
        {
          title: "Marca",
          links: [
            { label: "Proceso", href: "#proceso" },
            { label: "Historia", href: "#historia" },
            { label: "Contacto", href: "#contacto" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "Síguenos",
          links: [
            {
              label: "@co.thegood",
              href: "https://instagram.com/co.thegood",
              external: true,
            },
            { label: "WhatsApp", href: "whatsapp", external: true },
          ],
        },
      ],
      links: [],
    },
  },

  pricing: {
    eyebrow: "Precios",
    title: "Simple y sin sorpresas.",
    subtitle: "",
    plans: [],
  },
}

export default config

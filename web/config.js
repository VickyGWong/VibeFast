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
    logoText: "THE GOOD CO.",
    logoSrc: "/brand/icono-4.png",
    radius: "1.5rem",
  },

  contact: {
    whatsapp: "5216141287489",
    whatsappDisplay: "614 128 7489",
    instagram: "https://instagram.com/co.thegood",
    instagramHandle: "@co.thegood",
    email: "hola@thegoodco.com.mx",
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
    topBar: "Hechos artesanalmente en Chihuahua",
    nav: [
      { label: "Productos", href: "/#productos" },
      { label: "Cómo comprar", href: "/#como-comprar" },
      { label: "Entrega", href: "/#entrega" },
      { label: "Historia", href: "/#historia" },
    ],
    hero: {
      eyebrow: "Fermentos muy vivitos",
      title: "Algo cremoso, algo burbujeante, algo bien.",
      subtitle:
        "Kéfir, kombucha y tíbicos artesanales, elaborados en Chihuahua para quienes quieren algo natural, rico y con mucha personalidad.",
      cta: { label: "Conoce nuestros productos", href: "#productos" },
      ctaSecondary: { label: "Pedir por WhatsApp", href: "whatsapp" },
      ctaOnline: { label: "Comprar en línea", href: "#productos" },
      trust: [
        "Elaboración artesanal",
        "Pequeños lotes",
        "Cultivos vivos",
        "Hechos en Chihuahua",
      ],
    },
    purchaseSteps: {
      eyebrow: "Cómo comprar",
      title: "Realiza tu pedido en minutos",
      subtitle: "Dos caminos, misma calidad: pago en línea o conversación directa por WhatsApp.",
      intro: {
        title: "Descubre y compara",
        body: "Conoce qué vendemos y por qué nuestros fermentos son diferentes. Explora kéfir, kombucha y tíbicos con sabores, tamaños y precios claros.",
      },
      steps: [
        { number: "01", title: "Elige", body: "Selecciona producto y variante (endulzado o sin endulzar, cuando aplique)." },
        { number: "02", title: "Paga o escribe", body: "Compra en línea con Mercado Pago o inicia tu pedido por WhatsApp." },
        {
          number: "03",
          title: "Confirma",
          body: "Recibe confirmación de pago y recibe en casa. O elige la zona y hora de entrega y paga por WhatsApp.",
        },
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
          a: "Sí. En kéfir natural, de fresa y de mango puedes elegir la variante endulzada o sin endulzar en la ficha del producto o antes de mandar tu WhatsApp.",
        },
        {
          q: "¿Puedo armar un pedido con varias botellas?",
          a: "Sí. Toca «Agregar al pedido» en cada producto, revisa tu carrito y confirma todo junto por WhatsApp. Así coordinamos una sola entrega.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Lo que se siente",
      title: "Quienes ya tienen The Good Co. en el refri",
      subtitle: "Voces de Chihuahua. El sabor se nota; el resto lo cuentas tú.",
      items: [
        {
          quote:
            "El kéfir natural se volvió parte del desayuno. Cremoso, ácido justito y sin esa sensación de producto industrial.",
          author: "Mariana",
          role: "Chihuahua capital",
        },
        {
          quote:
            "Pedí kombucha y tíbicos el mismo día. Llegaron fríos, con cara de lote fresco. Ya no compro las de súper.",
          author: "Diego",
          role: "Entrega local",
        },
        {
          quote:
            "Me encanta poder elegir endulzado o sin endulzar. Pedí por WhatsApp y en un rato ya estaba coordinada la entrega.",
          author: "Ana",
          role: "Cliente frecuente",
        },
      ],
    },
    newsletter: {
      eyebrow: "Novedades",
      title: "Entérate primero de sabores y entregas",
      subtitle: "Te avisamos de lotes nuevos, sabores de temporada y horarios de entrega en Chihuahua.",
      buttonLabel: "Suscribirme",
      placeholder: "Tu correo",
      successMessage: "Listo. Te escribimos cuando haya algo rico que contar.",
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
            { label: "Catálogo", href: "/#productos" },
            { label: "Kéfir", href: "/#kefir-spotlight" },
            { label: "Kombucha", href: "/#productos" },
            { label: "Tíbicos", href: "/#productos" },
          ],
        },
        {
          title: "Marca",
          links: [
            { label: "Entrega", href: "/#entrega" },
            { label: "Historia", href: "/#historia" },
            { label: "Contacto", href: "/#contacto" },
            { label: "FAQ", href: "/#faq" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Aviso de privacidad", href: "/aviso-privacidad" },
            { label: "Términos de servicio", href: "/terminos" },
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

/** @typedef {{ id: string, label: string, messageLabel: string, priceCents?: number, size?: string }} ProductVariant */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {'kefir' | 'kombucha' | 'tibicos'} category
 * @property {string} name
 * @property {string} flavor
 * @property {string} description
 * @property {string} size
 * @property {string | null} weight
 * @property {number} priceCents
 * @property {string} currency
 * @property {string} imageUrl
 * @property {string} imageAlt
 * @property {boolean} featured
 * @property {boolean} active
 * @property {boolean} comingSoon
 * @property {string} whatsappName
 * @property {string} sku
 * @property {number | null} stock
 * @property {boolean} seasonal
 * @property {boolean} temporaryImage
 * @property {number} sortOrder
 * @property {ProductVariant[]} variants
 */

/** Presentaciones compartidas de kombucha */
const kombuchaSizeVariants = [
  {
    id: "1l",
    label: "1 L",
    messageLabel: "1 L",
    size: "1 L",
    priceCents: 13000,
  },
  {
    id: "500ml",
    label: "500 ml",
    messageLabel: "500 ml",
    size: "500 ml",
    priceCents: 7000,
  },
]

/** @type {Product[]} */
export const products = [
  {
    id: "kefir-natural",
    category: "kefir",
    name: "Kéfir natural",
    flavor: "natural",
    description:
      "Cremoso y vivo. El punto de partida perfecto para conocer nuestros fermentos. Disponible endulzado o sin endulzar.",
    size: "500 ml",
    weight: "390 g",
    priceCents: 9500,
    currency: "MXN",
    imageUrl: "/images/kefir-natural.jpg",
    imageAlt: "Kéfir natural The Good Co. cremoso en cuchara sobre plato azul",
    featured: false,
    active: true,
    comingSoon: false,
    whatsappName: "Kéfir natural",
    sku: "KEF-NAT-500",
    stock: null,
    seasonal: false,
    temporaryImage: false,
    sortOrder: 1,
    variants: [
      { id: "endulzado", label: "Endulzado", messageLabel: "endulzado" },
      { id: "sin-endulzar", label: "Sin endulzar", messageLabel: "sin endulzar" },
    ],
  },
  {
    id: "kefir-fresa",
    category: "kefir",
    name: "Kéfir de fresa",
    flavor: "fresa",
    description:
      "Fresas orgánicas y fermento vivo. Disponible endulzado o sin endulzar, según tu gusto.",
    size: "500 ml",
    weight: "390 g",
    priceCents: 10500,
    currency: "MXN",
    imageUrl: "/images/kefir-fresa.jpg",
    imageAlt: "Kéfir de fresa The Good Co. cremoso con fresas frescas",
    featured: false,
    active: true,
    comingSoon: false,
    whatsappName: "Kéfir de fresa",
    sku: "KEF-FRE-500",
    stock: null,
    seasonal: false,
    temporaryImage: false,
    sortOrder: 2,
    variants: [
      { id: "endulzado", label: "Endulzado", messageLabel: "endulzado" },
      { id: "sin-endulzar", label: "Sin endulzar", messageLabel: "sin endulzar" },
    ],
  },
  {
    id: "kefir-mango",
    category: "kefir",
    name: "Kéfir de mango",
    flavor: "mango",
    description:
      "Mango orgánico y cultivo activo. Elige la versión endulzada o sin endulzar.",
    size: "500 ml",
    weight: "390 g",
    priceCents: 10500,
    currency: "MXN",
    imageUrl: "/images/kefir-mango.jpg",
    imageAlt: "Kéfir de mango The Good Co. cremoso con cubos de mango",
    featured: false,
    active: true,
    comingSoon: false,
    whatsappName: "Kéfir de mango",
    sku: "KEF-MAN-500",
    stock: null,
    seasonal: false,
    temporaryImage: false,
    sortOrder: 3,
    variants: [
      { id: "endulzado", label: "Endulzado", messageLabel: "endulzado" },
      { id: "sin-endulzar", label: "Sin endulzar", messageLabel: "sin endulzar" },
    ],
  },
  {
    id: "kombucha-natural",
    category: "kombucha",
    name: "Kombucha natural",
    flavor: "natural",
    description: "Té fermentado burbujeante, equilibrado y refrescante.",
    size: "1 L",
    weight: null,
    priceCents: 13000,
    currency: "MXN",
    imageUrl: "/images/kombucha-natural.jpg",
    imageAlt: "Botella de kombucha natural The Good Co. con sticker de mascota",
    featured: true,
    active: true,
    comingSoon: false,
    whatsappName: "Kombucha natural",
    sku: "KOM-NAT-1L",
    stock: null,
    seasonal: false,
    temporaryImage: false,
    sortOrder: 4,
    variants: kombuchaSizeVariants,
  },
  {
    id: "kombucha-betabel",
    category: "kombucha",
    name: "Kombucha de betabel-arándano",
    flavor: "betabel-arándano",
    description: "Betabel y arándano orgánicos en un té fermentado con notas terrosas, frutales y burbujas vivas.",
    size: "1 L",
    weight: null,
    priceCents: 13000,
    currency: "MXN",
    imageUrl: "/images/kombucha-betabel.jpg",
    imageAlt: "Botella de kombucha de betabel-arándano The Good Co.",
    featured: false,
    active: true,
    comingSoon: true,
    whatsappName: "Kombucha de betabel-arándano",
    sku: "KOM-BET-1L",
    stock: null,
    seasonal: false,
    temporaryImage: true,
    sortOrder: 5,
    variants: kombuchaSizeVariants,
  },
  {
    id: "kombucha-mango",
    category: "kombucha",
    name: "Kombucha de mango",
    flavor: "mango",
    description: "Mango orgánico con el carácter burbujeante de la kombucha.",
    size: "1 L",
    weight: null,
    priceCents: 13000,
    currency: "MXN",
    imageUrl: "/images/kombucha-mango.jpg",
    imageAlt: "Botella de kombucha de mango The Good Co.",
    featured: false,
    active: true,
    comingSoon: true,
    whatsappName: "Kombucha de mango",
    sku: "KOM-MAN-1L",
    stock: null,
    seasonal: false,
    temporaryImage: true,
    sortOrder: 6,
    variants: kombuchaSizeVariants,
  },
  {
    id: "kombucha-fresa",
    category: "kombucha",
    name: "Kombucha de fresa",
    flavor: "fresa",
    description: "Fresas orgánicas y fermento vivo en cada sorbo.",
    size: "1 L",
    weight: null,
    priceCents: 13000,
    currency: "MXN",
    imageUrl: "/images/kombucha-fresa.jpg",
    imageAlt: "Botella de kombucha de fresa The Good Co.",
    featured: false,
    active: true,
    comingSoon: true,
    whatsappName: "Kombucha de fresa",
    sku: "KOM-FRE-1L",
    stock: null,
    seasonal: false,
    temporaryImage: true,
    sortOrder: 7,
    variants: kombuchaSizeVariants,
  },
  {
    id: "tibicos-natural",
    category: "tibicos",
    name: "Tíbicos naturales",
    flavor: "natural",
    description: "Agua de kefir de frutos orgánicos, ligera, refrescante y probiótica.",
    size: "750 ml",
    weight: null,
    priceCents: 12000,
    currency: "MXN",
    imageUrl: "/images/tibicos-natural.jpg",
    imageAlt: "Botella de tíbicos naturales The Good Co. de 750 ml",
    featured: false,
    active: true,
    comingSoon: true,
    whatsappName: "Tíbicos naturales",
    sku: "TIB-NAT-750",
    stock: null,
    seasonal: false,
    temporaryImage: true,
    sortOrder: 8,
    variants: [],
  },
  {
    id: "tibicos-mango",
    category: "tibicos",
    name: "Tíbicos de mango",
    flavor: "mango",
    description: "Mango orgánico con la ligereza característica de los tíbicos.",
    size: "750 ml",
    weight: null,
    priceCents: 12000,
    currency: "MXN",
    imageUrl: "/images/tibicos-mango.jpg",
    imageAlt: "Botella de tíbicos de mango The Good Co. de 750 ml",
    featured: false,
    active: true,
    comingSoon: true,
    whatsappName: "Tíbicos de mango",
    sku: "TIB-MAN-750",
    stock: null,
    seasonal: false,
    temporaryImage: true,
    sortOrder: 9,
    variants: [],
  },
  {
    id: "tibicos-fresa",
    category: "tibicos",
    name: "Tíbicos de fresa",
    flavor: "fresa",
    description: "Fresas orgánicas en una bebida ligera y burbujeante.",
    size: "750 ml",
    weight: null,
    priceCents: 12000,
    currency: "MXN",
    imageUrl: "/images/tibicos-fresa.jpg",
    imageAlt: "Botella de tíbicos de fresa The Good Co. de 750 ml",
    featured: false,
    active: true,
    comingSoon: true,
    whatsappName: "Tíbicos de fresa",
    sku: "TIB-FRE-750",
    stock: null,
    seasonal: false,
    temporaryImage: true,
    sortOrder: 10,
    variants: [],
  },
]

export const categoryDetails = {
  kefir: {
    keep: "Mantener refrigerado. Es un producto vivo: consúmelo frío y dentro de los días que te indicamos al confirmar tu pedido.",
    benefits: [
      "Textura cremosa, tipo yogurt griego",
      "Cultivo vivo sin pasteurizar",
      "Ideal para desayuno, smoothie o snack",
    ],
  },
  kombucha: {
    keep: "Mantener refrigerado. Las burbujas son naturales; ábrela con cuidado y consúmela fría.",
    benefits: [
      "Té fermentado burbujeante",
      "Sin conservadores",
      "Ideal para comida o media tarde",
    ],
  },
  tibicos: {
    keep: "Mantener refrigerado. Ligero y refrescante: perfecto bien frío.",
    benefits: [
      "Agua de kefir de frutos",
      "Muy ligero y hidratante",
      "Ideal para el calor o después de moverte",
    ],
  },
}

export const categoryLabels = {
  kefir: "Kéfir",
  kombucha: "Kombucha",
  tibicos: "Tíbicos",
}

export const experienceOptions = [
  {
    id: "kefir",
    category: "kefir",
    title: "Algo cremoso",
    subtitle: "Kéfir artesanal",
    description: "Textura suave, probióticos vivos y sabores naturales o frutales.",
    accent: "sky",
    comingSoon: false,
  },
  {
    id: "kombucha",
    category: "kombucha",
    title: "Algo burbujeante con té",
    subtitle: "Kombucha",
    description: "Fermento de té con burbujas, frescura y personalidad en cada sorbo.",
    accent: "yellow",
    comingSoon: false,
  },
  {
    id: "tibicos",
    category: "tibicos",
    title: "Algo ligero y refrescante",
    subtitle: "Tíbicos · Próximamente",
    description: "Agua de kefir de frutos, ideal para hidratarte con algo vivo.",
    accent: "orange",
    comingSoon: true,
  },
]

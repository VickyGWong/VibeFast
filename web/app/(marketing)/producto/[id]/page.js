import { notFound } from "next/navigation"
import ProductDetail from "@/components/shop/ProductDetail"
import { products as seedProducts } from "@/data/products"
import { getProductById, getProducts } from "@/lib/products/getProducts"
import config from "@/config"

export function generateStaticParams() {
  return seedProducts.filter((product) => product.active).map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) {
    return { title: "Producto" }
  }
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `https://${config.app.domain}/producto/${product.id}` },
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  const catalog = await getProducts()
  const related = catalog.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)

  return <ProductDetail product={product} related={related} />
}

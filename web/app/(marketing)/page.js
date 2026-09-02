import Hero from "@/components/landing/Hero"
import PurchaseSteps from "@/components/landing/PurchaseSteps"
import LandingCatalog from "@/components/landing/LandingCatalog"
import KefirSpotlight from "@/components/landing/KefirSpotlight"
import FermentComparison from "@/components/landing/FermentComparison"
import ArtisanProcess from "@/components/landing/ArtisanProcess"
import ConsumptionMoments from "@/components/landing/ConsumptionMoments"
import BrandStory from "@/components/landing/BrandStory"
import ContactSection from "@/components/landing/ContactSection"
import FAQ from "@/components/landing/FAQ"
import FinalCta from "@/components/landing/FinalCta"
import JsonLd from "@/components/landing/JsonLd"
import { getProducts } from "@/lib/products/getProducts"

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <JsonLd products={products} />
      <Hero />
      <PurchaseSteps />
      <LandingCatalog products={products} />
      <KefirSpotlight />
      <FermentComparison />
      <ArtisanProcess />
      <ConsumptionMoments />
      <BrandStory />
      <ContactSection />
      <FAQ />
      <FinalCta />
    </>
  )
}

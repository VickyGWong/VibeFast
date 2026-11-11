import AvailabilityAdmin from "@/components/shop/AvailabilityAdmin"

export const metadata = {
  title: "Disponibilidad | The Good Co.",
  robots: { index: false, follow: false },
}

export default function AvailabilityPage() {
  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <AvailabilityAdmin />
      </div>
    </section>
  )
}

import config from "@/config"

export default function TopBar() {
  return (
    <div className="bg-deep text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2 text-center text-xs md:text-sm">
        <p className="font-ui">{config.landing.topBar}</p>
      </div>
    </div>
  )
}

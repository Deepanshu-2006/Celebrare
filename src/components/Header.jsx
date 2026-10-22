function Header() {
  return (
    <header className="mb-8 sm:mb-10 lg:mb-12">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#287A55]">
          CELEBRARE
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#181818] mb-3">
        Photo Gallery
      </h1>
      <p className="text-sm sm:text-base text-[#737373] max-w-2xl leading-relaxed">
        A curated collection of photographs celebrating light, natural landscapes, and everyday perspectives.
      </p>
    </header>
  )
}

export default Header

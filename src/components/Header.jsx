function Header() {
  return (
    <header className="mb-8 sm:mb-10 lg:mb-12">
      <div className="animate-intro-1 flex items-center mb-2 sm:mb-2.5">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#287A55]">
          CELEBRARE
        </span>
      </div>
      <h1 className="animate-intro-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#181818] leading-[1.12] mb-3 sm:mb-3.5">
        Photo Gallery
      </h1>
      <p className="animate-intro-3 text-sm sm:text-base text-[#737373] max-w-xl leading-relaxed">
        A curated collection of photographs celebrating light, natural landscapes, and everyday perspectives.
      </p>
    </header>
  )
}

export default Header

function Header() {
  return (
    <header className="fluid-header-spacing">
      <div className="animate-intro-1 flex items-center mb-2 sm:mb-2.5">
        <span className="text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#287A55]">
          CELEBRARE
        </span>
      </div>
      <h1 className="animate-intro-2 font-heading fluid-heading font-extrabold tracking-[-0.03em] text-[#181818] mb-3 sm:mb-3.5">
        Photo Gallery
      </h1>
      <p className="animate-intro-3 fluid-description text-[#737373] max-w-xl font-normal">
        A curated collection of photographs celebrating light, natural landscapes, and everyday perspectives.
      </p>
    </header>
  )
}

export default Header

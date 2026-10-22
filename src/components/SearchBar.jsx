function SearchBar({ value, onChange }) {
  return (
    <div className="animate-intro-4 mb-6 sm:mb-8 max-w-md w-full">
      <label htmlFor="photographer-search" className="sr-only">
        Search photographers by name
      </label>
      <div className="relative group rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow duration-200">
        <input
          id="photographer-search"
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search photographers…"
          className="peer w-full pl-10 pr-4 py-2.5 bg-white border border-[#EAEAE7] rounded-xl text-sm text-[#181818] placeholder-[#737373] focus:outline-none transition-colors duration-200"
        />

        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#737373] peer-focus:text-[#287A55] transition-colors duration-200">
          <svg
            className="w-4 h-4 transition-colors duration-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Animated thin green underline (GraphMind interaction style) */}
        <span
          className="absolute bottom-0 left-0 h-[2px] w-full bg-[#287A55] origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 ease-out pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default SearchBar

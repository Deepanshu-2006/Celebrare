function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6 sm:mb-8 max-w-md w-full">
      <label htmlFor="photographer-search" className="sr-only">
        Search photographers by name
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#737373]">
          <svg
            className="w-4 h-4"
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
        <input
          id="photographer-search"
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search photographers…"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EAEAE7] rounded-xl text-sm text-[#181818] placeholder-[#737373] shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:outline-none focus:border-[#287A55] focus:ring-2 focus:ring-[#287A55]/20 transition-all duration-150"
        />
      </div>
    </div>
  )
}

export default SearchBar

function PhotoCard({ photo, isFavourite = false, onToggleFavourite }) {
  const handleClick = () => {
    if (onToggleFavourite) {
      onToggleFavourite(photo.id)
    }
  }

  return (
    <article className="group bg-white rounded-xl border border-[#EAEAE7] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={photo.download_url}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />
      </div>

      <div className="p-4 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider text-[#737373] font-medium mb-0.5">
            Photographer
          </p>
          <h2 className="text-sm font-semibold text-[#181818] truncate" title={photo.author}>
            {photo.author}
          </h2>
        </div>

        <button
          type="button"
          onClick={handleClick}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photograph by ${photo.author} from favourites`
              : `Add photograph by ${photo.author} to favourites`
          }
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 shrink-0 cursor-pointer active:scale-95 ${
            isFavourite
              ? 'text-red-500 bg-red-50 hover:bg-red-100'
              : 'text-[#737373] hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 transition-transform"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default PhotoCard

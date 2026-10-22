import { useState } from 'react'

function PhotoCard({ photo, isFavourite = false, onToggleFavourite }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleClick = () => {
    if (onToggleFavourite) {
      onToggleFavourite(photo.id)
    }
  }

  // Derive an appropriately dimensioned 4:3 (800x600) image URL from the photo object
  // to prevent loading massive ~20MP master images that stall the main thread during scrolling.
  const imageUrl = photo?.download_url
    ? photo.download_url.replace(/\/\d+\/\d+$/, '/800/600')
    : photo?.id
      ? `https://picsum.photos/id/${photo.id}/800/600`
      : ''

  return (
    <article className="group bg-white rounded-xl border border-[#EAEAE7] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        {hasError || !imageUrl ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 bg-neutral-100 text-[#737373] text-center select-none"
            role="img"
            aria-label={`Image unavailable for photograph by ${photo.author || 'unknown author'}`}
          >
            <svg
              className="w-8 h-8 text-neutral-400 mb-1.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-xs font-medium text-neutral-500">Image unavailable</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Photograph by ${photo.author}`}
            width="800"
            height="600"
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-[transform,opacity] duration-300 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
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

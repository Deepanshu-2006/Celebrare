import { useState, useCallback, useMemo, useReducer, useEffect } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import {
  favouritesReducer,
  initFavourites,
  FAVOURITES_STORAGE_KEY,
  FAVOURITE_ACTIONS,
} from '../reducers/favouritesReducer'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchQuery, setSearchQuery] = useState('')

  // Favourite photo IDs managed with useReducer and lazy localStorage initialization
  const [favourites, dispatchFavourites] = useReducer(favouritesReducer, [], initFavourites)

  // Persist favourites to localStorage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites))
    } catch (err) {
      console.warn('Failed to persist favourites to localStorage:', err)
    }
  }, [favourites])

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value)
  }, [])

  const handleToggleFavourite = useCallback((photoId) => {
    dispatchFavourites({
      type: FAVOURITE_ACTIONS.TOGGLE,
      payload: photoId,
    })
  }, [])

  const filteredPhotos = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase()
    if (!trimmed) {
      return photos
    }
    return photos.filter((photo) =>
      photo.author && photo.author.toLowerCase().includes(trimmed)
    )
  }, [photos, searchQuery])

  // Set lookup for efficient O(1) favourite checks during card rendering
  const favouriteSet = useMemo(() => new Set(favourites), [favourites])

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px] w-full px-4 text-center"
        aria-live="polite"
        aria-busy="true"
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-[#EAEAE7] border-t-[#287A55] animate-spin mb-3.5"
          role="status"
          aria-label="Loading photos"
        />
        <p className="text-sm font-medium text-[#737373]">Loading photos…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="rounded-xl border border-[#EAEAE7] bg-white p-8 sm:p-10 text-center max-w-md mx-auto my-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        role="alert"
      >
        <div className="w-10 h-10 rounded-full bg-neutral-100 text-[#737373] flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-5 h-5 text-[#737373]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-[#181818] mb-1">
          Unable to load gallery
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed">
          We encountered an issue retrieving the photographs. Please check your connection and try refreshing the page.
        </p>
      </div>
    )
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-xl border border-[#EAEAE7] bg-white p-8 sm:p-10 text-center max-w-md mx-auto my-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <p className="text-sm text-[#737373]">No photos are currently available.</p>
      </div>
    )
  }

  return (
    <section aria-label="Photo collection">
      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {filteredPhotos.length === 0 ? (
        <div
          className="rounded-xl border border-[#EAEAE7] bg-white p-8 sm:p-10 text-center max-w-md mx-auto my-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          role="status"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-[#737373] flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-5 h-5 text-[#737373]"
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
          <h2 className="text-base font-semibold text-[#181818] mb-1">
            No photographers found
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed">
            No photographers matched &ldquo;{searchQuery.trim()}&rdquo;. Try searching for another name.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favouriteSet.has(String(photo.id))}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Gallery

import { useState, useEffect } from 'react'

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30'
const MINIMUM_LOADING_DELAY_MS = 2000

/**
 * Custom React hook to fetch photos from the Picsum Photos API.
 * Manages photo data, loading state, and error handling with unmount cleanup.
 *
 * @returns {{ photos: Array, loading: boolean, error: string|null }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPhotos = async () => {
      setLoading(true)
      setError(null)

      try {
        const [response] = await Promise.all([
          fetch(PICSUM_API_URL, {
            signal: controller.signal,
          }),
          new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, MINIMUM_LOADING_DELAY_MS)
            controller.signal.addEventListener('abort', () => {
              clearTimeout(timer)
              reject(new DOMException('Aborted', 'AbortError'))
            })
          }),
        ])

        if (!response.ok) {
          throw new Error(`Failed to fetch photos (HTTP ${response.status}: ${response.statusText || 'Error'})`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        // Ignore AbortError when component unmounts during an in-flight request
        if (err.name === 'AbortError') {
          return
        }
        setError(err.message || 'An unexpected error occurred while fetching photos.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    // Cleanup: abort in-flight request if component unmounts
    return () => {
      controller.abort()
    }
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos

export const FAVOURITES_STORAGE_KEY = 'celebrare_favourite_photo_ids'

export const FAVOURITE_ACTIONS = {
  ADD: 'ADD_FAVOURITE',
  REMOVE: 'REMOVE_FAVOURITE',
  TOGGLE: 'TOGGLE_FAVOURITE',
}

/**
 * Lazy initializer for favourites state from localStorage.
 * Safely parses and validates stored data without crashing.
 *
 * @param {Array<string>} initial
 * @returns {Array<string>}
 */
export function initFavourites(initial = []) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return initial
  }

  try {
    const stored = window.localStorage.getItem(FAVOURITES_STORAGE_KEY)
    if (!stored) {
      return initial
    }

    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed)) {
      // Validate elements are strings or numbers, normalize to strings and deduplicate
      const validIds = parsed
        .filter((id) => id !== null && id !== undefined && (typeof id === 'string' || typeof id === 'number'))
        .map(String)

      return Array.from(new Set(validIds))
    }

    return initial
  } catch (error) {
    console.warn('Failed to parse favourites from localStorage:', error)
    return initial
  }
}

/**
 * Reducer function managing the array of favourite photo IDs.
 * Guarantees immutable state updates and prevents duplicate IDs.
 *
 * @param {Array<string>} state - Current array of favourite photo IDs.
 * @param {{ type: string, payload: string|number }} action
 * @returns {Array<string>} New state.
 */
export function favouritesReducer(state, action) {
  if (!action || !action.type) {
    return state
  }

  const id = action.payload !== undefined && action.payload !== null ? String(action.payload) : null

  switch (action.type) {
    case FAVOURITE_ACTIONS.ADD: {
      if (!id || state.includes(id)) {
        return state
      }
      return [...state, id]
    }

    case FAVOURITE_ACTIONS.REMOVE: {
      if (!id || !state.includes(id)) {
        return state
      }
      return state.filter((favId) => favId !== id)
    }

    case FAVOURITE_ACTIONS.TOGGLE: {
      if (!id) {
        return state
      }
      return state.includes(id)
        ? state.filter((favId) => favId !== id)
        : [...state, id]
    }

    default:
      return state
  }
}

export default favouritesReducer

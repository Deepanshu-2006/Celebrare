# Celebrare — Photo Gallery

A responsive, high-performance photo gallery web application built with React, Vite, and Tailwind CSS as a Full Stack Development internship assignment. The application integrates with the Picsum Photos API to display a curated collection of photographs, featuring real-time author search, favourite management with state persistence, and refined editorial styling.

---

## Features

- **Picsum API Integration**: Fetches and renders a collection of 30 photographs dynamically from the Picsum Photos API.
- **Responsive Photo Grid**: Adapts to all screen sizes with a clean 4-column desktop, 2-column tablet, and 1-column mobile layout.
- **Real-Time Author Search**: Filter photographs instantly by photographer name with case-insensitive and partial-name matching.
- **Favourite Management (`useReducer`)**: Add, remove, and toggle favourite photographs with immutable state transitions and deduplication.
- **Persistent Storage (`localStorage`)**: Preserves favourite photo selections across browser sessions and page reloads, with safe JSON parsing and error fallbacks.
- **Layout Stability & Performance**: Image URLs are dimension-optimized (800×600) with reserved 4:3 aspect ratios to eliminate layout shifts and scrolling jitter.
- **Graceful Error & Loading States**: Displays a clean loading indicator during data retrieval and accessible fallback placeholders if individual images fail to load.
- **Refined Editorial Aesthetics**: Subtle introductory text reveal animations, a GraphMind-inspired search input focus underline, and full support for `prefers-reduced-motion`.

---

## Technology Stack

- **React 19** — Functional components, hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useReducer`)
- **Vite 8** — Next-generation frontend tooling, dev server with HMR, and production bundler
- **Tailwind CSS v4** — Modern utility-first CSS framework with Vite integration
- **Picsum Photos API** — REST API providing photographic assets and author metadata
- **Browser localStorage API** — Client-side state persistence
- **Oxlint** — High-performance JavaScript/JSX linter

---

## Requirements

Before running the project locally, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher recommended
- **npm**: v9.0.0 or higher (or compatible package manager such as pnpm or yarn)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Deepanshu-2006/Celebrare.git
cd Celebrare
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the application.

---

## Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` folder. |
| `npm run preview` | Starts a local server to preview the production build (`dist/`). |
| `npm run lint` | Runs Oxlint across all project files to enforce code quality. |

---

## API Reference

The application consumes the public Picsum Photos list API:

```http
GET https://picsum.photos/v2/list?limit=30
```

### Response Schema (per item)

```json
{
  "id": "0",
  "author": "Alejandro Escamilla",
  "width": 5000,
  "height": 3333,
  "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
  "download_url": "https://picsum.photos/id/0/5000/3333"
}
```

*Note: The application dynamically derives an 800×600 URL (`https://picsum.photos/id/{id}/800/600`) from `download_url` to match the 4:3 card container, reducing memory consumption from ~64 MB to ~1.8 MB per image and preventing scroll frame drops.*

---

## Project Structure

```text
Celebrare/
├── public/
│   └── favicon.svg              # Application favicon
├── src/
│   ├── assets/                  # Static assets
│   ├── components/
│   │   ├── Gallery.jsx          # Main gallery view with search, grid, and empty states
│   │   ├── Header.jsx           # Editorial brand header with staggered reveal animation
│   │   ├── PhotoCard.jsx        # Individual card with image, author, and favourite button
│   │   └── SearchBar.jsx        # Search input with animated focus underline
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom hook for API fetching, loading, error, and cleanup
│   ├── reducers/
│   │   └── favouritesReducer.js # useReducer logic, action types, and localStorage init
│   ├── App.jsx                  # Root layout wrapper
│   ├── index.css                # Tailwind CSS imports, font declarations, keyframes
│   └── main.jsx                 # Application entry point
├── .gitignore                   # Files and directories excluded from Git
├── .oxlintrc.json               # Oxlint configuration
├── index.html                   # HTML template with Inter font import
├── package.json                 # Project dependencies, metadata, and scripts
├── package-lock.json            # Exact dependency lockfile
├── README.md                    # Project documentation
└── vite.config.js               # Vite configuration with React and Tailwind plugins
```

---

## Implementation Notes

- **Custom Fetching Hook (`useFetchPhotos`)**: Handles the HTTP request lifecycle with `fetch()`, sets error and loading states, includes a minimum delay for a polished initial transition, and uses `AbortController` to cancel in-flight requests if unmounted.
- **Search Optimization (`useCallback` & `useMemo`)**: `handleSearchChange` is wrapped in `useCallback` to maintain a stable reference, while `filteredPhotos` is memoized with `useMemo` to only re-filter when the search string or photos collection changes.
- **O(1) Favourite Lookups**: Favourites IDs are mapped into a memoized `Set` within `Gallery.jsx`, providing constant-time lookup when rendering heart buttons on each card.
- **State Management (`useReducer`)**: Centralizes favourite actions (`ADD_FAVOURITE`, `REMOVE_FAVOURITE`, `TOGGLE_FAVOURITE`) into a pure reducer that enforces immutability and rejects duplicate IDs.
- **Persistence & Resilience (`localStorage`)**: State initializes lazily using `initFavourites` which validates stored JSON and sanitizes input to prevent crashes from corrupted data. Updates are synced via `useEffect`.

---

## Screenshots

> *Add screenshots of the completed application below before final submission.*

### Desktop View (4 Columns)
<!-- Replace with actual screenshot: ![Desktop View](docs/screenshots/desktop.png) -->
_Placeholder: Capture desktop view at 1440 × 900 showing the 4-column responsive grid._

### Tablet View (2 Columns)
<!-- Replace with actual screenshot: ![Tablet View](docs/screenshots/tablet.png) -->
_Placeholder: Capture tablet view at 768 × 1024 showing the 2-column responsive grid._

### Mobile View (1 Column)
<!-- Replace with actual screenshot: ![Mobile View](docs/screenshots/mobile.png) -->
_Placeholder: Capture mobile view at 390 × 844 showing the single-column view and search bar._

---

## Testing & Verification

| Test Type | Description | Status |
| :--- | :--- | :---: |
| **Production Build** | `npm run build` completes with 0 errors and bundles static assets in `dist/`. | **PASS** |
| **Code Linting** | `npm run lint` passes across all files with 0 warnings and 0 errors. | **PASS** |
| **API Integration** | Validates retrieval of 30 photos with required schema (`id`, `author`, `download_url`). | **PASS** |
| **Search Logic** | Verified case-insensitivity, partial matching, empty query reset, and no-match empty state. | **PASS** |
| **Reducer & Storage** | Verified immutable toggle/add/remove, deduplication, and resilient fallback on corrupted JSON. | **PASS** |
| **Production Preview** | `npm run preview` verified serving HTML, CSS, and JS with HTTP 200 on port 4173. | **PASS** |
| **Automated Browser Run** | Headless browser execution blocked due to sandbox Playwright driver CDN restrictions. | **NOT TESTED** |

---

## License

This project is created for evaluation as part of an internship technical assessment.

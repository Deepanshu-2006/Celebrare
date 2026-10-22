import { useState } from 'react'

function App() {
  const [isVerified, setIsVerified] = useState(true)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-neutral-800 font-sans">
      <div className="max-w-md w-full border border-neutral-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            Environment Ready
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">
          Celebrare Photo Gallery
        </h1>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Vite + React environment successfully configured with Tailwind CSS v4.
        </p>

        <div className="space-y-3 border-t border-neutral-100 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Framework</span>
            <span className="font-medium text-neutral-800">React 19</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Bundler</span>
            <span className="font-medium text-neutral-800">Vite 8</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Styling</span>
            <span className="font-medium text-emerald-600">Tailwind CSS v4</span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => setIsVerified((prev) => !prev)}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {isVerified ? 'Tailwind Active' : 'Click to Verify'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

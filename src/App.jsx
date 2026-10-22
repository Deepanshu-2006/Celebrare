import Header from './components/Header'
import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Header />
        <main>
          <Gallery />
        </main>
      </div>
    </div>
  )
}

export default App

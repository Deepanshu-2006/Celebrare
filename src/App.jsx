import Header from './components/Header'
import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#181818]">
      <div className="max-w-7xl mx-auto fluid-page-container">
        <Header />
        <main>
          <Gallery />
        </main>
      </div>
    </div>
  )
}

export default App

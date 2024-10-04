import Hero from './components/hero'
import Highlights from './components/highlights'
import Navbar from './components/navbar'

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  )
}

export default App

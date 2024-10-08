import * as Sentry from '@sentry/react'

import Features from './components/features'
import Footer from './components/footer'
import Hero from './components/hero'
import Highlights from './components/highlights'
import HowItWorks from './components/how-it-works'
import Model from './components/model'
import Navbar from './components/navbar'

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default Sentry.withProfiler(App)

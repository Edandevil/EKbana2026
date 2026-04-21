import { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Discover from './components/Discover'
import DigitalCapabilities from './components/DigitalCapabilities'
import CTASection from './components/CTASection'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ChatWidget from './components/ChatWidget'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <SmoothScroll>
      <div className="app-container">
        <Navbar />
        <Hero />
        <Services />
        <DigitalCapabilities />
        <Discover />
        <NewsSection />
        <CTASection />
        <Footer />
      </div>
      <ChatWidget />
    </SmoothScroll>
    </>
  )
}

export default App

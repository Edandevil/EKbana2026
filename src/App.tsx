import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Discover from './components/Discover'
import DigitalCapabilities from './components/DigitalCapabilities'
import CTASection from './components/CTASection'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
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
    </SmoothScroll>
  )
}

export default App

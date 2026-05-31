import Navigation from '../sections/Navigation'
import HeroBlueprint from '../sections/HeroBlueprint'
import About from '../sections/About'
import Services from '../sections/Services'
import Projects from '../sections/Projects'
import WhyChooseUs from '../sections/WhyChooseUs'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroBlueprint />
      <About />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  )
}

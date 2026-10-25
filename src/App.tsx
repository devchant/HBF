import { FeaturedSection } from './components/FeaturedSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InFocusSection } from './components/InFocusSection'
import { LatestSection } from './components/LatestSection'
import { MissionSection } from './components/MissionSection'
import { WhereWeWork } from './components/WhereWeWork'
import { WorkWithMSF } from './components/WorkWithMSF'

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <MissionSection />
        <FeaturedSection />
        <WhereWeWork />
        <LatestSection />
        <InFocusSection />
        <WorkWithMSF />
      </main>
      <Footer />
    </>
  )
}

export default App

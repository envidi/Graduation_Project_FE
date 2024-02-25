import { HeroSection } from './components/HeroSection'
import { HomeCollection } from './components/HomeCollection'
import { Features } from './components/Features'
import { SocialLinks } from './components/SocialLinks'
import { TopEdge } from '../../components/TopEdge'
// import Header from '../../layouts/components/Header/Header'
// import Footer from '../../layouts/components/Footer/Footer'

const HomePage = () => {
  return (
    <>
      <TopEdge />

      <HeroSection />
      <HomeCollection />
      <Features />
      <SocialLinks />
    </>
  )
}

export default HomePage

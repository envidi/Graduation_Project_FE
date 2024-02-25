import { HeroSection } from './components/HeroSection'
import { HomeCollection } from './components/HomeCollection'
import { Features } from './components/Features'
import { SocialLinks } from './components/SocialLinks'
import { TopEdge } from '../../components/TopEdge'
import IntroduceMovie from './components/IntroduceMovie'
// import Header from '../../layouts/components/Header/Header'
// import Footer from '../../layouts/components/Footer/Footer'

const HomePage = () => {
  return (
    <>
      <TopEdge />
      <IntroduceMovie />
      <HeroSection />
      <HomeCollection />
      <Features />
      <SocialLinks />
    </>
  )
}

export default HomePage

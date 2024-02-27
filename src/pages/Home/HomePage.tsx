import { Navbar } from '../../components/Navbar'
// import { Footer } from "../../components/Footer";
import { HeroSection } from './components/HeroSection'
import { HomeCollection } from './components/HomeCollection'
// import { Features } from "./components/Features";
import { SocialLinks } from './components/SocialLinks'
import { TopEdge } from '../../components/TopEdge'
<<<<<<< HEAD
=======
import IntroduceMovie from './components/IntroduceMovie'
// import Header from '../../layouts/components/Header/Header'
// import Footer from '../../layouts/components/Footer/Footer'
<<<<<<< HEAD
>>>>>>> f264635b3831c5d39e386a4d4fd1a846932259fa

const HomePage = ({
  handleSignState,
  handleLoginState,
  signedPerson,
  handlelogout,
  currentMovieDetails,
  setMenuState
}:any) => {
=======
import { MoviePropsType } from './components/HomeCollection'
const HomePage = ({ dataMovie, isLoading }: MoviePropsType) => {
>>>>>>> 6321283d0233e3c02d819f0d3fd80d2d2b72cdf2
  return (
    <>
      <TopEdge />
<<<<<<< HEAD
      <Navbar
        signedPerson={signedPerson}
        pageName="home"
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
        handlelogout={handlelogout}
        setMenuState={setMenuState}
      />
      <HeroSection
        handleLoginState={handleLoginState}
        signedPerson={signedPerson}
      />
      <HomeCollection
        currentMovieDetails={currentMovieDetails}
        signedPerson={signedPerson}
        handleLoginState={handleLoginState}
      />
      {/* <Features /> */}
=======
      <IntroduceMovie />
      <HeroSection />
      <HomeCollection dataMovie={dataMovie} isLoading={isLoading} />
      <Features />
>>>>>>> f264635b3831c5d39e386a4d4fd1a846932259fa
      <SocialLinks />
      {/* <Footer
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
        pageName="home"
      /> */}
    </>
  )
}

export default HomePage

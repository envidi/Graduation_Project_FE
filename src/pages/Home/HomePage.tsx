import React from "react";
import { HeroSection } from "./components/HeroSection";
import { HomeCollection } from "./components/HomeCollection";
import { Features } from "./components/Features";
import { SocialLinks } from "./components/SocialLinks";
import { TopEdge } from "../../components/TopEdge";
import Header from "../../layouts/components/Header/Header";
import Footer from "../../layouts/components/Footer/Footer";

const HomePage = ({
  signedPerson,
  handleSignState,
  handleLoginState,
  handlelogout,
  setMenuState,
}) => {
  return (
    <>
      <TopEdge />
      <Header
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
      <HomeCollection />
      <Features />
      <SocialLinks />
      <Footer
        pageName="home"
      />
    </>
  );
};

export default HomePage;
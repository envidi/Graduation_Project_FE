<<<<<<< HEAD
import { Navbar } from "../../components/Navbar";
import { ShowTimesHeader } from "./components/ShowTimesHeader";
import { ShowTimesCollection } from "./components/ShowTimesCollection";
import { Footer } from "../../components/Footer";
import { AnimatedPage } from "../../components/AnimatedPage";
=======
import { useState } from 'react'
import { AnimatedPage } from '../../components/AnimatedPage'
import { ShowTimesCollection } from './components/ShowTimesCollection'
import { ShowTimesHeader } from './components/ShowTimesHeader'

const ShowtimesPage = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('')


  const handleCurrentLocation = (locationId: string) => {
    setCurrentLocation(locationId)
  }
>>>>>>> 6321283d0233e3c02d819f0d3fd80d2d2b72cdf2

const ShowtimesPage = ({
  handleSignState,
  handleLoginState,
  locationData,
  userLocation,
  handleLocationSelection,
  getTheatreData,
  signedPerson,
  handlelogout,
  currentMovieDetails,
  setMenuState,
}) => {
  return (
    <AnimatedPage>
      <>
        <Navbar
          signedPerson={signedPerson}
          pageName="showtimes"
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
          handlelogout={handlelogout}
          setMenuState={setMenuState}
        />
        <ShowTimesHeader
          locationData={locationData}
          userLocation={userLocation}
          handleLocationSelection={handleLocationSelection}
          getTheatreData={getTheatreData}
        />
        <ShowTimesCollection
          userLocation={userLocation}
          currentMovieDetails={currentMovieDetails}
          handleLoginState={handleLoginState}
          signedPerson={signedPerson}
        />
        <Footer
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
        />
      </>
    </AnimatedPage>
  );
};

export default ShowtimesPage;

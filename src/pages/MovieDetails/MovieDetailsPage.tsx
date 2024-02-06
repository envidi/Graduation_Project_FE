import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { MovieInfoSection } from "./components/MovieInfoSection";
import { MovieInfoCollection } from "./components/MovieInfoCollection";
import { Footer } from "../../components/Footer";
import { AnimatedPage } from "../../components/AnimatedPage";

const MovieDetailsPage = ({
  handleSignState,
  handleLoginState,
  signedPerson,
  handlelogout,
  getTheatreData,
  locationData,
  userLocation,
  handleLocationSelection,
  movieDetailsId,
  currentMovieDetails,
  setMenuState,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieDetailsId]);

  return (
    <AnimatedPage>
      <>
        <Navbar
          signedPerson={signedPerson}
          pageName="movieDetails"
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
          handlelogout={handlelogout}
          setMenuState={setMenuState}
        />
        <MovieInfoSection
          getTheatreData={getTheatreData}
          locationData={locationData}
          userLocation={userLocation}
          handleLocationSelection={handleLocationSelection}
          signedPerson={signedPerson}
          handleLoginState={handleLoginState}
        />
        <MovieInfoCollection
          currentMovieDetails={currentMovieDetails}
          signedPerson={signedPerson}
          handleLoginState={handleLoginState}
        />
        <Footer
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
        />
      </>
    </AnimatedPage>
  );
};

export default MovieDetailsPage;

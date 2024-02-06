import React from "react";
import { PurchaseSection } from "./components/PurchaseSection";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AnimatedPage } from "../../components/AnimatedPage";
const PurchasePage = ({
  handleSignState,
  handleLoginState,
  locationData,
  userLocation,
  handleLocationSelection,
  theatreId,
  handleUserDateChange,
  userDate,
  datesData,
  getMovieData,
  movieData,
  handleUserMovieChange,
  userMovieId,
  userShowtimeId,
  userHallId,
  getHallData,
  hallData,
  handleUserHallShow,
  getTheatreData,
  ticketPurchaseError,
  userSeatPrice,
  getShowDatesData,
  seatsData,
  getSeatsData,
  handleUserSeats,
  userSeatList,
  signedPerson,
  formattedDate,
  curHallObj,
  currentMovie,
  userSeatListName,
  handleUserPaymentMethod,
  userPayMethod,
  handlelogout,
  clearUserSelection,
  purchaseCompletion,
  setMenuState,
}) => {
  return (
    <AnimatedPage>
      <>
        <Navbar
          signedPerson={signedPerson}
          pageName="purchase"
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
          handlelogout={handlelogout}
          setMenuState={setMenuState}
        />
        <PurchaseSection
          clearUserSelection={clearUserSelection}
          signedPerson={signedPerson}
          locationData={locationData}
          userLocation={userLocation}
          handleLocationSelection={handleLocationSelection}
          theatreId={theatreId}
          handleUserDateChange={handleUserDateChange}
          userDate={userDate}
          datesData={datesData}
          getMovieData={getMovieData}
          movieData={movieData}
          handleUserMovieChange={handleUserMovieChange}
          userMovieId={userMovieId}
          userHallId={userHallId}
          userShowtimeId={userShowtimeId}
          getHallData={getHallData}
          hallData={hallData}
          handleUserHallShow={handleUserHallShow}
          getTheatreData={getTheatreData}
          userSeatPrice={userSeatPrice}
          getShowDatesData={getShowDatesData}
          seatsData={seatsData}
          getSeatsData={getSeatsData}
          handleUserSeats={handleUserSeats}
          userSeatList={userSeatList}
          formattedDate={formattedDate}
          curHallObj={curHallObj}
          currentMovie={currentMovie}
          userSeatListName={userSeatListName}
          handleUserPaymentMethod={handleUserPaymentMethod}
          userPayMethod={userPayMethod}
          ticketPurchaseError={ticketPurchaseError}
          purchaseCompletion={purchaseCompletion}
        />
        <Footer
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
        />
      </>
    </AnimatedPage>
  );
};

export default PurchasePage;

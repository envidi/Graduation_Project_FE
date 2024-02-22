// import React from "react";
// import { PurchaseSection } from "./components/PurchaseSection";
// import { Navbar } from "../../components/Navbar";
// import { Footer } from "../../components/Footer";
// import { AnimatedPage } from "../../components/AnimatedPage";

// interface PurchasePageProps {
//   handleSignState: () => void;
//   handleLoginState: () => void;
//   locationData: any;
//   userLocation: string;
//   handleLocationSelection: (location: string) => void;
//   theatreId: string;
//   handleUserDateChange: (date: string) => void;
//   userDate: string;
//   datesData: any;
//   getMovieData: () => void;
//   movieData: any;
//   handleUserMovieChange: (movieId: string) => void;
//   userMovieId: string;
//   userShowtimeId: string;
//   userHallId: string;
//   getHallData: () => void;
//   hallData: any;
//   handleUserHallShow: (hallId: string, showtimeId: string) => void;
//   getTheatreData: () => void;
//   ticketPurchaseError: string;
//   userSeatPrice: number;
//   getShowDatesData: () => void;
//   seatsData: any;
//   getSeatsData: (data: any) => void;
//   handleUserSeats: (seatId: string) => void;
//   userSeatList: string[];
//   signedPerson: any;
//   formattedDate: string;
//   curHallObj: any;
//   currentMovie: any;
//   userSeatListName: string[];
//   handleUserPaymentMethod: (method: string) => void;
//   userPayMethod: string;
//   // handlelogout: () => void;
//   clearUserSelection: () => void;
//   purchaseCompletion: boolean;
//   setMenuState: (state: boolean) => void;
// }

// const PurchasePage: React.FC<PurchasePageProps> = ({
//   handleSignState,
//   handleLoginState,
//   locationData,
//   userLocation,
//   handleLocationSelection,
//   theatreId,
//   handleUserDateChange,
//   userDate,
//   datesData,
//   getMovieData,
//   movieData,
//   handleUserMovieChange,
//   userMovieId,
//   userShowtimeId,
//   userHallId,
//   getHallData,
//   hallData,
//   handleUserHallShow,
//   getTheatreData,
//   ticketPurchaseError,
//   userSeatPrice,
//   getShowDatesData,
//   seatsData,
//   getSeatsData,
//   handleUserSeats,
//   userSeatList,
//   signedPerson,
//   formattedDate,
//   curHallObj,
//   currentMovie,
//   userSeatListName,
//   handleUserPaymentMethod,
//   userPayMethod,
//   handlelogout,
//   clearUserSelection,
//   purchaseCompletion,
//   setMenuState,
// }) => {
//   return (
//     <AnimatedPage>
//       <>
//         <Navbar
//           signedPerson={signedPerson}
//           pageName="purchase"
//           handleSignState={handleSignState}
//           handleLoginState={handleLoginState}
//           handlelogout={handlelogout}
//           setMenuState={(state: boolean) :void => setMenuState(state)}
//         />
//         <PurchaseSection
//           clearUserSelection={clearUserSelection}
//           signedPerson={signedPerson}
//           locationData={locationData}
//           userLocation={userLocation}
//           handleLocationSelection={handleLocationSelection}
//           theatreId={theatreId}
//           handleUserDateChange={handleUserDateChange}
//           userDate={userDate}
//           datesData={datesData}
//           getMovieData={getMovieData}
//           movieData={movieData}
//           handleUserMovieChange={handleUserMovieChange}
//           userMovieId={userMovieId}
//           userHallId={userHallId}
//           userShowtimeId={userShowtimeId}
//           getHallData={getHallData}
//           hallData={hallData}
//           handleUserHallShow={handleUserHallShow}
//           getTheatreData={getTheatreData}
//           userSeatPrice={userSeatPrice}
//           getShowDatesData={getShowDatesData}
//           seatsData={seatsData}
//           getSeatsData={getSeatsData}
//           handleUserSeats={handleUserSeats}
//           userSeatList={userSeatList}
//           formattedDate={formattedDate}
//           curHallObj={curHallObj}
//           currentMovie={currentMovie}
//           userSeatListName={userSeatListName}
//           handleUserPaymentMethod={handleUserPaymentMethod}
//           userPayMethod={userPayMethod}
//           ticketPurchaseError={ticketPurchaseError}
//           purchaseCompletion={purchaseCompletion}
//         />
//         <Footer
//           handleSignState={handleSignState}
//           handleLoginState={handleLoginState}
//         />
//       </>
//     </AnimatedPage>
//   );
// };

// export default PurchasePage;
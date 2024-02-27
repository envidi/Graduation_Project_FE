import './styles/styles.css'
import './styles/queries.css'

import { useQuery } from '@tanstack/react-query'
import { MOVIE } from '@/utils/constant'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
<<<<<<< HEAD
import MovieDetailsPage from './pages/MovieDetails/MovieDetailsPage'
import { SeatSelector } from './pages/Purchase/components/SeatSelector'
// import { ProtectedRoute } from './components/ProtectedRoute'

// import { SignupModal } from './pages/modals/SignupModal'
// import { LoginModal } from './pages/modals/LoginModal'

// import HomePage from './pages/Home/HomePage'

// import { AnimatePresence } from 'framer-motion'
// import { MobileNav } from './components/MobileNav'
// import { PageLoader } from './components/PageLoader'

// const PurchasePage = lazy(() => import('./pages/Purchase/PurchasePage'))
// const ShowtimesPage = lazy(() => import('./pages/Showtimes/ShowtimesPage'))
// const MovieDetailsPage = lazy(
//   () => import('./pages/MovieDetails/MovieDetailsPage')
// )
// const AboutUsPage = lazy(() => import('./pages/AboutUs/AboutUsPage'))
// const CustomerInfoPage = lazy(
//   () => import('./pages/CustomerInfo/CustomerInfoPage')
// )
// const AdminPage = lazy(() => import('./pages/Admin/AdminPage'))
=======
import PurchasePage from './pages/Purchase/PurchasePage'
import { getAllMovieHome } from '@/api/movie'

import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import { Suspense, lazy, useEffect } from 'react'
import { moviesAction } from './store/movie'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { PageLoader } from './components/PageLoader'
const MovieDetailsPage = lazy(
  () => import('./pages/MovieDetails/MovieDetailsPage')
)
const HomePage = lazy(() => import('./pages/Home/HomePage'))
>>>>>>> 6321283d0233e3c02d819f0d3fd80d2d2b72cdf2

function App() {
  const dispatch = useDispatch()
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE],
    queryFn: () => getAllMovieHome()
  })
  useEffect(() => {
    if (dataMovie) {
      // thêm global movie array
      dispatch(moviesAction.fetchData(dataMovie))
    }
  }, [dataMovie, dispatch])

  return (
<<<<<<< HEAD
  // <>
    //   <div
    //     style={
    //       signModalState || loginModalState || menuState ? blurredStyle : {}
    //     }
    //   >
    //     <ToastContainer />
    //     <AnimatePresence wait>
    //       <Routes key={location.pathname} location={location}>
    //         <Route
    //           path="/"
    //           element={
    //             <Suspense fallback={<PageLoader />}>
    //               <HomePage
    //                 signedPerson={signedPerson}
    //                 handleSignState={handleSignState}
    //                 handleLoginState={handleLoginState}
    //                 handlelogout={handlelogout}
    //                 currentMovieDetails={currentMovieDetails}
    //                 setMenuState={setMenuState}
    //               />
    //             </Suspense>
    //           }
    //         />

    //         <Route
    //           path="/showtimes"
    //           element={
    //             <Suspense fallback={<PageLoader />}>
    //               <ShowtimesPage
    //                 signedPerson={signedPerson}
    //                 handleSignState={handleSignState}
    //                 handleLoginState={handleLoginState}
    //                 handlelogout={handlelogout}
    //                 getTheatreData={getTheatreData}
    //                 locationData={locationData}
    //                 userLocation={userLocation}
    //                 handleLocationSelection={handleLocationSelection}
    //                 currentMovieDetails={currentMovieDetails}
    //                 setMenuState={setMenuState}
    //               />
    //             </Suspense>
    //           }
    //         />

    //         <Route
    //           element={
    //             <ProtectedRoute
    //               condition={
    //                 Object.keys(signedPerson).length !== 0 &&
    //                 signedPerson.person_type === 'Customer'
    //               }
    //             />
    //           }
    //         >
    //           <Route
    //             path="/purchase"
    //             element={
    //               <Suspense fallback={<PageLoader />}>
    //                 <PurchasePage
    //                   theatreId={userPurchaseInfo.theatre_id}
    //                   userDate={userPurchaseInfo.showtime_date}
    //                   userMovieId={userPurchaseInfo.movie_id}
    //                   userHallId={userPurchaseInfo.hall_id}
    //                   userShowtimeId={userPurchaseInfo.showtime_id}
    //                   userSeatPrice={userPurchaseInfo.seat_price}
    //                   userSeatList={userPurchaseInfo.seat_id_list}
    //                   userPayMethod={userPurchaseInfo.payment_method}
    //                   clearUserSelection={handleUserPurchaseLocationInfo}
    //                   signedPerson={signedPerson}
    //                   handleSignState={handleSignState}
    //                   handleLoginState={handleLoginState}
    //                   handlelogout={handlelogout}
    //                   getTheatreData={getTheatreData}
    //                   locationData={locationData}
    //                   userLocation={userLocation}
    //                   handleLocationSelection={handleLocationSelection}
    //                   handleUserDateChange={handleUserDateChange}
    //                   datesData={datesData}
    //                   getMovieData={getMovieData}
    //                   movieData={movieData}
    //                   handleUserMovieChange={handleUserMovieChange}
    //                   getHallData={getHallData}
    //                   hallData={hallData}
    //                   handleUserHallShow={handleUserHallShow}
    //                   getShowDatesData={getShowDatesData}
    //                   seatsData={seatsData}
    //                   getSeatsData={getSeatsData}
    //                   handleUserSeats={handleUserSeats}
    //                   formattedDate={formattedDate}
    //                   curHallObj={curHallObj}
    //                   currentMovie={currentMovie}
    //                   userSeatListName={userSeatListName}
    //                   handleUserPaymentMethod={handleUserPaymentMethod}
    //                   purchaseCompletion={purchaseCompletion}
    //                   ticketPurchaseError={ticketPurchaseError}
    //                   setMenuState={setMenuState}
    //                 />
    //               </Suspense>
    //             }
    //           />

    //           <Route
    //             path="/customer"
    //             element={
    //               <Suspense fallback={<PageLoader />}>
    //                 <CustomerInfoPage
    //                   signedPerson={signedPerson}
    //                   handleSignState={handleSignState}
    //                   handleLoginState={handleLoginState}
    //                   handlelogout={handlelogout}
    //                   setMenuState={setMenuState}
    //                 />
    //               </Suspense>
    //             }
    //           />
    //         </Route>

    //         <Route
    //           element={
    //             <ProtectedRoute
    //               condition={
    //                 Object.keys(signedPerson).length !== 0 &&
    //                 signedPerson.person_type === 'Admin'
    //               }
    //             />
    //           }
    //         >
    //           <Route
    //             path="/admin"
    //             element={
    //               <Suspense fallback={<PageLoader />}>
    //                 <AdminPage
    //                   signedPerson={signedPerson}
    //                   handleSignState={handleSignState}
    //                   handleLoginState={handleLoginState}
    //                   handlelogout={handlelogout}
    //                   adminErrorToast={adminErrorToast}
    //                   adminMovieToast={adminMovieToast}
    //                   adminShowtimeToast={adminShowtimeToast}
    //                   adminShowninToast={adminShowninToast}
    //                   setMenuState={setMenuState}
    //                 />
    //               </Suspense>
    //             }
    //           />
    //         </Route>

    //         <Route
    //           path="/aboutus"
    //           element={
    //             <Suspense fallback={<PageLoader />}>
    //               <AboutUsPage
    //                 signedPerson={signedPerson}
    //                 handleSignState={handleSignState}
    //                 handleLoginState={handleLoginState}
    //                 handlelogout={handlelogout}
    //                 setMenuState={setMenuState}
    //               />
    //             </Suspense>
    //           }
    //         />

    //         <Route
    //           path="/movieDetails"
    //           element={<Navigate replace to="/movieDetails/1" />}
    //         />

    //         <Route
    //           path="/movieDetails/:id"
    //           element={
    //             <Suspense fallback={<PageLoader />}>
    //               <MovieDetailsPage
    //                 signedPerson={signedPerson}
    //                 handleSignState={handleSignState}
    //                 handleLoginState={handleLoginState}
    //                 handlelogout={handlelogout}
    //                 getTheatreData={getTheatreData}
    //                 locationData={locationData}
    //                 userLocation={userLocation}
    //                 handleLocationSelection={handleLocationSelection}
    //                 movieDetailsId={movieDetailsId}
    //                 currentMovieDetails={currentMovieDetails}
    //                 setMenuState={setMenuState}
    //               />
    //             </Suspense>
    //           }
    //         />
    //       </Routes>
    //     </AnimatePresence>
    //   </div>

    //   {signModalState && (
    //     <SignupModal
    //       handleSignState={handleSignState}
    //       signupSuccessToast={signupSuccessToast}
    //       signupFailedToast={signupFailedToast}
    //     />
    //   )}
    //   {loginModalState && (
    //     <LoginModal
    //       handleLoginState={handleLoginState}
    //       handleSignedPerson={handleSignedPerson}
    //       loginFailedToast={loginFailedToast}
    //     />
    //   )}
    //   <MobileNav
    //     menuState={menuState}
    //     menuStyle={menuStyle}
    //     setMenuState={setMenuState}
    //     signedPerson={signedPerson}
    //     handlelogout={handlelogout}
    //     handleSignState={handleSignState}
    //     handleLoginState={handleLoginState}
    //   />
    // </>
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route
            path="/movie/:id"
            element={
              <MovieDetailsPage />
            }
          />
           <Route
            path="/seat"
            element={
              <SeatSelector />
            }
          />

        </Route>
      </Routes>
=======
    <>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route
              index
              path="/"
              element={
                <Suspense fallback={<PageLoader />}>
                  <HomePage dataMovie={dataMovie} isLoading={isLoading} />
                </Suspense>
              }
            />
            <Route
              path="/movie/:slug"
              element={
                <Suspense fallback={<PageLoader />}>
                  <MovieDetailsPage />
                </Suspense>
              }
            />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/showtimes" element={<ShowtimesPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
>>>>>>> 6321283d0233e3c02d819f0d3fd80d2d2b72cdf2
    </>
  )
}

export default App
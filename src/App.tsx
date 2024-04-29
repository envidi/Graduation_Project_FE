import './styles/styles.css'
import './styles/queries.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify'

import { CSSProperties, Suspense, lazy, useEffect, useState } from 'react'
import { moviesAction } from './store/movie'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { PageLoader } from './components/PageLoader'
// import Profile from './pages/modals/Profile'
import useAllMovie from './hooks/useAllMovie'

import ECommerce from './admin/pages/Dashboard/ECommerce'

import Settings from './admin/pages/Settings'
import CategoryPage from './admin/pages/Category'

import Profile from './admin/pages/Profile'
// import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import NotFound from './pages/NotFound/NotFound'
// import CategoryAdd from './admin/pages/Category/Add'
// import CategoryEdit from './admin/pages/Category/Edit'
// import Payment from './pages/Payment/Payment'
import ResultPage from './pages/ResultPage/ResultPage'
import ProtectedRoutePage from './pages/Routes/ProtectedRoute'
// import SettingsLayout from './pages/Profile/layout'
// import SettingsProfilePage from './pages/Profile/page'
import SettingsAccountPage from './pages/Profile/account/page'
// import SettingsAppearancePage from './pages/Profile/Appearence/page'
import MobileNav from './components/MobileNav'
import CinemaPage from './admin/pages/Cinema'
import CinemaEdit from './admin/pages/Cinema/Edit'
import MovieEdit from './admin/pages/Movie/Edit'
import MovieAdd from './admin/pages/Movie/Add'
import MoviePageadmin from './admin/pages/Movie'
import FoodAdminPage from './admin/pages/Food'
import FoodAdd from './admin/pages/Food/Add'
import FoodEdit from './admin/pages/Food/Edit'
const MovieDetailsPage = lazy(
  () => import('./pages/MovieDetails/MovieDetailsPage')
)
const HomePage = lazy(() => import('./pages/Home/HomePage'))
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage'))
const FoodPage = lazy(() => import('./pages/FoodPage/FoodPage'))
const PurchaseLayout = lazy(() => import('./layouts/PurchaseLayout'))
const SeatPage = lazy(() => import('./pages/SeatPage/SeatPage'))
const SettingsProfilePage = lazy(() => import('./pages/Profile/page'))
const SettingsAppearancePage = lazy(
  () => import('./pages/Profile/Appearence/page')
)
const SettingsLayout = lazy(() => import('./pages/Profile/layout'))
const Payment = lazy(() => import('./pages/Payment/Payment'))
const ShowtimesPage = lazy(() => import('./pages/Showtimes/ShowtimesPage'))
const ProfileBillPage = lazy(() => import('./pages/Profile/Billing/page'))
import ProtectedAuthorized from './pages/Routes/ProtectedAuthorRoute'
// import ProtectedConfirm from './pages/Routes/ProtectedConfirm'
import PendingResult from './pages/ResultPage/PendingResult'
import ProtectedResultPage from './pages/Routes/ProtectedResultPage'
import Users from './admin/pages/Users'
import Showtimes from './admin/pages/Showtimes/Showtimes'
import CreateShowtimes from './admin/pages/Showtimes/CreateShowtimes'
import UpdateShowtimes from './admin/pages/Showtimes/UpdateShowtimes'
import Restore from './admin/pages/Showtimes/Restore'

import TicketsPage from './admin/pages/Tickets'
import FoodAdminDestroyPage from './admin/pages/Food/indexDestroy'

// import DetailsRoomsPage from './admin/pages/Rooms/GetDetail'

import PolicyPage from './pages/Policy/PolicyPage'
import DetailMovie from './admin/pages/Movie/DetailMovie'
import DetailTicket from './admin/pages/Tickets/components/DetailTicket'
import TableSoftDeleteMovie from './admin/pages/Movie/TableSoftDelete'
import RoomsPage from './admin/pages/Rooms'
import AddRooms from './admin/pages/Rooms/AddRooms'
import EditRooms from './admin/pages/Rooms/EditRooms'
import ShowtimeApproval from './admin/pages/Showtimes/ShowtimeApproval'
import ProtectedAdminRoute from './pages/Routes/ProtectedAdminRoute'
import ProtectedAdminAndStaffRoute from './pages/Routes/ProtectedAdminandSraffRoute'

const ProfileWatchListPage = lazy(
  () => import('./pages/Profile/WatchList/page')
)

function App() {
  const accessToken = localStorage.getItem('accessToken');
  const dispatch = useDispatch()
  const [menuState, setMenuState] = useState(false)
  const menuStyle: CSSProperties = {
    opacity: '1',
    pointerEvents: 'auto',
    visibility: 'visible',
    transform: 'translateX(0)'
  }
  const { data: dataMovie, isLoading } = useAllMovie()
  useEffect(() => {
    if (dataMovie) {
      // thêm global movie array
      dispatch(moviesAction.fetchData(dataMovie))
    }
  }, [dataMovie, dispatch])

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnimatePresence>
          <Routes>
            <Route
              path="/"
              element={<ClientLayout setMenuState={setMenuState} />}
            >
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
              {/* <Route path="/purchase" element={<PurchasePage />} /> */}
              <Route
                path="/showtimes"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ShowtimesPage />
                  </Suspense>
                }
              />
              <Route
                path="/profile/forms"
                element={
                  <ProtectedAuthorized>
                    <Suspense fallback={<PageLoader />}>
                      <SettingsLayout>
                        <SettingsProfilePage />
                      </SettingsLayout>
                    </Suspense>
                  </ProtectedAuthorized>
                }
              />
              <Route
                path="/profile/watchlist"
                element={
                  <ProtectedAuthorized>
                    <Suspense fallback={<PageLoader />}>
                      <SettingsLayout>
                        <ProfileWatchListPage />
                      </SettingsLayout>
                    </Suspense>
                  </ProtectedAuthorized>
                }
              />
              <Route
                path="/profile/bill"
                element={
                  <ProtectedAuthorized>
                    <Suspense fallback={<PageLoader />}>
                      <SettingsLayout>
                        <ProfileBillPage />
                      </SettingsLayout>
                    </Suspense>
                  </ProtectedAuthorized>
                }
              />
              <Route
                path="/profile/forms/account"
                element={
                  <ProtectedAuthorized>
                    <Suspense fallback={<PageLoader />}>
                      <SettingsLayout>
                        <SettingsAccountPage />
                      </SettingsLayout>
                    </Suspense>
                  </ProtectedAuthorized>
                }
              />
              <Route
                path="/profile/forms/appearance"
                element={
                  <ProtectedAuthorized>
                    <Suspense fallback={<PageLoader />}>
                      <SettingsLayout>
                        <SettingsAppearancePage />
                      </SettingsLayout>
                    </Suspense>
                  </ProtectedAuthorized>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route
                path="/movies"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <MoviePage />
                  </Suspense>
                }
              />
              <Route
                path="result"
                element={
                  <ProtectedResultPage>
                    <Suspense fallback={<PageLoader />}>
                      <ResultPage />
                    </Suspense>
                  </ProtectedResultPage>
                }
              />
              <Route
                path="pending"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PendingResult />
                  </Suspense>
                }
              />
              <Route
                path="/purchase"
                element={
                  <ProtectedAuthorized>
                    <ProtectedRoutePage>
                      <Suspense fallback={<PageLoader />}>
                        <PurchaseLayout />
                      </Suspense>
                    </ProtectedRoutePage>
                  </ProtectedAuthorized>
                }
              >
                <Route
                  path="food"
                  element={
                    <ProtectedRoutePage>
                      <Suspense fallback={<PageLoader />}>
                        <FoodPage />
                      </Suspense>
                    </ProtectedRoutePage>
                  }
                />
                <Route
                  path="seat"
                  element={
                    <ProtectedRoutePage>
                      <Suspense fallback={<PageLoader />}>
                        <SeatPage />
                      </Suspense>
                    </ProtectedRoutePage>
                  }
                />
                <Route
                  path="payment"
                  element={
                    <ProtectedRoutePage>
                      <Suspense fallback={<PageLoader />}>
                        <Payment />
                      </Suspense>
                    </ProtectedRoutePage>
                  }
                />
              </Route>
            </Route>
            {/* admin */}
            <Route path="/admin" >


              {/* Define the routes for the admin section */}

              <Route index element={
                <ProtectedAdminAndStaffRoute redirectPath="/">
                  {/* <UpdateShowtimes /> */}
                  <ECommerce />
                </ProtectedAdminAndStaffRoute>
              } />

              <Route path="category">
                <Route index element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">
                    <CategoryPage
                    />
                  </ProtectedAdminAndStaffRoute>
                } />
                {/* <Route path="add" element={<CategoryAdd />} />
                <Route path="edit/:id" element={<CategoryEdit />} /> */}
              </Route>

              <Route path="food">
                <Route index element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    <FoodAdminPage />

                  </ProtectedAdminAndStaffRoute>
                } />
                <Route path="destroy" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    <FoodAdminDestroyPage />

                  </ProtectedAdminAndStaffRoute>


                } />
                <Route path="add" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}

                    <FoodAdd />
                  </ProtectedAdminAndStaffRoute>

                } />
                <Route path="edit/:id" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}

                    <FoodEdit />
                  </ProtectedAdminAndStaffRoute>

                } />
              </Route>

              <Route path="cinema">
                <Route index element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}

                    <CinemaPage />
                  </ProtectedAdminAndStaffRoute>

                } />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedAdminRoute redirectPath="/admin/cinema">
                      <CinemaEdit />
                    </ProtectedAdminRoute>
                  }
                />
              </Route>
              <Route path="movie">
                <Route index element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}
                    <MoviePageadmin />

                  </ProtectedAdminAndStaffRoute>

                } />
                <Route
                  path="add"
                  element={
                    <ProtectedAdminRoute redirectPath="/admin/movie">
                      <MovieAdd />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedAdminRoute redirectPath="/admin/movie">
                      <MovieEdit />
                    </ProtectedAdminRoute>
                  }
                />
                <Route path="softdelete" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}
                    <TableSoftDeleteMovie />

                  </ProtectedAdminAndStaffRoute>

                }

                />
                <Route path=":slug" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}

                    <DetailMovie />
                  </ProtectedAdminAndStaffRoute>

                } />
              </Route>
              <Route path="screeningrooms">
                <Route index element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}

                    <RoomsPage />
                  </ProtectedAdminAndStaffRoute>

                } />

                <Route
                  path="add"
                  element={
                    <ProtectedAdminRoute redirectPath="/admin/screeningrooms">
                      <AddRooms />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedAdminRoute redirectPath="/admin/screeningrooms">
                      <EditRooms />
                    </ProtectedAdminRoute>
                  }
                />
              </Route>
              {/* <Route
                path="screeningrooms/destroy"
                element={<RoomsPageDestroy />}
              /> */}
              <Route path="tickets">
                <Route index element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}
                    <TicketsPage />

                  </ProtectedAdminAndStaffRoute>
                } />

                <Route path="detail/:id" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}
                    <DetailTicket />

                  </ProtectedAdminAndStaffRoute>

                } />
                {/* <Route path="add" element={<AddRooms />} />
                <Route path="edit/:id" element={<EditRooms />} /> */}
              </Route>

              <Route path="profile" element={
                <ProtectedAdminAndStaffRoute redirectPath="/">

                  {/* <FoodAdminPage /> */}
                  {/* <FoodAdminDestroyPage /> */}
                  <Profile />

                </ProtectedAdminAndStaffRoute>

              } />
              <Route path="users" element={
                <ProtectedAdminAndStaffRoute redirectPath="/">

                  {/* <FoodAdminPage /> */}
                  {/* <FoodAdminDestroyPage /> */}
                  <Users />

                </ProtectedAdminAndStaffRoute>

              } />

              <Route path="showtimes">
                <Route index element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <FoodAdminPage /> */}
                    {/* <FoodAdminDestroyPage /> */}
                    <Showtimes />

                  </ProtectedAdminAndStaffRoute>

                } />
                <Route path="approval" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    <ShowtimeApproval />

                  </ProtectedAdminAndStaffRoute>


                } />
                <Route path="create" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <ShowtimeApproval /> */}
                    <CreateShowtimes />

                  </ProtectedAdminAndStaffRoute>

                } />
                <Route
                  path="update/:id"
                  element={
                    <ProtectedAdminRoute redirectPath="/admin/showtimes">
                      <UpdateShowtimes />
                    </ProtectedAdminRoute>
                  }
                />
                <Route path="restore" element={
                  <ProtectedAdminAndStaffRoute redirectPath="/">

                    {/* <ShowtimeApproval /> */}
                    <Restore />

                  </ProtectedAdminAndStaffRoute>
                }
                />
              </Route>

              <Route path="settings" element={
                <ProtectedAdminAndStaffRoute redirectPath="/">

                  {/* <ShowtimeApproval /> */}
                  <Settings />

                </ProtectedAdminAndStaffRoute>
              }
              />
              {/*  */}

              {/*  */}
            </Route>
          </Routes>
        </AnimatePresence>

        <ToastContainer
          style={{
            fontSize: '1.2rem'
          }}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce} // Sử dụng dấu '=' để gán giá trị cho thuộc tính
        />
        <MobileNav
          menuState={menuState}
          menuStyle={menuStyle}
          setMenuState={setMenuState}
        />
      </ThemeProvider>
    </>
  )
}

export default App

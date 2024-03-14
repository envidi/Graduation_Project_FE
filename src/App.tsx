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


// import PageTitle from './admin/components/PageTitle'
import ECommerce from './admin/pages/Dashboard/ECommerce'
import SignIn from './admin/pages/Authentication/SignIn'
import SignUp from './admin/pages/Authentication/SignUp'
import Chart from './admin/pages/Chart'
import FormElements from './admin/pages/Form/FormElements'
import FormLayout from './admin/pages/Form/FormLayout'
import Tables from './admin/pages/Tables'
import Alerts from './admin/pages/UiElements/Alerts'
import Buttons from './admin/pages/UiElements/Buttons'
import Calendar from './admin/pages/Calendar'
import Settings from './admin/pages/Settings'
import CategoryPage from './admin/pages/Category'

import Profile from './admin/pages/Profile'
// import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import NotFound from './pages/NotFound/NotFound'
import CategoryAdd from './admin/pages/Category/Add'
import CategoryEdit from './admin/pages/Category/Edit'
// import Payment from './pages/Payment/Payment'
import ResultPage from './pages/ResultPage/ResultPage'
import ProtectedRoutePage from './pages/Routes/ProtectedRoute'
// import SettingsLayout from './pages/Profile/layout'
// import SettingsProfilePage from './pages/Profile/page'
import SettingsAccountPage from './pages/Profile/account/page' 
// import SettingsAppearancePage from './pages/Profile/Appearence/page'
import MobileNav from './components/MobileNav'
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


function App() {
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
              <Route path="/showtimes" element={<ShowtimesPage />} />
              <Route
                path="/profile/forms"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SettingsLayout>
                      <SettingsProfilePage />
                    </SettingsLayout>
                  </Suspense>
                }
              />
              <Route
                path="/profile/bill"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SettingsLayout>
                      <ProfileBillPage />
                    </SettingsLayout>
                  </Suspense>
                }
              />
              <Route
                path="/profile/forms/account"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SettingsLayout>
                      <SettingsAccountPage />
                    </SettingsLayout>
                  </Suspense>
                }
              />
              <Route
                path="/profile/forms/appearance"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SettingsLayout>
                      <SettingsAppearancePage />
                    </SettingsLayout>
                  </Suspense>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/movies"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <MoviePage />
                  </Suspense>
                }
              />
              <Route
                path="/purchase"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PurchaseLayout />
                  </Suspense>
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
                <Route
                  path="result"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ResultPage />
                    </Suspense>
                  }
                />
              </Route>
            </Route>

            <Route path="/admin">
              {/* Define the routes for the admin section */}
              <Route index element={<ECommerce />} />
              <Route path="category">
                <Route index element={<CategoryPage />} />
                <Route path="add" element={<CategoryAdd />} />
                <Route path="edit/:id" element={<CategoryEdit />} />
              </Route>
              <Route path="calendar" element={<Calendar />} />
              <Route path="profile" element={<Profile />} />
              <Route path="forms/form-elements" element={<FormElements />} />
              <Route path="forms/form-layout" element={<FormLayout />} />
              <Route path="tables" element={<Tables />} />
              <Route path="settings" element={<Settings />} />
              <Route path="chart" element={<Chart />} />
              <Route path="ui/alerts" element={<Alerts />} />
              <Route path="ui/buttons" element={<Buttons />} />
              <Route path="auth/signin" element={<SignIn />} />
              <Route path="auth/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </AnimatePresence>

        <ToastContainer
          style={{
            fontSize: '1.8rem'
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

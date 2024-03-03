import './styles/styles.css'
import './styles/queries.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify'

import { Suspense, lazy, useEffect } from 'react'
import { moviesAction } from './store/movie'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { PageLoader } from './components/PageLoader'
// import Profile from './pages/modals/Profile'
import useAllMovie from './hooks/useAllMovie'

import Profile from './admin/pages/Profile'
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

import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import NotFound from './pages/NotFound/NotFound'
const MovieDetailsPage = lazy(
  () => import('./pages/MovieDetails/MovieDetailsPage')
)
const HomePage = lazy(() => import('./pages/Home/HomePage'))
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage'))
const FoodPage = lazy(() => import('./pages/FoodPage/FoodPage'))
const PurchaseLayout = lazy(() => import('./layouts/PurchaseLayout'))
const SeatPage = lazy(() => import('./pages/SeatPage/SeatPage'))

function App() {
  const dispatch = useDispatch()
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
              {/* <Route path="/purchase" element={<PurchasePage />} /> */}
              <Route path="/showtimes" element={<ShowtimesPage />} />
              <Route path="/profile" element={<Profile />} />
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
                    <Suspense fallback={<PageLoader />}>
                      <FoodPage />
                    </Suspense>
                  }
                />
                <Route
                  path="seat"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <SeatPage />
                    </Suspense>
                  }
                />
              </Route>
            </Route>

            <Route path="/admin">
              {/* Define the routes for the admin section */}
              <Route index element={<ECommerce />} />
              <Route path="category" element={<CategoryPage />} />
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
      </ThemeProvider>
    </>
  )
}

export default App

import './styles/styles.css'
import './styles/queries.css'

import { useQuery } from '@tanstack/react-query'
import { MOVIE } from '@/utils/constant'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import PurchasePage from './pages/Purchase/PurchasePage'
import { getAllMovieHome } from '@/api/movie'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import { Suspense, lazy, useEffect } from 'react'
import { moviesAction } from './store/movie'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { PageLoader } from './components/PageLoader'
import Profile from './admin/pages/Profile'
import PageTitle from './admin/components/PageTitle'
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
const MovieDetailsPage = lazy(
  () => import('./pages/MovieDetails/MovieDetailsPage')
)
const HomePage = lazy(() => import('./pages/Home/HomePage'))

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
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/admin">
            {/* Define the routes for the admin section */}
            <Route index element={<ECommerce />} />
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
    </>
  )
}

export default App

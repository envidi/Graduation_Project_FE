import './styles/styles.css'
import './styles/queries.css'

import { useQuery } from '@tanstack/react-query'
import { MOVIE } from '@/utils/constant'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import PurchasePage from './pages/Purchase/PurchasePage'
import { getAllMovieHome } from '@/api/movie'

import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import { Suspense, lazy, useEffect } from 'react'
import { moviesAction } from './store/movie'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { PageLoader } from './components/PageLoader'
import Profile from './pages/modals/Profile'
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
            <Route path='/profile' element={<Profile />} />
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

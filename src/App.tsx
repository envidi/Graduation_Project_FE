import './styles/styles.css'
import './styles/queries.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import PurchasePage from './pages/Purchase/PurchasePage'

import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify'
import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import { Suspense, lazy, useEffect } from 'react'
import { moviesAction } from './store/movie'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { PageLoader } from './components/PageLoader'
import Profile from './pages/modals/Profile'
import useAllMovie from './hooks/useAllMovie'
import NotFound from './pages/NotFound/NotFound'
const MovieDetailsPage = lazy(
  () => import('./pages/MovieDetails/MovieDetailsPage')
)
const HomePage = lazy(() => import('./pages/Home/HomePage'))
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage'))

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
              <Route path="/purchase" element={<PurchasePage />} />
              <Route path="/showtimes" element={<ShowtimesPage />} />
              <Route
                path="/movies"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <MoviePage />
                  </Suspense>
                }
              />
              <Route path="*" element={<NotFound />} />
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
      </ThemeProvider>
    </>
  )
}

export default App

import './styles/styles.css'
import './styles/queries.css'
import { ThemeProvider } from '@/components/theme-provider'
import { useQuery } from '@tanstack/react-query'
import { MOVIE } from '@/utils/constant'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
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
            </Route>
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
}

export default App

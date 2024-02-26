import './styles/styles.css'
import './styles/queries.css'

import { useQuery } from '@tanstack/react-query'
import { MOVIE } from '@/utils/constant'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import MovieDetailsPage from './pages/MovieDetails/MovieDetailsPage'
import PurchasePage from './pages/Purchase/PurchasePage'
import { getAllMovieHome } from '@/api/movie'

import HomePage from './pages/Home/HomePage'
import ShowtimesPage from './pages/Showtimes/ShowtimesPage'
import { useEffect } from 'react'
import { moviesAction } from './store/movie'
import { useDispatch } from 'react-redux'

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
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route
            index
            path="/"
            element={<HomePage dataMovie={dataMovie} isLoading={isLoading} />}
          />
          <Route path="/movie/:slug" element={<MovieDetailsPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/showtimes" element={<ShowtimesPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

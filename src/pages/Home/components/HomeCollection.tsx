<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { CollectionCard } from '../../../components/CollectionCard'
import axios from 'axios'
import HashLoader from 'react-spinners/HashLoader'
=======
import { CollectionCard } from '../../../components/CollectionCard'
import { useQuery } from '@tanstack/react-query'

import { getAllMovie } from '@/api/movie'
import { MOVIE } from '@/utils/constant'
import HashLoader from 'react-spinners/HashLoader'
import { MovieType } from '@/Interface/movie'
// import { MOVIES } from '../../../apis/mock-data'

>>>>>>> f264635b3831c5d39e386a4d4fd1a846932259fa

export const HomeCollection = ({
  currentMovieDetails,
  signedPerson,
  handleLoginState
}:any) => {
  const override = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const [movieData, setMovieData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/latestMovies[]')
        setMovieData(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const latestMoviesCards = movieData.map((latestMovie:any) => {
    return (
      <CollectionCard
        key={latestMovie.id}
        {...latestMovie}
        signedPerson={signedPerson}
        handleLoginState={handleLoginState}
        currentMovieDetails={currentMovieDetails}
      />
    )
  })

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Now Playing &rarr;
        </h1>
      </div>

      {loading && <HashLoader cssOverride={override} color="#eb3656" />}
      <div className="home-collection-container">
<<<<<<< HEAD
        {!loading && latestMoviesCards}
=======
        {dataMovie?.map((latestMovie: MovieType, idx: number) => {
          return <CollectionCard key={idx} className="" movie={latestMovie} />
        })}
>>>>>>> f264635b3831c5d39e386a4d4fd1a846932259fa
      </div>
    </section>
  )
}

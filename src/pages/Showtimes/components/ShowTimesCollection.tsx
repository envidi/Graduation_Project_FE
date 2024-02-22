import { getAllMovie } from '@/api/movie'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { ShowtimesCard } from './ShowtimesCard'

type ShowTimesCollectionProps = {
  userLocation: string
  // currentMovieDetails: (movieId: string) => void
  // handleLoginState: (state: boolean) => void
  // signedPerson: boolean
}
export const ShowTimesCollection = ({
  userLocation
  // currentMovieDetails,
  // handleLoginState,
  // signedPerson
}: ShowTimesCollectionProps) => {
  const override = {
    display: 'block',
    margin: '4.8rem auto'
  }

  // Thay đổi địa điểm (location) hoặc thể loại (category) phim thì sẽ get lại dữ liệu

  // const [loading1, setLoading1] = useState(false)
  // const [loading2, setLoading2] = useState(false)
  // const [showtimesData, setShowtimesData] = useState([])
  // const theatreName = userLocation && userLocation.name

  const [searchParams] = useSearchParams()

  const userGenre = searchParams.get('genre') || 'All'

  const { data: dataMovies, isLoading } = useQuery({
    queryKey: ['ALL_MOVIES', userLocation, userGenre],
    queryFn: () => getAllMovie()
  })

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading1(true)
  //     try {
  //       await dataFetch()
  //     } catch (err) {
  //       console.log(err)
  //     } finally {
  //       setLoading1(false)
  //     }
  //   }

  //   fetchData()
  // }, [userLocation])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading2(true)
  //     try {
  //       await dataFetch()
  //     } catch (err) {
  //       console.log(err)
  //     } finally {
  //       setLoading2(false)
  //     }
  //   }

  //   fetchData()
  // }, [userGenre])

  // const dataFetch = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/showtimes`,
  //       {
  //         theatreName,
  //         userGenre
  //       }
  //     )

  //     setShowtimesData(response.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const movieShowtimes = []

  // for (let i = 0; i < showtimesData.length; i++) {
  //   const curMovieDate = showtimesData[i].showtime_date
  //   const curMovieName = showtimesData[i].movie_name
  //   const curMovieImagePath = showtimesData[i].image_path
  //   const curMovieStartTime = showtimesData[i].movie_start_time
  //   const curMovieType = showtimesData[i].show_type
  //   const curMovieGenre = showtimesData[i].genre
  //   const curMovieId = showtimesData[i].id

  //   const isPresent = movieShowtimes.some(
  //     (movie) => movie.movie_name === curMovieName
  //   )

  //   if (isPresent) {
  //     const currentMovie = movieShowtimes.find(
  //       (movie) => movie.movie_name === curMovieName
  //     )

  //     if (!currentMovie.genre.includes(curMovieGenre)) {
  //       currentMovie.genre.push(curMovieGenre)
  //     }

  //     if (curMovieType in currentMovie) {
  //       if (curMovieDate in currentMovie[curMovieType]) {
  //         if (
  //           !currentMovie[curMovieType][curMovieDate].includes(
  //             curMovieStartTime
  //           )
  //         ) {
  //           currentMovie[curMovieType][curMovieDate].push(curMovieStartTime)
  //         }
  //       } else {
  //         currentMovie[curMovieType][curMovieDate] = [curMovieStartTime]
  //       }
  //     } else {
  //       currentMovie[curMovieType] = {
  //         [curMovieDate]: [curMovieStartTime]
  //       }
  //     }
  //   } else {
  //     movieShowtimes.push({
  //       id: curMovieId,
  //       movie_name: curMovieName,
  //       image_path: curMovieImagePath,
  //       genre: [curMovieGenre],
  //       [curMovieType]: {
  //         [curMovieDate]: [curMovieStartTime]
  //       }
  //     })
  //   }
  // }

  if (isLoading) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }

  return (
    <section className="section-showtimes">
      <div className="showtimes-collection container">
        {dataMovies.map((movie, idx) => {
          return (
            <ShowtimesCard
              key={idx}
              {...movie}
              userLocation={userLocation}
              // handleLoginState={handleLoginState}
              // signedPerson={signedPerson}
              // currentMovieDetails={currentMovieDetails}
            />
          )
        })}
      </div>
    </section>
  )
}

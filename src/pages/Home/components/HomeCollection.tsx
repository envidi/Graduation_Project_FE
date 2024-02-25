import { CollectionCard } from '../../../components/CollectionCard'
import { useQuery } from '@tanstack/react-query'

import { getAllMovie } from '@/api/movie'
import { MOVIE } from '@/utils/constant'
import HashLoader from 'react-spinners/HashLoader'
import { MovieType } from '@/Interface/movie'
// import { MOVIES } from '../../../apis/mock-data'


export const HomeCollection = () => {
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE],
    queryFn: () => getAllMovie()
  })
  const override = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }

  // const [movieData, setMovieData] = useState<any>(MOVIES)

  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const newMovies = MOVIES.slice(0, 10)
  //   setLoading(false)
  //   setMovieData(newMovies)
  // }, [])

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Now Playing &rarr;
        </h1>
      </div>

      <div className="home-collection-container">
        {dataMovie?.map((latestMovie: MovieType, idx: number) => {
          return <CollectionCard key={idx} className="" movie={latestMovie} />
        })}
      </div>
    </section>
  )
}

import { getAllMovie, getRelateMovie } from '@/api/movie'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { ShowtimesCard } from './ShowtimesCard'

type ShowTimesCollectionProps = {
  userLocation: string
  currentCategory: string
}
export const ShowTimesCollection = ({
  userLocation,
  currentCategory
}: ShowTimesCollectionProps) => {
  const override = {
    display: 'block',
    margin: '4.8rem auto'
  }

  // Thay đổi địa điểm (location) hoặc thể loại (category) phim thì sẽ get lại dữ liệu

  const [searchParams] = useSearchParams()

  const userGenre = searchParams.get('genre') || 'All'

  const { data: dataMovies, isLoading } = useQuery({
    queryKey: ['ALL_MOVIES', userLocation, userGenre],
    queryFn: () => getAllMovie(),
    enabled: currentCategory === 'All' || currentCategory === ''
  })

  const { data: dataFilteredMovies, isLoading: isLoadingFilter } = useQuery({
    queryKey: ['MOVIE_RELATED', currentCategory],
    queryFn: () => getRelateMovie('65c8dc874a19975a1cc5fc7e'),
    initialData: dataMovies
  })

  if (isLoading || isLoadingFilter) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }

  return (
    <section className="section-showtimes">
      <div className="showtimes-collection container">
        {dataFilteredMovies.map((movie, idx) => {
          return (
            <ShowtimesCard key={idx} {...movie} userLocation={userLocation} />
          )
        })}
      </div>
    </section>
  )
}

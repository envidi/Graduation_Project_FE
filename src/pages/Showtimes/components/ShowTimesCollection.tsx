import { getAllMovie } from '@/api/movie'
import { useQuery } from '@tanstack/react-query'
// import { useSearchParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { useShowTimeContext } from '../contexts'
import { ShowtimesCard } from './ShowtimesCard'

export const ShowTimesCollection = () => {
  const { currentLocation, filterMovieByCategory } = useShowTimeContext()

  // Thay đổi địa điểm (location) hoặc thể loại (category) phim thì sẽ get lại dữ liệu

  // const [searchParams] = useSearchParams()

  // const currentCategory = searchParams.get('category') || 'All'

  const { data: dataMovies, isLoading } = useQuery({
    queryKey: ['ALL_MOVIES', currentLocation],
    queryFn: () => getAllMovie()
    // enabled: currentCategory === 'All'
  })

  if (isLoading) {
    return (
      <HashLoader
        cssOverride={{ display: 'block', margin: '4.8rem auto' }}
        color="#eb3656"
      />
    )
  }

  const listDataMovieId = dataMovies.map((movie) => movie._id)

  const listMovieId =
    filterMovieByCategory.length === 0 ? listDataMovieId : filterMovieByCategory

  // Lần đầu map dựa vào danh sach phim, nếu filter theo category thì map theo id
  return (
    <section className="section-showtimes">
      <div className="showtimes-collection container">
        {listMovieId.map((movieId, idx) => {
          return <ShowtimesCard key={idx} movieId={movieId} />
        })}
      </div>
    </section>
  )
}

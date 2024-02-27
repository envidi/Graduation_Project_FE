import { CollectionCard } from '../../../components/CollectionCard'
import { useQuery } from '@tanstack/react-query'
import { getRelateMovie } from '@/api/movie'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './slider.css'
import { Navigation } from 'swiper/modules'
import { FreeMode } from 'swiper/modules'
import 'swiper/css/free-mode'
// import Carousel from '@/components/CardCarousel/CardCarousel'
import HashLoader from 'react-spinners/HashLoader'
import { checkSlidePerView } from '@/utils'
import { MovieType } from '@/Interface/movie'
// import axios from 'axios'
// import HashLoader from 'react-spinners/HashLoader'
// import { useParams } from 'react-router-dom'

export const MovieInfoCollection = () => {
  const id = useParams()
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: ['MOVIE_RELATED', id],
    queryFn: () => getRelateMovie('65c8dc874a19975a1cc5fc7e')
  })
  const override = {
    display: 'block',
    margin: '4.8rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
<<<<<<< HEAD
  // const dataMovie = [1, 2, 3]
  // const { name, image, rate, categoryCol, fromDate, showTimeCol } =
  //   dataMovie
  // const [swiperRef, setSwiperRef] = useState<>(null)

  // const { id } = useParams()
  // const [movieData, setMovieData] = useState([])
  // const [loading, setLoading] = useState(false)

  // const movieDetailsId = Number(id)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)
  //     try {
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_API_URL}/otherMovies`,
  //         {
  //           movieDetailsId,
  //         }
  //       )
  //       setMovieData(response.data)
  //     } catch (err) {
  //       console.error(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [movieDetailsId])
=======
>>>>>>> 6321283d0233e3c02d819f0d3fd80d2d2b72cdf2

  // const latestMoviesCards = movieData.map((latestMovie, idx) => {
  //   return (
  //     idx < 6 && (
  //       <CollectionCard
  //         key={latestMovie.id}
  //         {...latestMovie}
  //         signedPerson={signedPerson}
  //         handleLoginState={handleLoginState}
  //         currentMovieDetails={currentMovieDetails}
  //       />
  //     )
  //   )
  // })

  return (
    <section className="section-movie-info-collection">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Find other movies &rarr;
        </h1>
      </div>

      <div className="details-collection-container">
        <Swiper
<<<<<<< HEAD
          slidesPerView={
            dataMovie?.length > 0
              ? dataMovie.length
              : dataMovie?.length > 5
                ? 5
                : dataMovie?.length
          }
=======
          slidesPerView={5}
>>>>>>> 6321283d0233e3c02d819f0d3fd80d2d2b72cdf2
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true
          }}
          navigation={true}
          breakpoints={{
            // when window width is >= 320px
            '350': {
              slidesPerView: 1,
              spaceBetween: 1
            },
            '500': {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 480px
            '600': {
              slidesPerView:
                dataMovie?.length > 0
                  ? dataMovie.length
                  : dataMovie?.length > 5
                    ? 2
                    : dataMovie?.length,
              spaceBetween: 20
            },
            // when window width is >= 600px
            '730': {
              slidesPerView:
                dataMovie?.length > 0
                  ? dataMovie.length
                  : dataMovie?.length > 5
                    ? 3
                    : dataMovie?.length,
              spaceBetween: 10
            },
            '950': {
              slidesPerView:
                dataMovie?.length > 0
                  ? dataMovie.length
                  : dataMovie?.length > 5
                    ? 4
                    : dataMovie?.length,
              spaceBetween: 20
            },
            // when window width is >= 640px
            '1024': {
              slidesPerView:
                dataMovie?.length > 0
                  ? dataMovie.length
                  : dataMovie?.length > 5
                    ? 4
                    : dataMovie?.length,
              spaceBetween: 40
            },
            // when window width is >= 640px
            '1240': {
              slidesPerView:
                dataMovie?.length > 0
                  ? dataMovie.length
                  : dataMovie?.length > 5
                    ? 5
                    : dataMovie?.length,
              spaceBetween: 15
            },
            // when window width is >= 640px
            '1280': {
              slidesPerView: checkSlidePerView(dataMovie, 5),
              spaceBetween: 10
            }
          }}
          modules={[FreeMode, Navigation]}
          className="mySwiper ps-2 xs:py-5 sm:py-0 sm:block xs:hidden"
          // onSlideChange={setSwiperRef}
        >
          {dataMovie?.map((movie: MovieType, index: number) => {
            // const {
            //   _id,
            //   name,
            //   image,
            //   rate,
            //   categoryCol,
            //   fromDate,
            //   showTimeCol
            // } = dataMovie
            return (
              <SwiperSlide key={index}>
                <CollectionCard
                  movie={movie}
                  className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem]"
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        {/* ------------------------------------------------------------------------- */}
        {/* <Carousel className="xs:block sm:hidden">
          {[...new Array(10)].map((_, i) => (
            <CollectionCard
              key={i}
              className="md:w-[26rem] sm:w-[28rem] xs:w-[26rem]"
            />
          ))}
        </Carousel> */}
      </div>
    </section>
  )
}
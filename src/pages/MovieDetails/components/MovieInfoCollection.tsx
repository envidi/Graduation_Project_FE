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
import Carousel from '@/components/CardCarousel/CardCarousel'
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

  return (
    <section className="section-movie-info-collection bg-background-secondary">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary border-b-4 border-primary-movieColor ">
          Find other movies &rarr;
        </h1>
      </div>

      <div className="details-collection-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true
          }}
          navigation={true}
          breakpoints={{
            // when window width is >= 320px
            350: {
              slidesPerView: 1,
              spaceBetween: 1
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 480px
            600: {
              slidesPerView: checkSlidePerView(dataMovie, 2),
              spaceBetween: 20
            },
            // when window width is >= 600px
            730: {
              slidesPerView: checkSlidePerView(dataMovie, 3),
              spaceBetween: 10
            },
            950: {
              slidesPerView: checkSlidePerView(dataMovie, 4),
              spaceBetween: 20
            },
            // when window width is >= 640px
            1024: {
              slidesPerView: checkSlidePerView(dataMovie, 4),
              spaceBetween: 40
            },
            // when window width is >= 640px
            1240: {
              slidesPerView: checkSlidePerView(dataMovie, 5),
              spaceBetween: 15
            },
            // when window width is >= 640px
            1280: {
              slidesPerView: checkSlidePerView(dataMovie, 5),
              spaceBetween: 40
            }
          }}
          modules={[FreeMode, Navigation]}
          className="mySwiper ps-2 xs:py-5 sm:py-0 sm:block xs:hidden"
          // onSlideChange={setSwiperRef}
        >
          {dataMovie?.map((movie: MovieType, index: number) => {
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
        <Carousel className="xs:block sm:hidden">
          {dataMovie?.map((movie: MovieType, i: number) => (
            <CollectionCard
              key={i}
              movie={movie}
              className="md:w-[26rem] sm:w-[28rem] xs:w-[26rem]"
            />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

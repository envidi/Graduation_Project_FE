// import { useEffect, useState } from 'react'
import { CollectionCard } from '../../../components/CollectionCard'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './slider.css'
import { Navigation } from 'swiper/modules'
import { FreeMode } from 'swiper/modules'
import 'swiper/css/free-mode'
// import axios from 'axios'
// import HashLoader from 'react-spinners/HashLoader'
// import { useParams } from 'react-router-dom'

export const MovieInfoCollection = () => {
  const [swiperRef, setSwiperRef] = useState<any>(null)


  // const { id } = useParams()
  // const [movieData, setMovieData] = useState([])
  // const [loading, setLoading] = useState(false)
  // const override = {
  //   display: 'block',
  //   margin: '4.8rem auto',
  // }
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
          slidesPerView={5}
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
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 600px
            '730': {
              slidesPerView: 3,
              spaceBetween: 10
            },
            '950': {
              slidesPerView: 4,
              spaceBetween: 20
            },
            // when window width is >= 640px
            '1024': {
              slidesPerView: 4,
              spaceBetween: 40
            },
            // when window width is >= 640px
            '1240': {
              slidesPerView: 5,
              spaceBetween: 15
            },
            // when window width is >= 640px
            '1280': {
              slidesPerView: 5,
              spaceBetween: 40
            }
          }}
          modules={[FreeMode, Navigation]}
          className="mySwiper ps-2"
          onSlideChange={setSwiperRef}
        >
          <SwiperSlide>
            <CollectionCard className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem]" />
          </SwiperSlide>
          <SwiperSlide>
            <CollectionCard className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem]" />
          </SwiperSlide>
          <SwiperSlide>
            <CollectionCard className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem]" />
          </SwiperSlide>
          <SwiperSlide>
            <CollectionCard className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem]" />
          </SwiperSlide>
          <SwiperSlide>
            <CollectionCard className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem]" />
          </SwiperSlide>
          <SwiperSlide>
            <CollectionCard className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem]" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

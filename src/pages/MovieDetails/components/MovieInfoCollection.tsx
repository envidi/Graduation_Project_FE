import { CollectionCard } from '../../../components/CollectionCard'
import { useQuery } from '@tanstack/react-query'
import { getRelateMovie } from '@/api/movie'
import { useParams } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
// import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './slider.css'
import 'swiper/css/free-mode'
import Carousel from '@/components/CardCarousel/CardCarousel'
import HashLoader from 'react-spinners/HashLoader'
import { MovieType } from '@/Interface/movie'
import SwiperSlider from '@/components/SwiperSlide/SwiperSlider'
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

  return (
    <section className="section-movie-info-collection bg-background-secondary">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary border-b-4 border-primary-movieColor ">
          Find other movies &rarr;
        </h1>
      </div>

      <div className="details-collection-container after:opacity-0 dark:after:opacity-100">
        <SwiperSlider dataMovie={dataMovie} slidePerView={5}>
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
        </SwiperSlider>
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

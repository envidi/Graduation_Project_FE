import SwiperSlider from '@/components/SwiperSlide/SwiperSlider'
import { SwiperSlide } from 'swiper/react'
import { CollectionCard } from '@/components/CollectionCard'
import { MovieType } from '@/Interface/movie'
import { Button } from '@/components/ui/button'
import { useStatusMovie } from '@/hooks/useAllMovie'
import HashLoader from 'react-spinners/HashLoader'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
interface MoviePageItemType {
  status: string
  title: string
}
interface SelectorCate {
  categories: { category: string }
}
function MoviePageItem({ status, title }: MoviePageItemType) {
  const cate_id = useSelector(
    (state: SelectorCate) => state.categories.category
  )
  const item = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1
      },
      x: 0
    }),
    hidden: { x: -100 }
  }
  const list = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4
      }
    },
    hidden: {
      opacity: 0
    }
  }
  const [query, setQuery] = useState({
    status,
    order: 'asc'
  })
  const { data: dataMovie, isLoading } = useStatusMovie(query)
  const [currentMovies, setCurrentMovie] = useState<any>(dataMovie)

  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  const filterCateByMovie =
    dataMovie &&
    dataMovie?.filter((movie: { categoryId: [] }) => {
      const categoryIds = movie.categoryId.map(
        (cate: { _id: string }) => cate._id
      )
      return categoryIds.includes(cate_id)
    })

  useEffect(() => {
    if (dataMovie && cate_id == '') return setCurrentMovie(dataMovie)
    return setCurrentMovie(filterCateByMovie)
  }, [dataMovie, cate_id])

  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }

  const handleSort = (order: string) => {
    setQuery((prev) => {
      const old = { ...prev }
      return {
        ...old,
        order
      }
    })
  }
  console.log(currentMovies)
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="border-b-4 py-3 border-primary-movieColor text-primary-locationMovie  text-4xl font-bold">
          {title}
        </h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className={`rounded-full border-2 text-xl px-10 py-5 hover:border-2 bg-transparent font-bold ${query.order == 'desc' ? 'bg-primary-movieColor' : ''}`}
            onClick={() => handleSort('desc')}
          >
            Newest
          </Button>
          <Button
            variant="outline"
            className={`rounded-full border-2 text-xl px-10 py-5 hover:border-2 bg-transparent font-bold ${query.order == 'asc' ? 'bg-primary-movieColor' : ''}`}
            onClick={() => handleSort('asc')}
          >
            Latest
          </Button>
        </div>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={list}
        key={query.order}
        className="details-collection-container after:opacity-0 dark:after:opacity-100 overflow-hidden rounded-3xl"
      >
        {currentMovies && currentMovies.length > 0 ? (
          <SwiperSlider
            dataMovie={currentMovies}
            slidePerView={currentMovies.length > 4 ? 4 : currentMovies.length}
          >
            {currentMovies?.map((movie: MovieType, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: index * 100, opacity: 0 }}
                    animate="visible"
                    variants={item}
                  >
                    <CollectionCard
                      movie={movie}
                      className="md:w-[30rem] sm:w-[28rem] xs:w-[28rem]"
                    />
                  </motion.div>
                </SwiperSlide>
              )
            })}
          </SwiperSlider>
        ) : (
          <div className="h-96 flex items-center text-3xl text-primary-movieColor font-bold">
            Not found
          </div>
        )}
      </motion.div>
    </>
  )
}

export default MoviePageItem

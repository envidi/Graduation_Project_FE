import useAllFood from '@/hooks/useAllFood'
import FoodItem from './FoodItem'
import HashLoader from 'react-spinners/HashLoader'
import { FoodCollectionType } from '@/Interface/food'


function FoodCollection() {
  const { data, isLoading } = useAllFood()

  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
  return (
    <div className="movie-info-screen-container  sm:w-full xs:w-full ">
      <div className="food-info-screen-container bg-gray-100 shadow-xl dark:shadow-none border-2 border-border-calendarBorder dark:border-none dark:bg-background-third grid md:px-8 lg:px-14 sm:px-16 xs:px-12">
        <h2 className="showtimes-screen bg-background-headerShow shadow-lg dark:shadow-2xl text-primary-locationMovie">
          Menu
        </h2>
        {data &&
          data?.map((food:FoodCollectionType) => {
            return <FoodItem key={food._id} food={food} />
          })}
      </div>
    </div>
  )
}

export default FoodCollection

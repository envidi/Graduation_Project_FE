import useAllFood from '@/hooks/useAllFood'
import FoodItem from './FoodItem'
import HashLoader from 'react-spinners/HashLoader'
import { FoodCollectionType } from '@/Interface/food'
import { useDispatch, useSelector } from 'react-redux'
import { foodsAction } from '@/store/food'
import { useEffect } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { TicketType } from '@/store/ticket'

function FoodCollection() {
  const dispatch = useDispatch()
  const { data, isLoading } = useAllFood()
  const foods = useSelector((state: any) => state.foods.foods)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')

  useEffect(() => {
    if (!data || data.length == 0) return
    const newData = data.map((f: any) => {
      return {
        _id: f._id,
        name: f.name,
        price: f.price,
        image: f.image,
        quantity: 0
      }
    })

    if (ticket.foods) {
      const combiData = [...ticket.foods]
      console.log('...newData',...newData)
      console.log('...ticket.foods',...ticket.foods)
      dispatch(foodsAction.fetchData(combiData))
      return
    }

    dispatch(foodsAction.fetchData(newData))
  }, [data, dispatch])

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
        {/* {foods
          ? foods?.map((food: FoodCollectionType, index: number) => {
              return <FoodItem key={food._id} index={index} food={food} />
            })
          : ticket.foods
            ? ticket.foods.map((food: any, index: number) => {
                return <FoodItem key={food._id} index={index} food={food} />
              })
            : []} */}
        {foods &&
          foods?.map((food: FoodCollectionType, index: number) => {
            return <FoodItem key={food._id} index={index} food={food} />
          })}
      </div>
    </div>
  )
}

export default FoodCollection

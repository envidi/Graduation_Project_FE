import { FoodItemState } from '@/Interface/food'
import { SeatUserList } from '@/Interface/ticket'

export const filterSeat = (data: SeatUserList[]) => {
  return filterData(data, (s: SeatUserList) => s.selected).reduce(
    (acc: number, s: SeatUserList) => {
      return s.price + acc
    },
    0
  )
}
export const filterFood = (foods: FoodItemState[]) => {
  if (!foods) return
  return filterData(foods, (food: FoodItemState) => food.quantity > 0).reduce(
    (acc: number, s: FoodItemState) => {
      return s.price * s.quantity + acc
    },
    0
  )
}

export const filterData = (
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  data: any[] | null | undefined,

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  condition: (item: any) => boolean
) => {
  if (!data) return []
  return data.filter(condition)
}
export const getNameSeat = (
  data: SeatUserList[] | null | undefined,
  character: string
) => {
  return filterData(data, (seat) => seat.selected)
    .map((seat) => seat.name)
    .join(character)
}

export const mapData = (data: SeatUserList[] | null | undefined) => {
  if (!data) return
  const filteredData = data.filter((seat: SeatUserList) => seat.selected)
  return filteredData.map((seat: SeatUserList) => seat._id)
}

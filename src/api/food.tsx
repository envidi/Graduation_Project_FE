import instance from './config'
import { Food } from '@/admin/types/food'
// export const getAllFood = async () => {
//   const result = await instance.get('/food')
//   return result.data.datas.docs
// }
export const getAllFood = async () => {
  const result = await instance.get('/food')
  return result.data.datas
}

export const getFoodById = async (id: string) => {
  const result = await instance.get('/food/' + id)
  return result.data.datas as Food
}


//admin
export const addFood = async (food: Food) => {
  const result = await instance.post('/food', food)
  return result.data
}
export const editFood = async (food: Food, id: string) => {
  const result = await instance.patch(`/food/${id}`, food)
  return result.data
}
export const removeFood = async (id: string) => {
  const result = await instance.delete(`/food/${id}`)
  return result.data
}

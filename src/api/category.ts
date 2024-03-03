import { Category } from '@/admin/types/category'
import instance from './config'

export const getAllCategory = async () => {
  const result = await instance.get('/category')
  return result.data.data
}
export const getMovieByCategory = async (categoryId: string) => {
  const result = await instance.get('/category/query?id=' + categoryId)
  return result.data.data as Category[]
}

// admin

//remove category
export const removeCategory = async (id: string) => {
  const result = await instance.delete(`/category/${id}`)
  return result.data
}

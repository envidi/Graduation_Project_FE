import { baseShowtimes } from './baseAuth'
import instance from './config'
export const getOneShowtime = async (id: string) => {
  if (!id) return []
  const result = await instance.get('/showtimes/' + id)
  return result.data.response.docs
}

export const getAllShowTimes = () => {
  return baseShowtimes.get('/')
}
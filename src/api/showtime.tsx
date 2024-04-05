import axios from 'axios'
import instance from './config'
import { baseShowtimes } from './baseAuth'
export const getOneShowtime = async (id: string) => {
  if (!id) return []
  const result = await instance.get('/showtimes/' + id)
  return result.data.response.docs
}
export const getAllShowTimes = async () => {
  const result = await baseShowtimes.get('/')
  return result
}

export const CreateShowtimes = async (showtime:any) => {
  const result = await baseShowtimes.post('/', showtime)
  return result
}
export const DeleteShowtimes = async (id:any) => {
  const result = await baseShowtimes.delete(`/${id}`)
  return result
}
export const updateShowtimes = async (showtime:any) => {
  const result = await baseShowtimes.patch(`/${showtime._id}`, showtime)
  return result
}

export const DetailShowtimes = async (id:any) => {
  const result = await baseShowtimes.get(`/${id}` )
  return result
}
export const getShowtimesById = async (id:string) => {
  try {
    const response = await axios.get(`/showtimes/${id}`); // Replace with your actual API endpoint for fetching cinema data
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch cinema data');
  }
};

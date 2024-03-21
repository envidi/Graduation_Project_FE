import instance from './config'

export const getAllShowTimes = async () => {
  const result = await instance.get('/showtimes')
  return result.data.datas.docs
}
import axios from 'axios';

export const getShowtimesById = async (id:string) => {
  try {
    const response = await axios.get(`/showtimes/${id}`); // Replace with your actual API endpoint for fetching cinema data
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch cinema data');
  }
};

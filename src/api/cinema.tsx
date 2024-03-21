import instance from './config'

export const getAllCinema = async () => {
  const result = await instance.get('/cinema')
  return result.data.data.docs
}
import axios from 'axios';

export const getCinemaById = async (id:string) => {
  try {
    const response = await axios.get(`/cinema/${id}`); // Replace with your actual API endpoint for fetching cinema data
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch cinema data');
  }
};

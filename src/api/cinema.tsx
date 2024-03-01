import instance from './config'

export const getAllCinema = async () => {
  const result = await instance.get('/cinema')
  return result.data.data.docs
}


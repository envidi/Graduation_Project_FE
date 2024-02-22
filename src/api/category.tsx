import instance from './config'

export const getAllCategory = async () => {
  const result = await instance.get('/category')
  return result.data.data
}

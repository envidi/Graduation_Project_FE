import instance from './config'

export const getAllCategory = async () => {
  const result = await instance.get('/category')
  return result.data.data
}
export const getMovieByCategory = async (categoryId: string) => {
  const result = await instance.get('/category/query?id=' + categoryId)
  return result.data.data
}

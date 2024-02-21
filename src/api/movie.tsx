import instance from './config'

export const getOneMovie = async (id:string) => {
  const result = await instance.get('/movie/'+id)
  return result.data.data
}
export const getRelateMovie = async (id:string) => {
  const result = await instance.get('/movie/movieByCate/'+id)
  return result.data.data
}



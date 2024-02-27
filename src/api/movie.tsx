import instance from './config'

export const getOneMovie = async (id:string) => {
  const result = await instance.get('/movie/'+id)
  return result.data.data
}
<<<<<<< HEAD
export const getRelateMovie = async (id:string) => {
  const result = await instance.get('/movie/movieByCate/'+id)
=======
export const getAllMovieHome = async () => {
  const result = await instance.get('/movie/home')
  return result.data.data.docs
}
export const getAllMovie = async () => {
  const result = await instance.get('/movie')
  return result.data.data.docs
}
export const searchMovie = async (search: string) => {
  try {
    const result = await instance.get('/movie/search?q=' + search)
    return result.data.data.docs
  } catch (error) {
    return error
  }
}
export const getRelateMovie = async (id: string) => {
  const result = await instance.get('/movie/movieByCate/' + id)
>>>>>>> 6321283d0233e3c02d819f0d3fd80d2d2b72cdf2
  return result.data.data
}
import instance from './config'

export interface QueryMovie {
  status: string
  order: string
}

export const getOneMovie = async (id: string) => {
  const result = await instance.get('/movie/' + id)
  return result.data.data
}
export const getAllMovieHome = async () => {
  const result = await instance.get('/movie')
  return result.data.data.docs
}
export const getMovieStatus = async (query: QueryMovie) => {
  let result
  if (query.status == '') {
    result = await instance.get('/movie/sta?_order=' + query.order)
    return result.data.data.docs
  } else {
    result = await instance.get(
      `/movie/sta?status=${query.status}&_order=${query.order}`
    )
    return result.data.data.docs
  }
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
  return result.data.data
}

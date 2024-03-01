import instance from './config'

export const getOneSeat = async (id: string) => {
  const result = await instance.get('/seat' + id)
  return result.data.data
}

export const getAllSeat = async () => {
  const result = await instance.get('/seat')
  return result.data.data.docs
}


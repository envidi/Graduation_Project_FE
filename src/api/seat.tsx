import instance from './config'

export const getOneSeat = async (id: string) => {
  const result = await instance.get('/seat' + id)
  return result.data.data
}

export const getAllSeat = async (id: { _hallId: string; _showId: string }) => {
  const result = await instance.get(
    `/seat?_hallId=${id._hallId}&_showId=${id._showId}`
  )
  return result.data.datas.docs
}

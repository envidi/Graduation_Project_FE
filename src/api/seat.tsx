import { Seat } from '@/admin/types/seat'
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

//admin
export const addSeat = async (seat: Seat) => {
  const result = await instance.post('/seat', seat)
  return result.data
}

export const removeSeat = async (id: string) => {
  const result = await instance.delete(`/seat/${id}`)
  return result.data
}

export const editSeat = async (seat: Seat, id: string) => {
  const result = await instance.patch(`/seat/${id}`, seat)
  return result.data
}

import instance from './config'
interface FoodTicket {
  foodId: string
  quantityFood: string
}
export interface TicketCreateType {
  ticket_id?: string | undefined
  priceId?: string | undefined
  seatId?: string[] | undefined
  foods?: FoodTicket[] | undefined
  showtimeId?: string | undefined
}
export const checkoutTicket = async (data: TicketCreateType) => {
  const result = await instance.post('/ticket', data)
  return result.data.data
}

export const updateTicket = async (data: TicketCreateType) => {
  const { ticket_id, ...other } = data
  const result = await instance.patch(`/ticket/status/${ticket_id}`, other)
  return result.data.data
}
export const updateTicketSeat = async (data: TicketCreateType) => {
  const { ticket_id, ...other } = data
  const result = await instance.patch(`/ticket/${ticket_id}`, other)
  return result.data.data
}
export const deleteTicket = async (data: TicketCreateType) => {
  const { ticket_id } = data
  const result = await instance.delete(`/ticket/delete/${ticket_id}`)
  return result.data.data
}

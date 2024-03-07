import { FoodItemState } from '@/Interface/food'
import { SeatUserList } from '@/Interface/ticket'
import { createSlice } from '@reduxjs/toolkit'

interface TicketAction {
  payload: TicketType
}
export interface PaymentSelected{
  _id : number
  name : string
}

export interface TicketType {
  id_showtime?: string
  id_movie?: string
  hall_name?: string
  hall_id?: string
  image_movie?: string
  name_movie?: string
  duration_movie?: number
  time_from?: string
  cinema_name?: string
  seat?: SeatUserList[] | null
  price_movie?: number
  foods?: FoodItemState[]
  ticketAmount?: number
  total?: number
  paymentMethod?: {
    _id: number
    name: string
  }
}
export interface TicketState {
  ticket: TicketType
}
interface TicketSeatItemType {
  name: string
  _id: string
  price: number
  typeSeat: string
  status: string
  row: number
  column: number
  selected: boolean
}
interface TicketSeatType {
  payload: TicketSeatItemType[]
}

const ticketInitialState: TicketState = {
  ticket: {
    id_showtime: '',
    id_movie: '',
    hall_name: '',
    hall_id: '',
    image_movie: '',
    name_movie: '',
    duration_movie: 0,
    time_from: '',
    cinema_name: '',
    seat: [],
    price_movie: 0,
    foods: [],
    ticketAmount: 0,
    total: 0,
    paymentMethod: {
      _id: 0,
      name: ''
    }
  }
}

const ticket = createSlice({
  name: 'ticket',
  initialState: ticketInitialState,
  reducers: {
    fetchSeat(state: TicketState, action: TicketSeatType) {
      state.ticket = {
        ...state.ticket,
        seat: [...action.payload]
      }
    },
    choosePayment(
      state: TicketState,
      action: { payload: PaymentSelected }
    ) {
      state.ticket = {
        ...state.ticket,
        paymentMethod: { ...action.payload }
      }
    },
    addProperties(state: TicketState, action: TicketAction) {
      state.ticket = {
        ...state.ticket,
        ...action.payload
      }
    }
  }
})

export const ticketAction = ticket.actions

export default ticket

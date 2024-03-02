
import { createSlice } from '@reduxjs/toolkit'

interface TicketAction {
  payload: TicketType
}

interface TicketType {
  id_showtime: string
  id_movie: string
  hall_name: string
  hall_id : string
}
interface TicketState {
  ticket: TicketType
}

const ticketInitialState: TicketState = {
  ticket: {
    id_showtime: '',
    id_movie: '',
    hall_name: '',
    hall_id : ''
  }
}

const ticket = createSlice({
  name: 'ticket',
  initialState: ticketInitialState,
  reducers: {
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

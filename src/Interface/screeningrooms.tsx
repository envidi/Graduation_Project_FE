import Showtimes from './Showtimes'
import Cinema from './cinema'
export interface Screeningrooms {
  _id: string
  name: string
  NumberSeat: number
  projector: string
  CinemaId: Cinema,
  // CinemaName:string,
  // CinemaAdress:string,
  ShowtimesId: Showtimes[],
  // timeTo:string,
  // timeFrom:string
  status: string
  destroy: boolean
  createdAt: string
  updatedAt: string
}

export interface AddandEditRooms {
  // _id: string
  name: string
  projector: string
  CinemaId: string
  CinemaAdress: string
  // ShowtimesId: Showtimes
  // CinemaName:string,
  // CinemaAdress:string,
  // timeTo:string,
  // timeFrom:string
 
}


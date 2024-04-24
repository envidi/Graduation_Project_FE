import { Seat } from "@/admin/types/seat"
import { Data } from "./movieDetail"



export interface Screeningrooms {
  _id?: string
  name: string
  NumberSeat: number
  // ShowtimesId?: string[]
  projector: string
  // CinemaId: Cinema,
  CinemaId: string
  ShowtimesId: Showtimes[]
  status: string
  destroy: boolean
  createdAt: string
  updatedAt: string
}

export interface Showtimes{
  _id: string
  screenRoomId:string
  movieId: Data
  date:string
  timeFrom: string
  timeTo:string
  status: string
  SeatId: Seat
  destroy: boolean
  createdAt: string
  updatedAt: string
}

export interface AddandEditRooms {
  name: string
  NumberSeat:number
  projector: string
<<<<<<< HEAD
 
=======
  NumberSeat: number
  // CinemaId: string
  // status: string
>>>>>>> 4d26298a8521ef7b0b4cd3356069c61082781560
  // ShowtimesId: string
  // CinemaId:CinemaRooms
  // ShowtimesId: ShowTimeRooms
}


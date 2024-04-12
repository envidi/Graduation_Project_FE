import Price from "./MoviePrice"
import Showtimes from "./Showtimes"
import Cinema from "./cinema"
import { Food} from "./food"
import { MovieType } from "./movie"
import Payment from "./payment"


import { Screeningrooms } from "./screeningrooms"
import Seat from "./seat"

import User from "./user"

export interface PaymentType {
  _id: number
  image: string
  cardNumber: number
  value: string
  name: string
}
export interface TicketSelectorChild {
  ticket: {
    seat: SeatUserList[]
    paymentMethod: PaymentType
  }
}

export interface TicketSelector {
  ticket: TicketSelectorChild
}
export interface SeatUserList {
    _id: string
    name: string
    typeSeat : string
    status : string
    price : number
    selected : boolean
    row: number,
    column: number
  }

export interface Ticket{  
    _id:string,
    movieId:MovieType,
    priceId:Price,
    seatId:Seat[],
    userId:User, 
    cinemaId:Cinema,
    screenRoomId:Screeningrooms,
    foods:Food[],
    showtimeId:Showtimes,
    quantity:number,
    totalPrice:number,
    status:string,
    isDeleted:boolean,
    paymentId:Payment,
    createdAt:string,
    updatedAt:string
}

// export interface Ticket{  
//   _id?:string,
//   movieId:string,
//   priceId:string,
//   seatId:string,
//   userId:string, 
//   cinemaId:string,
//   screenRoomId:string,
//   foods:string,
//   showtimeId:string,
//   quantity:number,
//   totalPrice:number,
//   paymentId:string,
//   status:string,
//   isDeleted:boolean, 
//   createdAt:string,
//   updatedAt:string
// }
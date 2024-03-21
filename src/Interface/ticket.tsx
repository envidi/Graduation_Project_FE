import Showtimes from "./Showtimes"
import Cinema from "./cinema"
import { MovieType } from "./movie"
import { Screeningrooms } from "./screeningrooms"

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
    priceId:string,
    seatId:string[],
    userId:string,
    movieId:MovieType,
    cinemaId:Cinema,
    screenRoomId:Screeningrooms,
    foods:string,
    showtimeId:Showtimes[],
    quantity:number,
    totalPrice:number,
    status:string,
    isDeleted:boolean,
    paymentId:string,
    createdAt:string,
    updatedAt:string

}
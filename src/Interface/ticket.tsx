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
  typeSeat: string
  status: string
  price: number
  selected: boolean
  row: number
  column: number
}
export interface TicketFoodBill {
  _id: string
  quantityFood: number
  name: string
  price: number
}
export interface TicketSeatBill{
  _id: string
  typeSeat: string
  price: number
  row: number
  column: number
}
export interface TicketBill {
  _id: string
  priceId: {
    _id: string
    movieId: string
    price: number
  }
  seatId: TicketSeatBill[]
  userId: string
  movieId: {
    _id: string
    name: string
    image: string
    categoryId: {
      _id: string
      name: string
    }[]
  }
  cinemaId: {
    _id: string
    CinemaName: string
    CinemaAdress: string
  }
  screenRoomId: {
    _id: string
    name: string
  }
  foods: TicketFoodBill[]
  showtimeId: {
    timeFrom: string
  }
  quantity: number
  totalPrice: number
  status: string
  createdAt: string
  paymentId: {
    _id: string
    typeBank: string
    typePayment: string
  }
}
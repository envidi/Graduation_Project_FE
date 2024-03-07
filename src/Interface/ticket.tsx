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

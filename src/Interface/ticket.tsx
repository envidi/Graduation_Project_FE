export interface TicketSelectorChild {
  ticket: {
    seat: SeatUserList[]
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

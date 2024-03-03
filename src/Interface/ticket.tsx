export interface TicketSelectorChild {
  ticket: {
    seat: SeatUserList[]
  }
}
export interface TicketSelector {
  ticket: TicketSelectorChild
}
export interface SeatUserList {
    id: string
    name: string
    price : number
  }

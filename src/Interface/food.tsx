interface TicketId {
    _id?: string,
    name?: string
}

interface FoodType {
    _id: number
    name: string
    price: number
    image: string
    ticketId?: TicketId[]
}
export default FoodType
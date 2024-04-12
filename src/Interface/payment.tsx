import { Ticket } from "./ticket"

export default interface Payment{
    _id:string,
    amount:number,
    typeBank:string,
    typePayment:string,
    ticketId:Ticket,
    createdAt: string,
    updatedAt: string
}
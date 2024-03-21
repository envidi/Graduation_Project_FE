
import { Ticket } from "@/Interface/ticket"
import instance from "./config"

export const getAllTikets = async () => {
    const result = await instance.get('/ticket')
    console.log(result)
    return result.data.data.docs
    
}
export const deleteTicket  = async (id: string) => {
    const result = await instance.delete(`/ticket/${id}`)
    return result.data.datas
}

export const newTickets= async (ticket:Ticket)=>{
    const result= await instance.post(`/ticket`,ticket);
    return result.data.datas
}
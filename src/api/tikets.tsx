

import instance from "./config"

export const getAllTikets = async () => {
    const result = await instance.get('/ticket')
    console.log(result)
    return result.data.data.docs    
}
export const getOneTikets = async (id:string) => {
    const result = await instance.get(`/ticket/${id}`)
    console.log(result)
    return result.data.data  
}
export const deleteTicket  = async (id: string) => {
    const result = await instance.delete(`/ticket/${id}`)
    return result.data.datas
}


import { AddandEditRooms, Screeningrooms } from '@/Interface/screeningrooms'
import instance from '@/api/config'



// export const getAllRooms = async () => {
//     try {
//         const result  = await instance.get('/screen')
//         console.log(result)
//         return result.data.datas.docs
        
//     } catch (error) {
//         console.log('FETCH_ROOMS_ERROR', error)
//     }
// }
// export const getOneRooms = async (_id: string) => {
//     try {
//         const result = await instance.get(`/screen/${_id}`)
//         console.log(result)
//         return result.data.datas.docs
//     } catch (error) {
//         console.log('FETCH_ROOMS_ERROR', error)
//     }
// }
// export const newRooms = async (rooms: Screeningrooms) => {
//     try {
//         const result = await instance.post('/screen', rooms)
//         console.log(result)
//         return result.data.datas.docs
    
//     } catch (error) {
//         console.log('ADD_ROOMS_ERROR', error)
//     }
// }
// export const editRooms = async (rooms: Screeningrooms) => {
//     try {
//         const result = await instance.patch('/screen/' + rooms._id, rooms)
//         console.log(result)
//         return result.data.datas.docs
//     } catch (error) {
//         console.log('PATCH_ROOMS_ERROR', error)
//     }
// }
// export const deleteRooms     = async (_id: string ) => {
//     try {
//         const result = await instance.delete('/screen/' + _id)
//         console.log(result)
//         return result.data.datas.docs
//     } catch (error) {
//         console.log('DELETE_ROOMS_ERROR', error)
//     }
// }

export const getAllRooms = async () => {
    const result = await instance.get('/screen')
    
    return result.data.datas
    
}
  
export const getOneRooms = async (id: string) => {
    const result = await instance.get(`/screen/${id}` )
    return result.data.datas as Screeningrooms
  }

export const deleteRooms  = async (id: string) => {
    const result = await instance.delete(`/screen/${id}`)
    return result.data.datas
}
export const newRooms = async (rooms: AddandEditRooms) => {
    console.log(rooms)
      const response = await instance.post("/screen", rooms);
      
      return response.data;
};


export const editRooms = async (rooms:AddandEditRooms, id: string) => {
    const result = await instance.patch(`/screen/${id}`, rooms)
    return result.data.datas
  }

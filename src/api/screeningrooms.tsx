import { AddandEditRooms, Screeningrooms } from '@/Interface/screeningrooms'
import instance from '@/api/config'

export const getAllRooms = async () => {
    const result = await instance.get('/screen/')
    
    return result.data.datas.docs
    
}
export  const getAllRoomsDestroy = async() => {
  try {
    const result = await instance.get(`/screen/destroy`);
    console.log(result)
    return result.data.datas.docs;
  } catch (error) {
    console.error('Error while performing soft delete:', error);
    throw error;
  }
}
export const getOneRooms = async (id: string) => {
    const result = await instance.get(`/screen/${id}` )
    return result.data.datas as Screeningrooms
  }

export const HarddeleteRooms  = async (id: string) => {
    const result = await instance.delete(`/screen/${id}`)
    return result.data.datas
}
export const SoftDeleteRooms = async (id: string) => {
  try {
    const result = await instance.patch(`/screen/${id}/soft`, { data: {  destroy: true } });
    return result.data.datas;
  } catch (error) {
    console.error('Error while performing soft delete:', error);
    throw error;
  }
};
export const undoSoftDeleteRooms = async (id: string) => {
  try {
    const result = await instance.patch(`/screen/${id}/restore`, { data: { destroy: true } });
    return result.data.datas;
  } catch (error) {
    console.error('Error while performing undo soft delete:', error);
    throw error;
  }
};
export const newRooms = async (rooms: AddandEditRooms) => {
    console.log(rooms)
      const response = await instance.post("/screen", rooms);
       return response.data;
};


export const editRooms = async (rooms:AddandEditRooms,id:string) => {
    const result = await instance.patch(`/screen/${id}`, rooms)
    return result.data.datas
  }

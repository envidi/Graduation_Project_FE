import { Screeningrooms } from "./screeningrooms";
import { TimeSlot } from "./timeslots";


export interface Seat{
    _id ?:number | string;
    typeSeat:string,
    price:number,
    row:number,
    column:number,
    status:number,
    ScreeningRoomId: Screeningrooms[],
    ShowScheduleId:string[],
    TimeSlotId:TimeSlot[],
    createdAt: string
    updatedAt: string

    
}
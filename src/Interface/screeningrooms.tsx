import { TimeSlot } from './timeslots'

export interface Screeningrooms {
  _id?: string
  name: string
  NumberSeat: number
  projector: string
  CinemaId: string[]
  TimeSlotId: TimeSlot[]
  status: string
  destroy: boolean
  createdAt: string
  updatedAt: string
}



 
export interface Screeningrooms {
  _id?: string
  name: string
  NumberSeat: number
  projector: string
  // CinemaId: Cinema,
  CinemaId:string
  // ShowtimesId: Showtimes[]
  status: string
  destroy: boolean
  createdAt: string
  updatedAt: string
}

export interface AddandEditRooms {
  name: string
  NumberSeat:number
  projector: string
 
  // ShowtimesId: string
  // CinemaId:CinemaRooms
  // ShowtimesId: ShowTimeRooms
}


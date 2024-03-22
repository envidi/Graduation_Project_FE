export default interface Showtimes{
    _id: string,
                screenRoomId: string[],
                movieId:string[],
                date:string,
                timeFrom: string,
                timeTo: string,
                status: string,
                SeatId: string[]
                destroy: boolean,
                createdAt: string
                updatedAt: string
            }

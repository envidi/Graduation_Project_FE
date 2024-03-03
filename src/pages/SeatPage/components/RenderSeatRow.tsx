import { Seat } from '@/Interface/seat'
import RenderSeat from './RenderSeat'
import { SeatUserList } from '@/Interface/ticket'

interface RenderSeatRowType {
  rowSeats: Seat[]
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seat: SeatUserList) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: Seat) => void
  userSeatList: SeatUserList[]
}
function RenderSeatRow({
  rowSeats,
  handleUserSeats,
  handleSeatClick,
  userSeatList
}: RenderSeatRowType) {
  return (
    <div className="row ">
      {rowSeats.map((seat: Seat, index: number) => {
        return (
          <RenderSeat
            key={index}
            seat={seat}
            handleUserSeats={handleUserSeats}
            handleSeatClick={handleSeatClick}
            userSeatList={userSeatList}
          />
        )
      })}
    </div>
  )
}

export default RenderSeatRow

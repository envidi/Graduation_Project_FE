import { Seat } from '@/Interface/seat'
import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'

interface RenderSeatType {
  seat: Seat
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seatId: string) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: Seat) => void
  userSeatList: string[]
}

function RenderSeat({
  seat,
  handleUserSeats,
  handleSeatClick,
  userSeatList
}: RenderSeatType) {
  // let seatStatus = seat.status === 'normal' ? 'booked' : 'available'
  let seatStatus: string
  if (seat.typeSeat == 'VIP') {
    seatStatus = 'vip'
  } else {
    seatStatus = 'available'
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleUserSeats(seat._id)
  }
  return (
    <div
      className={`seat ${seatStatus} lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20`}
      onClick={() => {
        if (seatStatus !== 'booked') {
          handleUserSeats(seat._id)
          handleSeatClick(seat)
        }
      }}
      onTouchEnd={seatStatus !== 'booked' ? handleTouchStart : undefined}
      key={seat._id}
      style={{
        backgroundColor: userSeatList.includes(seat._id) ? '#ef5e78' : ''
      }}
    >
      <span className="uppercase">{convertNumberToAlphabet(seat.row)}</span>
      {seat.column}
    </div>
  )
}

export default RenderSeat

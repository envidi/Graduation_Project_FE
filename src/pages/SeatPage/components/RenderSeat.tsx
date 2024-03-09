import { changeStatusSeat } from '@/utils/seatAlphaIndex'
import { SeatUserList } from '@/Interface/ticket'
import { SOLD } from '@/utils/constant'
import { useState } from 'react'

interface RenderSeatType {
  seat: SeatUserList
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seatId: SeatUserList) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: SeatUserList) => void
}

function RenderSeat({
  seat,
  handleUserSeats,
  handleSeatClick
}: RenderSeatType) {
  const [isClick, setIsClick] = useState(false)
  const status = changeStatusSeat(seat.typeSeat)
  const sold = seat.status == 'Sold' ? 'sold' : ''

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleUserSeats({
      ...seat,
      selected: true
    })
  }

  const handleChooseSeat = () => {
    setIsClick((prev) => !prev)
    if (seat.status !== SOLD) {
      handleUserSeats({
        ...seat,
        selected: isClick ? false : true
      })
      handleSeatClick(seat)
    }
  }
  return (
    <div
      className={`seat ${status} ${sold} ${seat.selected ? 'selected' : ''} lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20 uppercase`}
      onClick={handleChooseSeat}
      onTouchEnd={seat.status !== 'booked' ? handleTouchStart : undefined}
      key={seat._id}
    >
      {seat.name}
    </div>
  )
}

export default RenderSeat

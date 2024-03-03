import { Seat } from '@/Interface/seat'
import {
  changeStatusSeat,
  convertNumberToAlphabet
} from '@/utils/seatAlphaIndex'
import { SeatUserList } from '@/Interface/ticket'
import { SOLD } from '@/utils/constant'

interface RenderSeatType {
  seat: Seat
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seatId: SeatUserList) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: Seat) => void
  userSeatList: SeatUserList[]
}

function RenderSeat({
  seat,
  handleUserSeats,
  handleSeatClick,
  userSeatList
}: RenderSeatType) {
  // let seatStatus = seat.status === 'normal' ? 'booked' : 'available'

  // let seatStatus: string
  // if (seat.typeSeat == 'VIP') {
  //   seatStatus = 'vip'
  // } else {
  //   seatStatus = 'available'
  // }
  const status = changeStatusSeat(seat.typeSeat)
  // console.log(status)
  const sold = seat.status == 'Sold' ? 'sold' : ''

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleUserSeats({ id: seat._id, name: seat.name, price: seat.price })
  }
  const seatIds = userSeatList.map((seat) => seat.id)

  const handleChooseSeat = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (seat.status !== SOLD) {
      handleUserSeats({
        id: seat._id,
        name: target.innerHTML.toUpperCase(),
        price: seat.price
      })
      handleSeatClick(seat)
    }
  }
  return (
    <div
      className={`seat ${status} ${sold} lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20 uppercase`}
      onClick={handleChooseSeat}
      onTouchEnd={seat.status !== 'booked' ? handleTouchStart : undefined}
      key={seat._id}
      style={{
        backgroundColor: seatIds.includes(seat._id) ? '#ef5e78' : ''
      }}
    >
      {convertNumberToAlphabet(seat.row)}
      {seat.column}
    </div>
  )
}

export default RenderSeat

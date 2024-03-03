import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'
import { useEffect, useState } from 'react'
import RenderSeatRow from './RenderSeatRow'
import { Seat } from '@/Interface/seat'
import { SeatUserList } from '@/Interface/ticket'
interface RenderSeatLayoutType {
  seats: Seat[]
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seat: SeatUserList) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: Seat) => void
  userSeatList: SeatUserList[]
}

function RenderSeatLayout({
  seats,
  handleUserSeats,
  handleSeatClick,
  userSeatList
}: RenderSeatLayoutType) {
  const [rows, setRows] = useState<Seat[][]>([])

  useEffect(() => {
    if (seats) {
      const seatRows = seats && Math.ceil(seats.length / 8) // Assuming there are 8 seats in each row
      const updatedRows = Array.from({ length: seatRows }, (_, i) => {
        const startIdx = i * 8
        const endIdx = startIdx + 8
        return seats.slice(startIdx, endIdx)
      })
      setRows(updatedRows)
    }
  }, [seats])
  return rows.map((row: Seat[], index: number) => {
    return (
      <div key={index} className="flex items-center w-full">
        <div className="text-3xl uppercase mr-10 text-primary-movieColor font-semibold">
          {convertNumberToAlphabet(row[0].row)}
        </div>
        <RenderSeatRow
          key={index}
          rowSeats={row}
          handleUserSeats={handleUserSeats}
          handleSeatClick={handleSeatClick}
          userSeatList={userSeatList}
        />
      </div>
    )
  })
}

export default RenderSeatLayout

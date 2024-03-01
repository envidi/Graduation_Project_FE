import { useEffect, useState } from 'react'
import RenderSeatRow from './RenderSeatRow'
function RenderSeatLayout({
  seats,
  handleUserSeats,
  handleSeatClick,
  userSeatList
}: any) {
  //   const rows: JSX.Element[] = []
  const [rows, setRows] = useState<any>([])

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

  return rows.map((row: any, index: number) => {
    return (
      <RenderSeatRow
        key={index}
        rowSeats={row}
        handleUserSeats={handleUserSeats}
        handleSeatClick={handleSeatClick}
        userSeatList={userSeatList}
      />
    )
  })
}

export default RenderSeatLayout

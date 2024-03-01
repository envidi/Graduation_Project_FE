import { useEffect, useState } from 'react'

import HashLoader from 'react-spinners/HashLoader'
import { Seat } from '@/Interface/seat'

import useAllSeat from '@/hooks/useAllSeat'
import RenderSeatLayout from './components/RenderSeatLayout'

const SeatPage = () => {
  // const [loading, setLoading] = useState(false)
  // const [seats, setSeats] = useState<Seat[]>([])
  const { data: seats, isLoading: loading } = useAllSeat()
  const [userSeatList, setUserSeatList] = useState<string[]>([])
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null)
  const [showPaymentSidebar, setShowPaymentSidebar] = useState(false)

  const override = {
    display: 'block',
    margin: '1.6rem auto'
  }
  if (loading) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }

  const handleUserSeats = (seatId: string) => {
    setUserSeatList((prevList) =>
      prevList.includes(seatId)
        ? prevList.filter((id) => id !== seatId)
        : [...prevList, seatId]
    )

    if (userSeatList.length === 0) {
      setShowPaymentSidebar(false)
    }
  }

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat)
    setShowPaymentSidebar(true)
  }

  return (
    <div>
      <div className="form-item-heading">Select Seat</div>
      {!loading && (
        <>
          <div className="seat-guide-container">
            <div className="seat-available-demo"></div>
            <p className="seat-status-details">Available</p>
            <div className="seat-booked-demo"></div>
            <p className="seat-status-details">Booked</p>
            <div className="seat-selected-demo"></div>
            <p className="seat-status-details">Selected</p>
            <div className="seat-selected-demo"></div>
            <p className="seat-status-details">Vip</p>
          </div>
          <div className="theatre-screen">
            <div className="screen-1"></div>
            <div className="screen-2"></div>
          </div>
          <div className="theatre-screen-heading">Theatre Screen</div>
          <div className="seat-container">
            {seats && seats.length > 0 && (
              <RenderSeatLayout
                seats={seats}
                userSeatList={userSeatList}
                handleUserSeats={handleUserSeats}
                handleSeatClick={handleSeatClick}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
export default SeatPage

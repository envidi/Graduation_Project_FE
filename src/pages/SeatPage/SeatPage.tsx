import { useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
import { Seat } from '@/Interface/seat'
import { useSelector } from 'react-redux'
import useAllSeatByShowTime from '@/hooks/useAllSeatByShowTime'
import RenderSeatLayout from './components/RenderSeatLayout'

const SeatPage = () => {
  // const [loading, setLoading] = useState(false)
  // const [seats, setSeats] = useState<Seat[]>([])
  const { hall_id, id_showtime } = useSelector(
    (state: any) => state.ticket.ticket
  )

  const { data: seats, isLoading: loading } = useAllSeatByShowTime({
    _hallId:hall_id,
    _showId:id_showtime
  })
  const [userSeatList, setUserSeatList] = useState<string[]>([])
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null)
  // const [showPaymentSidebar, setShowPaymentSidebar] = useState(false)

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

    // if (userSeatList.length === 0) {
    //   setShowPaymentSidebar(false)
    // }
  }

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat)
    // setShowPaymentSidebar(true)
  }

  return (
    <div className="flex items-center flex-col">
      <div className="form-item-heading">Select Seat</div>
      {!loading && (
        <>
          <div className="seat-guide-container lg:gap-20 xs:gap-16 xl:max-w-7xl lg:max-w-7xl md:max-w-7xl sm:max-w-5xl  xs:max-w-4xl flex-wrap">
            <div className="flex items-center">
              <div className="seat-available-demo lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20"></div>
              <p className="seat-status-details">Available</p>
            </div>
            <div className="flex items-center">
              <div className="seat-booked-demo lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20"></div>
              <p className="seat-status-details">Booked</p>
            </div>
            <div className="flex items-center">
              <div className="seat-selected-demo lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20"></div>
              <p className="seat-status-details">Selected</p>
            </div>
            <div className="flex items-center">
              <div className="seat-selected-demo lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20"></div>
              <p className="seat-status-details">Vip</p>
            </div>
          </div>
          <div className="theatre-screen lg:w-[48rem] lg:h-[18rem]  md:h-[15rem] sm:w-[52rem] sm:h-[16rem] ">
            <div className="screen-1"></div>
            <div className="screen-2"></div>
          </div>
          <div className="theatre-screen-heading">Theatre Screen</div>
          <div className="seat-container sm:mr-16 xs:mr-16">
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

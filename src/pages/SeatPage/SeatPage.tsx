/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
import useAllSeatByShowTime from '@/hooks/useAllSeatByShowTime'
import RenderSeatLayout from './components/RenderSeatLayout'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useDispatch, useSelector } from 'react-redux'
import { ticketAction } from '@/store/ticket'
import { SeatUserList, TicketSelector } from '@/Interface/ticket'
import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'
import { Seat } from '@/Interface/seat'

const SeatPage = () => {
  const dispatch = useDispatch()
  const { seat: allSeat } = useSelector(
    (state: TicketSelector) => state.ticket.ticket
  )

  const [ticket] = useLocalStorage<TicketType | null>('ticket')

  const { data: seats, isLoading: loading } = useAllSeatByShowTime({
    _hallId: ticket?.hall_id || '',
    _showId: ticket?.id_showtime || ''
  })
  const [, setSelectedSeat] = useState<SeatUserList | null>(null)
  useEffect(() => {
    if (!seats || seats.length == 0) return
    const newData = seats.map((f: Seat) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, createdAt, ShowScheduleId, ScreeningRoomId, TimeSlotId,
        ...seatInfo
      } = f
      return {
        ...seatInfo,
        name: convertNumberToAlphabet(f.row) + f.column,
        selected: false
      }
    })
    // console.log(seats)
    // console.log('allSeat', allSeat)
    if (ticket?.seat) {
      const seatSelectedStorage = ticket.seat
        .map((seat) => (seat.selected ? seat : undefined))
        .filter((seat) => seat !== undefined)

      const seatIdStorage = seatSelectedStorage.map((seat) => seat?._id)
      const combiData = newData.map((seat: SeatUserList) => {
        if (seatIdStorage.includes(seat._id)) {
          return {
            ...seat,
            selected: true
          }
        }
        return seat
      })
      dispatch(ticketAction.fetchSeat(combiData))

      return
    }

    dispatch(ticketAction.fetchSeat(newData))
  }, [seats, dispatch])
  const override = {
    display: 'block',
    margin: '1.6rem auto'
  }
  if (loading) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }

  const updateSeatStatus = (
    seat: SeatUserList,
    selected: boolean
  ): SeatUserList => ({
    ...seat,
    selected
  })
  const handleUserSeats = (seat: SeatUserList) => {
    const seatResult = allSeat.map((s: SeatUserList) =>
      s._id === seat._id ? updateSeatStatus(s, seat.selected) : s
    )
    dispatch(ticketAction.addProperties({ seat: [...seatResult] }))
  }

  const handleSeatClick = (seat: SeatUserList) => {
    setSelectedSeat(seat)
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
              <div className="seat-selected-demo bg-[#db1f1f] lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20"></div>
              <p className="seat-status-details">Vip</p>
            </div>
          </div>
          <div className="theatre-screen lg:w-[48rem] lg:h-[18rem]  md:h-[15rem] sm:w-[52rem] sm:h-[16rem] ">
            <div className="screen-1"></div>
            <div className="screen-2"></div>
          </div>
          <div className="theatre-screen-heading">Theatre Screen</div>
          <div className="seat-container sm:mr-16 xs:mr-16">
            {allSeat && allSeat.length > 0 && (
              <RenderSeatLayout
                seats={allSeat}
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

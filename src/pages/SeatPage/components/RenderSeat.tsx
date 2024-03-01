function RenderSeat({
  seat,
  handleUserSeats,
  handleSeatClick,
  userSeatList
}: any) {
  const seatStatus = seat.status === 0 ? 'booked' : 'available'

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleUserSeats(seat._id)
  }
  return (
    <div
      className={`seat ${seatStatus}`}
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
      {seat.name}
    </div>
  )
}

export default RenderSeat

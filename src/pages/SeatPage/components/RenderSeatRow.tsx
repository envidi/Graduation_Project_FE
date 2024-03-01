import RenderSeat from './RenderSeat'

function RenderSeatRow({
  rowSeats,
  handleUserSeats,
  handleSeatClick,
  userSeatList
}: any) {

  return (
    <div className="row">
      {rowSeats.map((seat: any, index: number) => {
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

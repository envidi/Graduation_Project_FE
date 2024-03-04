import { TicketType } from '@/store/ticket'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Armchair, Cookie } from 'lucide-react'
import {
  chuyenDoiNgayDauVao,
  convertAmPm,
  convertMintuteToHour,
  formatVND,
  getDay,
  getHourAndMinute
} from '@/utils'
import { useLocalStorage } from '@uidotdev/usehooks'
import { SeatUserList, TicketSelector } from '@/Interface/ticket'
import { useNavigate } from 'react-router-dom'
import {
  Hall,
  Location,
  PaymentMethod,
  ShowDate,
  ShowTime,
  TicketAmount
} from './IconTicket'
import { FoodItemState } from '@/Interface/food'
import { FoodSelector } from '@/store/food'
import { useLocation } from 'react-router-dom'

function TicketSummary() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { seat } = useSelector((state: TicketSelector) => state.ticket.ticket)
  const foods = useSelector((state: FoodSelector) => state.foods.foods)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const foodValid = foods.filter((food: FoodItemState) => food.quantity > 0)

  const {
    hall_name = '',
    image_movie = '',
    time_from = '',
    name_movie = '',
    duration_movie = 0,
    cinema_name = '',
    price_movie = 0,
    seat: seatsTicket = [],
    foods: foodsTicket = [],
    ticketAmount = 0
  } = ticket
  const total =
    seat &&
    seat.reduce((acc: number, s: SeatUserList) => {
      return s.price + acc
    }, 0) + price_movie

  // const handlePurchaseTicket = () => {
  //   if (seat.length == 0) {
  //     toast.error('Please select seat !', {
  //       position: 'top-right'
  //     })
  //     return
  //   }
  //   navigate('/purchase/food')
  // }
  const handlePurchaseSeat = () => {
    if (seat.length == 0) {
      toast.error('Please select seat !', {
        position: 'top-right'
      })
      return
    }

    setTicket({
      ...ticket,
      seat: [...seat],
      ticketAmount: seat.length
    })
    navigate('/purchase/food')
  }
  const handlePurchaseFood = () => {
    // const foodFiltered = foods.filter(
    //   (food: FoodItemState) => food.quantity > 0
    // )
    setTicket({
      ...ticket,
      foods: [...foods]
    })
    navigate('/purchase/food')
  }

  return (
    <div className="purchase-section-right ticket_summary ">
      <h2 className="ticket-container-heading">Ticket Summary</h2>

      <div className="ticket-container md:sticky md:top-0">
        <div className="ticket-heading">
          <div className="ticket-movie-img-cont">
            <img
              className="ticket-movie-img"
              src={image_movie}
              alt="selected movie image"
            />
          </div>

          <div className="ticket-primary-info">
            <p className="ticket-movie-screen">3D</p>
            <p className="ticket-movie-name">{name_movie}</p>
            <p className="ticket-movie-dur">
              {convertMintuteToHour(duration_movie)}
            </p>
          </div>
        </div>

        <div className="ticket-info">
          <ul className="ticket-info-list">
            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <Location />
                <p>Location</p>
              </div>

              <p className="ticket-info-val">
                {/* {userLocation ? userLocation.location : '--'} */}
                {cinema_name}
              </p>
            </li>

            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <ShowDate />
                <p>Show Date</p>
              </div>

              <p className="ticket-info-val">
                {/* {formattedDate ? formattedDate : '--'} */}
                {chuyenDoiNgayDauVao(getDay(time_from))}
              </p>
            </li>

            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <Hall />
                <p>Hall number</p>
              </div>

              <p className="ticket-info-val">
                {/* {curHallObj ? curHallObj.hall_name : '--'} */}
                {hall_name}
              </p>
            </li>

            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <ShowTime />
                <p>Show Time</p>
              </div>

              <p className="ticket-info-val">
                {/* {userHallId ? curHallObj.movie_start_time : '--'} */}
                {convertAmPm(getHourAndMinute(time_from))}
              </p>
            </li>

            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <TicketAmount />
                <p>Ticket Amount</p>
              </div>

              <p className="ticket-info-val">
                {seat ? seat.length : ticketAmount ? ticketAmount : '--'}
              </p>
            </li>

            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <Armchair size={16} />
                <p>Seats</p>
              </div>

              <p className="ticket-info-val">
                {seat && seat.length != 0
                  ? seat
                      .map((seat: { id: string; name: string }) => seat.name)
                      .join(', ')
                  : seatsTicket && seatsTicket.length != 0
                    ? seatsTicket
                        .map((seat: { id: string; name: string }) => seat.name)
                        .join(', ')
                    : '--'}
              </p>
            </li>
            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <Cookie size={16} />
                <p>Food</p>
              </div>

              <div className="ticket-info-val">
                <ul>
                  {foodValid && foodValid.length != 0
                    ? foodValid.map(
                        (food: {
                          _id: string
                          name: string
                          quantity: number
                        }) => (
                          <li className="flex justify-end" key={food._id}>
                            {food.name} ({food.quantity})
                          </li>
                        )
                      )
                    : foodsTicket && foodsTicket.length != 0
                      ? foodsTicket.map(
                          (food: {
                            _id: string
                            name: string
                            quantity: number
                          }) => (
                            <li className="flex justify-end" key={food._id}>
                              {food.name} ({food.quantity})
                            </li>
                          )
                        )
                      : '--'}
                </ul>
              </div>
            </li>

            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <PaymentMethod />
                <p>Payment Method</p>
              </div>

              <p className="ticket-info-val">
                {/* {userPayMethod && userPayMethod.length > 0
                      ? userPayMethod
                      : '--'} */}
                Bkash
              </p>
            </li>

            <li className="ticket-info-item">
              <div className="ticket-info-category">
                <PaymentMethod />
                <p>Total Price</p>
              </div>

              <p className="ticket-info-val">
                {/* {userSeatPrice && userSeatListName
                      ? `BDT ${userSeatPrice * userSeatListName.length}TK`
                      : '--'} */}
                {formatVND(total)}
              </p>
            </li>
          </ul>
        </div>
        {pathname == '/purchase/food' && (
          <button
            className="ticket-btn disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handlePurchaseFood}
          >
            {/* {loading ? <BarLoader color="#e6e6e8" /> : 'purchase ticket'} */}
            purchase ticket
          </button>
        )}

        {pathname == '/purchase/seat' && (
          <button
            className="ticket-btn disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handlePurchaseSeat}
          >
            {/* {loading ? <BarLoader color="#e6e6e8" /> : 'purchase ticket'} */}
            purchase ticket
          </button>
        )}
      </div>
    </div>
  )
}

export default TicketSummary

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
import TicketItem from './Ticket/TicketItem'
import TicketList from './Ticket/TicketList'

const filterData = (data: SeatUserList[]) => {
  return data
    .filter((s: SeatUserList) => s.selected)
    .reduce((acc: number, s: SeatUserList) => {
      return s.price + acc
    }, 0)
}

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
    seat: seatStorage = [],
    foods: foodsTicket = [],
    ticketAmount = 0
  } = ticket
  const totalFoodPrice = foods
    ? foods.reduce((acc: number, s: FoodItemState) => {
      return s.price * s.quantity + acc
    }, 0)
    : 0
  const totalSeatPrice =
    seat && seat.length > 0
      ? filterData(seat)
      : seatStorage
        ? filterData(seatStorage)
        : 0
  const total = totalSeatPrice + price_movie + totalFoodPrice

  // console.log(total)
  // const handlePurchaseTicket = () => {
  //   if (seat.length == 0) {
  //     toast.error('Please select seat !', {
  //       position: 'top-right'
  //     })
  //     return
  //   }
  //   navigate('/purchase/food')
  // }
  const mapData = (data: SeatUserList[]) => {
    const filteredData = data.filter((seat: SeatUserList) => seat.selected)
    return filteredData.map((seat: SeatUserList) => seat.name).join(', ')
  }

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
      total,
      ticketAmount: seat.filter((s) => s.selected).length
    })
    navigate('/purchase/food')
  }

  const handlePurchaseFood = () => {
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
            <TicketItem
              icon={<Location />}
              title={'Location'}
              name={cinema_name}
            />
            <TicketItem
              icon={<ShowDate />}
              title={'Show Date'}
              name={chuyenDoiNgayDauVao(getDay(time_from))}
            />
            <TicketItem
              icon={<Hall />}
              title={'Hall number'}
              name={hall_name}
            />
            <TicketItem
              icon={<ShowTime />}
              title={'Show Time'}
              name={convertAmPm(getHourAndMinute(time_from))}
            />
            <TicketItem
              icon={<TicketAmount />}
              title={'Ticket Amount'}
              name={
                seat && seat.length != 0
                  ? seat.filter((s) => s.selected).length
                  : ticketAmount
                    ? ticketAmount
                    : '--'
              }
            />
            <TicketItem
              icon={<Armchair size={16} />}
              title={'Seats'}
              name={
                seat && seat.length != 0
                  ? mapData(seat)
                  : seatStorage && seatStorage.length > 0
                    ? mapData(seatStorage)
                    : '--'
              }
            />

            <TicketList
              icon={<Cookie size={16} />}
              title={'Food'}
              valueState={foodValid}
              valueStorage={foodsTicket}
            />
            <TicketItem
              icon={<PaymentMethod />}
              title={'Payment Method'}
              name={'Bkash'}
            />
            <TicketItem
              icon={<PaymentMethod />}
              title={'Total Price'}
              name={formatVND(total)}
            />
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

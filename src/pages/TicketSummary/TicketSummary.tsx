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

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPayment, createPaymentMomo } from '@/api/payment'
import DialogPayment from '../modals/DialogPayment'
import {
  filterSeat,
  filterFood,
  filterData,
  mapData
} from '@/utils/methodArray'
import useTicket from '@/hooks/useTicket'
import { CREATE_TICKET, FULL_SCHEDULE } from '@/utils/constant'
import { useShowtime } from '@/hooks/useShowtime'
import TimeCountDown from './TimeCountDown'
import BarLoader from 'react-spinners/BarLoader'
import { useContext } from 'react'
import { ContextMain } from '@/context/Context'

interface MutatePaymentType {
  amount: number
  language: string
  bankCode: string
}

function TicketSummary() {
  const { userDetail } = useContext(ContextMain)
  const queryClient = useQueryClient()
  const { seat, paymentMethod } = useSelector(
    (state: TicketSelector) => state.ticket.ticket
  )

  const foods = useSelector((state: FoodSelector) => state.foods.foods)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const { isLoading, data: dataShowtime } = useShowtime(
    ticket?.id_showtime || ''
  )
  const foodValid = foods.filter((food: FoodItemState) => food.quantity > 0)

  const onSuccess = (data: { _id: string }) => {
    setTicket({
      ...ticket,
      ticket_id: data._id
    })
    navigate('/purchase/food')
  }
  const { mutate: mutateTicket, isPending } = useTicket(
    CREATE_TICKET,
    onSuccess
  )
  const { mutate } = useMutation({
    mutationFn: (data: MutatePaymentType) => {
      switch (paymentMethod._id) {
        case 1:
          return createPayment(data)
        case 2:
          return createPaymentMomo(data)
        default:
          return createPayment(data)
      }
    },
    onSuccess: (data) => {
      if (data?.data) {
        window.location.replace(data?.data)
      }
      queryClient.invalidateQueries({ queryKey: ['payment'] })
    }
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()

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

  const totalFoodPrice =
    foods && foods.length != 0
      ? filterFood(foods)
      : ticket.foods
        ? filterFood(ticket.foods)
        : 0
  const totalSeatPrice =
    seat && seat.length > 0
      ? filterSeat(seat)
      : seatStorage
        ? filterSeat(seatStorage)
        : 0
  const total = totalSeatPrice + price_movie + totalFoodPrice

  const mapDataSeat = (data: SeatUserList[]) => {
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
    const foodObject = filterData(
      ticket.foods,
      (food) => food.quantity > 0
    ).map((food) => {
      return { foodId: food._id, quantityFood: food.quantity }
    })
    const newObject = {
      priceId: ticket?.price_id,
      seatId: mapData(seat),
      foods: foodObject,
      showtimeId: ticket.id_showtime,
      userId: userDetail?.message?._id || '1',
      movieId : ticket.id_movie,
      screenRoomId : ticket.hall_id,
      cinemaId : ticket.cinemaId
    }
    if (ticket.ticket_id !== '') {
      mutateTicket({
        ...newObject,
        ticket_id: ticket.ticket_id
      })
      return
    }
    mutateTicket({
      ...newObject
    })
  }
  const handlePurchaseFood = () => {
    setTicket({
      ...ticket,
      total,
      foods: [...foods]
    })

    navigate('/purchase/payment')
  }
  const handlePurchasePayment = () => {
    const showtime = dataShowtime[0]
    if (showtime.status == FULL_SCHEDULE || showtime.destroy) {
      toast.error('Showtime is not available', {
        position: 'top-right'
      })
      return
    }
    if (paymentMethod._id == 1) {
      mutate({
        amount: ticket.total,
        bankCode: 'NCB',
        language: 'vn'
      } as MutatePaymentType)
    } else if (paymentMethod._id == 2) {
      mutate({
        amount: ticket.total
      } as MutatePaymentType)
    }
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
            <div className="flex items-center justify-between w-full">
              <p className="ticket-movie-screen">3D </p>
              {ticket && ticket.ticket_id && <TimeCountDown />}
            </div>
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
                  ? mapDataSeat(seat)
                  : seatStorage && seatStorage.length > 0
                    ? mapDataSeat(seatStorage)
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
              name={paymentMethod.name}
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
            purchase ticket
          </button>
        )}

        {pathname == '/purchase/seat' && (
          <button
            className="ticket-btn disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handlePurchaseSeat}
          >
            {isPending ? <BarLoader color="#e6e6e8" /> : 'purchase ticket'}
          </button>
        )}
        {pathname == '/purchase/payment' && paymentMethod._id !== 3 && (
          <button
            className="ticket-btn disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handlePurchasePayment}
          >
            purchase ticket
          </button>
        )}
        {pathname == '/purchase/payment' && paymentMethod._id == 3 && (
          <DialogPayment isLoading={isLoading} dataShowtime={dataShowtime} />
        )}
      </div>
    </div>
  )
}

export default TicketSummary

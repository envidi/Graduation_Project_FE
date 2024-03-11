import { TicketType } from '@/store/ticket'
import { filterData, mapData } from '@/utils/methodArray'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { COMPLETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'

function ResultPage() {
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const navigate = useNavigate()
  const [toastShown, setToastShown] = useState(false)

  const onSuccess = () => {
    if (!toastShown) {
      toast.success('Post ticket successfully !', {
        position: 'top-right'
      })
      setToastShown(true)
      setTicket({})
    }
  }
  const { mutate: mutateTicket } = useTicket(COMPLETE_TICKET, onSuccess)
  useLayoutEffect(() => {
    if (!ticket || Object.keys(ticket).length == 0) return navigate('/')
    const foodObject = filterData(
      ticket.foods,
      (food) => food.quantity > 0
    ).map((food) => {
      return { foodId: food._id, quantityFood: food.quantity }
    })

    mutateTicket({
      ticket_id: ticket.ticket_id,
      priceId: ticket.price_id,
      seatId: mapData(ticket.seat),
      foods: foodObject,
      showtimeId: ticket.id_showtime
    })
  }, [])

  return <div>ResultPage</div>
}

export default ResultPage

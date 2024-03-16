import { TicketType } from '@/store/ticket'
import { filterData, mapData } from '@/utils/methodArray'
import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { COMPLETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'
import { AnimatedPage } from '@/components/AnimatedPage'
function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}
function ResultPage() {
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const [, setCountdown] = useLocalStorage<number | null>('countdown')
  const navigate = useNavigate()
  const query = useQuery()

  const typeBank = query.has('partnerCode') && query.get('partnerCode')
  const typePayment = 'ATM'
  const amount = query.has('amount') && query.get('amount')
  const [toastShown, setToastShown] = useState(false)

  const onSuccess = () => {
    if (!toastShown) {
      toast.success('Post ticket successfully !', {
        position: 'top-right'
      })
      setToastShown(true)
      setTicket({})
      setCountdown(null)
    }
  }
  const onError = () => {
    setCountdown(null)
  }
  const { mutate: mutateTicket } = useTicket(
    COMPLETE_TICKET,
    onSuccess,
    onError
  )
  useLayoutEffect(() => {
    if (!ticket || Object.keys(ticket).length == 0) return navigate('/')
    const foodObject = filterData(
      ticket.foods,
      (food) => food.quantity > 0
    ).map((food) => {
      return { foodId: food._id, quantityFood: food.quantity }
    })

    mutateTicket({
      typeBank: typeBank,
      typePayment,
      amount,
      userId: '65f127dfed45b3ea7a26642c',
      ticket_id: ticket.ticket_id,
      priceId: ticket.price_id,
      seatId: mapData(ticket.seat),
      foods: foodObject,
      showtimeId: ticket.id_showtime
    })
  }, [])

  return (
    <AnimatedPage>
      <section className="section-purchase mt-20">
        <div className="purchase-container container max-w-[132rem] md:px-16 xl:px-5">
          <div className="purchase-section-left">
            <div className="purchase-heading mt-20"></div>
            result page
          </div>
        </div>
      </section>
    </AnimatedPage>
  )
}

export default ResultPage

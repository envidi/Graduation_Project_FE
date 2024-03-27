import { TicketType } from '@/store/ticket'
import { filterData, mapData } from '@/utils/methodArray'
import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { COMPLETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'
import { Link } from 'react-router-dom'
import { AnimatedPage } from '@/components/AnimatedPage'
import {
  Armchair,
  CalendarDays,
  Check,
  CreditCard,
  Popcorn
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContextMain } from '@/context/Context'
// import successfulImage from './Images/customers/successfull-payment.png'
function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}
function ResultPage() {
  const {
    userDetail: {
      message: { _id } 
    }
  } = useContext(ContextMain)
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
      localStorage.removeItem('paymentToken')
    }
  }
  const onError = () => {
    setCountdown(null)
    setTicket({})
    localStorage.removeItem('paymentToken')
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
      userId: _id,
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
        <div className="result-container container max-w-[132rem] md:px-16 xl:px-5 ">
          <div className="purchase-section-left w-full">
            <div className="purchase-heading mt-20"></div>
            <div className="flex w-full bg-background-secondary px-7  ps-10 py-10 rounded-xl lg:flex-row  xs:flex-col-reverse">
              <div className="flex flex-col lg:basis-7/12 xs:basis-full">
                <h3 className="text-5xl">Payment successful</h3>
                <h6 className="text-2xl  mt-4 mb-10">
                  Thank you for choosing DreamCinema . Your custom report will
                  be generated within two business days
                </h6>
                <div className="stepper-wrapper  xs:ms-[-9vw] sm:ms-[-10vw] md:ms-[-11vw] lg:ms-[-6vw] ">
                  <div className="stepper-item completed  ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <CalendarDays />
                    </div>
                  </div>
                  <div className="stepper-item completed ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <Armchair />
                    </div>
                  </div>
                  <div className="stepper-item completed ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <Popcorn />
                    </div>
                  </div>
                  <div className="stepper-item completed ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <CreditCard />
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 gap-7">
                  <Button className="bg-[#4bb543] text-white text-3xl px-8 py-4 rounded-2xl">
                    <Link to={'/profile/bill'}>Go to bill</Link>
                  </Button>
                  <Button className="border-[#4bb543] text-[#4bb543] border text-3xl px-8 py-4 rounded-2xl">
                    <Link to={'/'}>Back to home</Link>
                  </Button>
                </div>
              </div>
              <div className="flex lg:basis-5/12 xs:basis-full">
                <img
                  className="object-cover"
                  src="/Images/customers/successfull-payment.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  )
}

export default ResultPage

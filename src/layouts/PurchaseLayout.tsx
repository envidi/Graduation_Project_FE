import { AnimatedPage } from '@/components/AnimatedPage'
import TicketSummary from '@/pages/TicketSummary/TicketSummary'
import { Outlet } from 'react-router-dom'

function PurchaseLayout() {
  return (
    <AnimatedPage>
      <section className="section-purchase mt-20">
        <div className="purchase-container container max-w-[132rem]">
          <div className="purchase-section-left">
            <div className="purchase-heading"></div>
            <Outlet />
          </div>

          <TicketSummary />
        </div>
      </section>
    </AnimatedPage>
  )
}

export default PurchaseLayout

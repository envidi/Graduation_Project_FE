import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'

import ListTickets from './components/ListTicket'

const TicketsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Vé"
        pageRetun="Danh sách vé"
        pageLink="/admin/tickets"
      />

      <div className="flex flex-col gap-10">
        <ListTickets />
      </div>
    </DefaultLayout>
  )
}

export default TicketsPage

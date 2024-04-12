import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableTicket from './components/TableTikets'
import ListTickets from './components/ListTicket'



const TicketsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tickets" />

      <div className="flex flex-col gap-10">
        {/* <TableTicket /> */}
        <ListTickets/>
      </div>
    </DefaultLayout>
  )
}

export default TicketsPage

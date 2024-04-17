import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableRooms from './components/TableRoosm'


const RoomsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rooms" />

      <div className="flex flex-col gap-10">
        <TableRooms/>
      </div>
    </DefaultLayout>
  )
}

export default RoomsPage

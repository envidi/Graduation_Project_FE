import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableRoomsDestroy from './components/TableDestroy'



const RoomsPageDestroy = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rooms Destroy" />

      <div className="flex flex-col gap-10">
        <TableRoomsDestroy />
      </div>
    </DefaultLayout>
  )
}

export default RoomsPageDestroy

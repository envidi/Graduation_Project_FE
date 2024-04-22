import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableRoomsDestroy from './components/TableDestroy'



const RoomsPageDestroy = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Quản lý phòng chiếu đã xóa" />

      <div className="flex flex-col gap-10">
        <TableRoomsDestroy />
      </div>
    </DefaultLayout>
  )
}

export default RoomsPageDestroy

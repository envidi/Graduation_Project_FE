import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormRooms from './components/FormRoom'

const EditRooms = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chỉnh sửa phòng chiếu" pageRetun='Phòng chiếu / Sửa phòng chiếu' pageLink='/admin/screeningrooms' />

      <div className="flex flex-col gap-10">
        <FormRooms typeForm="EDIT" />
      </div>
    </DefaultLayout>
  )
}

export default EditRooms

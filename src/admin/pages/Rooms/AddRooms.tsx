import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormRooms from './components/FormRoom'



const AddRooms = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="ADDRooms" />

    <div className="flex flex-col gap-10">
      <FormRooms typeForm="ADD" />
    </div>
  </DefaultLayout>
  )

  }
export default AddRooms

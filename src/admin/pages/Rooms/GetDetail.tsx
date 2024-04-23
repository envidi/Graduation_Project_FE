import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import GetDetailRoons from './components/GetDetailRoons'


const DetailsRoomsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rooms" pageLink={''} />

      <div className="flex flex-col gap-10">
        <GetDetailRoons/>
      </div>
    </DefaultLayout>
  )
}

export default DetailsRoomsPage

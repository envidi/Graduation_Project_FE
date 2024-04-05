import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormCinema from './components/FormCinema'
// import FormCategory from './components/FormCategory'

const CinemaAdd = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Cinema" />

      <div className="flex flex-col gap-10">
        <FormCinema typeForm="ADD" />
      </div>
    </DefaultLayout>
  )
}

export default CinemaAdd

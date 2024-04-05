import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableCinema from './components/TableCinema'
// import TableCategory from './components/TableCategory'

const CinemaPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cinema" />

      <div className="flex flex-col gap-10">
        <TableCinema />
      </div>
    </DefaultLayout>
  )
}

export default CinemaPage

import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
// import FormCinema from './components/FormMovie'
import FormMovie from './components/FormMovie'
// import FormCategory from './components/FormCategory'

const MovieAdd = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Movie" pageLink="/admin/movie" pageRetun="Movie"/>

      <div className="flex flex-col gap-10">
        <FormMovie typeForm="ADD" />
      </div>
    </DefaultLayout>
  )
}

export default MovieAdd

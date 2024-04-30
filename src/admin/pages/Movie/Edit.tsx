import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormMovie from './components/FormMovie'

const MovieEdit = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm phim" pageLink='/admin/movie' pageRetun='' />
      <div className="flex flex-col gap-10">
        <FormMovie typeForm="EDIT" />
      </div>
    </DefaultLayout>
  )
}

export default MovieEdit

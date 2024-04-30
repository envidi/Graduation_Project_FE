import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableItemSoft from './TableItemSoft'

const TableSoftDeleteMovie = () => {
  // render
  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Danh sách phim đang xóa"
          pageLink="/admin/movie"
          pageRetun="Danh sách phim"
        />
        <TableItemSoft/>
      </DefaultLayout>
    </>
  )
}

export default TableSoftDeleteMovie

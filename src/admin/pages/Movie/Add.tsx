import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormMovie from './components/FormMovie'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MovieAdd = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Thêm phim"
        pageLink="/admin/movie"
        pageRetun="Danh sách phim"
      />
      <Dialog>
        <DialogTrigger asChild>
          <h2 className="flex items-center gap-2 hover:cursor-pointer mb-3">
            Lưu ý <Info size={20} />
          </h2>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[red]">Lưu ý</DialogTitle>
          </DialogHeader>
          <ul className="w-full ">
            <li className="list-disc text-sm my-1">
              Khi thêm một bộ phim mới , bộ phim được thêm lịch chiếu chỉ có thể
              sửa xóa sau ngày kết thúc công chiếu
            </li>
          </ul>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="text-sm">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-10">
        <FormMovie typeForm="ADD" />
      </div>
    </DefaultLayout>
  )
}

export default MovieAdd

import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableRooms from './components/TableRoosm'
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

const RoomsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Phòng chiếu" pageLink='/admin/screeningrooms' pageRetun='Phòng chiếu' />
      
      <div className="flex flex-col gap-10">
        <TableRooms />
      </div>
    </DefaultLayout>
  )
}

export default RoomsPage

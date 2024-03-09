import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog'
import ModalPayMentMB from './ModalPayMentMB'

function DialogPayment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="ticket-btn disabled:opacity-70 bg-primary-movieColor rounded-full text-primary-locationMovie disabled:cursor-not-allowed"
        >
          purchase ticket 3
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] p-0 overflow-hidden bg-white">
        <ModalPayMentMB />
      </DialogContent>
    </Dialog>
  )
}

export default DialogPayment

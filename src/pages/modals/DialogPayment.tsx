import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ModalPayMentMB from './ModalPayMentMB'

function DialogPayment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="ticket-btn disabled:opacity-70 bg-primary-movieColor rounded-full text-primary-locationMovie disabled:cursor-not-allowed">
          purchase ticket
        </button>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[425px] md:max-w-[625px] sm:max-w-[555px] p-0 overflow-hidden bg-white">
        <ModalPayMentMB />
      </DialogContent>
    </Dialog>
  )
}

export default DialogPayment

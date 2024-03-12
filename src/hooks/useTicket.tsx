import {
  TicketCreateType,
  checkoutTicket,
  deleteTicket,
  updateTicket,
  updateTicketSeat
} from '@/api/ticket'
import { TicketType } from '@/store/ticket'
import {
  COMPLETE_TICKET,
  CREATE_TICKET,
  DELETE_TICKET,
  SEAT_STORE
} from '@/utils/constant'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { toast } from 'react-toastify'

// eslint-disable-next-line no-unused-vars
function useTicket(
  action: string,
  onSuccess?: (data: { _id: string }) => void
) {
  const queryClient = useQueryClient()
  const [ticket] = useLocalStorage<TicketType>('ticket')
  const { mutate, isPending } = useMutation({
    mutationFn: (newTodo: TicketCreateType) => {
      switch (action) {
        case CREATE_TICKET:
          if (ticket.ticket_id !== undefined) {
            return updateTicketSeat(newTodo)
          }
          return checkoutTicket(newTodo)
        case COMPLETE_TICKET:
          return updateTicket(newTodo)
        case DELETE_TICKET:
          return deleteTicket(newTodo)
        default:
          return checkoutTicket(newTodo)
      }
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data)

      queryClient.invalidateQueries({
        queryKey: [SEAT_STORE]
      })
    },
    onError: () => {
      toast.error('Cannot select this seat!', {
        position: 'top-right'
      })
    }
  })
  return { mutate, isPending }
}

export default useTicket

import { Ticket } from '@/Interface/ticket'
import { deleteTicket, getAllTikets } from '@/api/tikets'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaEdit } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TableTicket = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  // fetch tickets by react-query
  const { data, isLoading, isError } = useQuery<Ticket[]>({
    queryKey: ['TICKET'],
    queryFn:()=> getAllTikets()
    
  })
  
  // delete tickets mutation react-query
  const { mutate } = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TICKET'] })
      toast.success('Xoa thành công')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Xoa that bai')
    }
  })

  const handleRemoveTickets = (id: string) => {
    mutate(id)
  }
  
  if (isLoading ||!data) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  // render
  return (
    <>
      <div className="text-center mb-2 flex items-center justify-start">
        <button
          onClick={() => {
            navigate('/admin/tikets/add')
          }}
          className="flex items-center justify-center border border-stroke py-2 px-4 rounded-full"
        >
          Add <FaPlusCircle size={20} className="ml-4" />
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-primary px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-primary-white xl:pl-11">
                  STT
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Category Name
                </th>
                <th className="py-4 px-4 font-medium text-primary-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">
                      {index}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.priceId}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.seatId}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.userId}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.movieId.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.cinemaId.CinemaName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.cinemaId.CinemaAdress}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.screenRoomId.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.showtimeId[0].timeFrom}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.showtimeId[0].timeTo}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.quantity}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.totalPrice}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.status}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{ticket.paymentId}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          navigate(`/admin/tikets/edit/${ticket._id}`)
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleRemoveTickets(ticket._id)}
                      >
                        <FaRegTrashCan size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TableTicket

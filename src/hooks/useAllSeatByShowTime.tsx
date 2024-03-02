import { getAllSeat } from '@/api/seat'
import { useQuery } from '@tanstack/react-query'

function useAllSeatByShowTime(id_show_hall: {
  _hallId: string
  _showId: string
}) {
  return useQuery({
    queryKey: ['seat', id_show_hall],
    queryFn: () => getAllSeat(id_show_hall)
  })
}

export default useAllSeatByShowTime

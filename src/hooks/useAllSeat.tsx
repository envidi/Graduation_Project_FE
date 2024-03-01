import { getAllSeat } from '@/api/seat'
import { useQuery } from '@tanstack/react-query'

function useAllSeat() {
  return useQuery({
    queryKey: ['seat'],
    queryFn: () => getAllSeat()
  })
}


export default useAllSeat

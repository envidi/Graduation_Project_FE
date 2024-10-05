import { getAllFood } from '@/api/food'
import { FOOD } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
// Hook này sử dụng lấy ra tất cả thức ăn trong database , sẽ tự động gọi lại sau mỗi 5s

function useAllFood() {
  return useQuery({
    queryKey: [FOOD],
    queryFn: () => getAllFood(),
    refetchInterval: 5000
  })
}

export default useAllFood

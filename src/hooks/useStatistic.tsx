import { getCountUser } from '@/api/auth'

import { getCountMovie } from '@/api/movie'
import {
  getAgeUser,
  getChartRevenueWeek,
  getCountCate,
  getCountTicketAfterWeek,
  getProfitAndRevenue,
  getSexUser,
  getTopFood,
  getTopMovie,
  getTopUser
} from '@/api/statistic'

import { useQuery } from '@tanstack/react-query'
// Hook này lấy ra tất cả các thống kê trong phần admin

export function useStatistic(action: string) {
  return useQuery({
    queryKey: [action],
    queryFn: () => {
      switch (action) {
        case 'USER_COUNT':
          // Lấy ra tổng số người dùng
          return getCountUser()
        case 'MOVIE_COUNT':
          // Lấy ra tổng số bộ phim
          return getCountMovie()
        case 'REVENUE_PROFIT':
          // Lấy ra doanh thu và lợi nhuận
          return getProfitAndRevenue()
        case 'TOP_MOVIE':
          // Lấy ra top 5 bộ phim trong admin
          return getTopMovie()
        case 'TOP_USER':
          // Lấy ra top 5 người dùng
          return getTopUser()
        case 'CATE_COUNT':
          // Lấy ra top thể loại bộ phim được xem nhiều nhất
          return getCountCate()
        case 'TOP_FOOD':
          // Lấy ra top đồ ăn được bán nhiều nhất
          return getTopFood()
        case 'TICKET_COUNT':
          // Lấy ra số vé được bán nhiều nhất trong tuần
          return getCountTicketAfterWeek()
        case 'SEX_USER':
          // Lấy ra giới tính người dùng để thống kê
          return getSexUser()
        case 'AGE_USER':
          // Lấy ra độ tuổi trung bình của người dùng
          return getAgeUser()
        case 'CHART_REVENUE_PROFIT':
          // Lấy ra biểu đồ doanh thu và lợi nhuận theo tuần
          return getChartRevenueWeek()
        default:
          return getProfitAndRevenue()
      }
    }
  })
}
export default useStatistic

import { QueryMovie, getAllMovieHome, getMovieStatus } from '@/api/movie'
import { MOVIE } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'

// Hook này lấy ra tất cả bộ phim
function useAllMovie() {
  return useQuery({
    queryKey: [MOVIE],
    queryFn: () => getAllMovieHome()
  })
}
// Hook này lấy ra tất cả bộ phim theo trạng thái bộ lọc của query dựa QueryMovie gồm trạng thái bộ phim, đất nước, đánh giá và độ tuổi
export function useStatusMovie(query: QueryMovie) {
  return useQuery({
    queryKey: [MOVIE, query],
    queryFn: () => getMovieStatus(query)
  })
}

export default useAllMovie

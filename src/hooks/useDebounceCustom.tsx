import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { searchMovie } from '@/api/movie'
// hook này xử lý việc khi người dùng search thì sẽ chờ người dùng gõ xong mới call api để trả về dữ liệu
function useDebounceCustom() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  useEffect(() => {
    const searchHN = async () => {
      let results = []
      setIsSearching(true)
      if (debouncedSearchTerm) {
        const data = await searchMovie(searchTerm)
        results = data || data?.length > 0 ? data : []
      }

      setIsSearching(false)
      setResults(results)
    }

    searchHN()
  }, [debouncedSearchTerm])
  return [
    results,
    isSearching,
    searchTerm,
    setSearchTerm,
    setResults,
    setIsSearching
  ] as const
}

export default useDebounceCustom

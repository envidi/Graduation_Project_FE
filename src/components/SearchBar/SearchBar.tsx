import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState
} from 'react'
import './search.css'
import { useDebounce } from '@uidotdev/usehooks'
import { searchMovie } from '@/api/movie'
import { Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
function SearchBar() {
  const [showSearch, setShowSearch] = useState<boolean>(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const handleClick: MouseEventHandler<HTMLDivElement> = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    const target = event.target as HTMLDivElement
    if (
      target.classList.contains('search__button') ||
      target.closest('.search__button')
    ) {
      setShowSearch(!showSearch)
      if (showSearch) {
        setResults(null)
        setSearchTerm('')
      }
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const target = e.target as HTMLInputElement
    setSearchTerm(target.value)
    setIsSearching(true)
  }
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

  return (
    <div>
      <div
        onClick={handleClick}
        className={`search  ${showSearch ? 'show-search' : ''}`}
        id="search-bar"
      >
        <input
          type="text"
          placeholder="Type something..."
          name="q"
          value={searchTerm}
          onChange={handleChange}
          className="search__input text-2xl bg-transparent text-background-main "
        />
        <div className="absolute right-24 top-7 ">
          {isSearching ? (
            <Loader2 size={15} className="animate-spin text-background-main" />
          ) : (
            <i className="ri-close-line search__close"></i>
          )}
        </div>
        <div
          className="search__button bg-primary-movieColor"
          id="search-button"
        >
          <i className="ri-search-2-line search__icon"></i>
          <i className="ri-close-line search__close"></i>
        </div>
        {searchTerm !== '' && (
          <div className="absolute w-full  left-0 top-24 bg-slate-800 px-1 py-1 rounded-lg">
            {results?.length > 0 && !isSearching ? (
              <>
                {results?.map((result: any) => {
                  const { categoryId } = result
                  return (
                    <div
                      className="flex items-center hover:bg-background-secondary px-7 py-4"
                      key={result._id}
                    >
                      <div>
                        <Avatar>
                          <AvatarImage src={result.image} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col ms-4 gap-1">
                        <span className="text-primary-movieColor text-2xl">
                          {result.name}
                        </span>
                        <div className="flex gap-2">
                          {categoryId.map(
                            (category: { _id: string; name: string }) => {
                              return (
                                <span key={category._id}>{category.name}</span>
                              )
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <>
                {isSearching && searchTerm !== '' ? (
                  <div className="flex items-center space-x-4 px-7 py-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ) : (
                  <div className="p-5 text-2xl">Không có kết quả</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar

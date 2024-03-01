import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
interface ResultType {
  _id: string
  name: string
  image: string
  categoryId: []
}
interface DropdownSearchItemType {
  results: ResultType[]
  isSearching: boolean
  searchTerm: string
}

function DropdownSearchItem({
  results,
  isSearching,
  searchTerm
}: DropdownSearchItemType) {
  return (
    <div className="absolute w-full  left-0 top-[46px] bg-slate-800 px-1 py-1 rounded-lg ">
      {results?.length > 0 && !isSearching ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
        >
          {results?.map((result: ResultType) => {
            const { categoryId } = result
            return (
              <motion.div
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 300, damping: 24 }
                  },
                  hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } }
                }}
                className="flex items-center hover:bg-[#303340] px-7 py-4 hover:cursor-pointer"
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
                          <span
                            className="text-xl text-[#cccdd0]"
                            key={category._id}
                          >
                            {category.name}
                          </span>
                        )
                      }
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <>
          {isSearching && searchTerm !== '' ? (
            <div className="flex items-center space-x-4 px-7 py-4">
              <Skeleton className="h-12 w-12 rounded-full bg-background-skeleton" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full bg-background-skeleton" />
                <Skeleton className="h-4 w-full bg-background-skeleton" />
              </div>
            </div>
          ) : (
            <div className="p-5 text-2xl">Không có kết quả</div>
          )}
        </>
      )}
    </div>
  )
}

export default DropdownSearchItem

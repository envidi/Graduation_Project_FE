import { Category } from '@/admin/types/category'
import { getAllCategory, removeCategory } from '@/api/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaEdit } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TableCategory = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  // fetch category by react-query
  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ['CATEGORY'],
    queryFn: getAllCategory
  })

  // delete category by mutation react-query
  const { mutate } = useMutation({
    mutationFn: removeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CATEGORY'] })
      toast.success('Xoa thành công')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Xoa that bai')
    }
  })

  const handleRemoveCategory = (id: string) => {
    mutate(id)
  }

  if (isLoading || !data) {
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
            navigate('/admin/category/add')
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
              {data.map((cate, index) => (
                <tr key={cate.name}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">
                      {index}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{cate.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          navigate(`/admin/category/edit/${cate._id}`)
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleRemoveCategory(cate._id)}
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

export default TableCategory
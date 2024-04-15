import { ConfirmDialog } from '@/admin/components/Confirm'
import { Cinema } from '@/admin/types/cenima'
import { getAllCinema, removeCinema } from '@/api/cinema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TableCinema = () => {
  const queryClient = useQueryClient()
  
  const [isOpenConfirm, setOpenConfirm] = useState(false)
  const idDelete = useRef<string>()

  const navigate = useNavigate()
  // fetch category by react-query
  const { data, isLoading, isError } = useQuery<Cinema[]>({
    queryKey: ['CINEMA'],
    queryFn: getAllCinema
  })

  console.log('data:', data)

  // delete category by mutation react-query
  const { mutate } = useMutation({
    mutationFn: removeCinema,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CINEMA'] })
      toast.success('Xoa thành công')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Xóa thất bại')
    }
  })

  const handleRemoveCinema = () => {
    mutate(idDelete.current!)
    setOpenConfirm(false)
  }

  const handleShowConfirm = (id: string) => {
    idDelete.current = id
    setOpenConfirm(true)
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
            navigate('/admin/cinema/add')
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
                  Cinema Name
                </th>                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Cinema address
                </th>                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  ScreeningRoomId
                </th>
                <th className="py-4 px-4 font-medium text-primary-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((cate, index) => (
                <tr key={cate.CinemaName}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">
                      {index}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{cate.CinemaName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{cate.CinemaAdress}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{cate.ScreeningRoomId}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          navigate(`/admin/cinema/edit/${cate._id}`)
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleShowConfirm(cate._id)}
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

      <ConfirmDialog
        open={isOpenConfirm}
        title="Bạn có chắc muốn xóa không"
        subTitle="Xóa đi không thể khôi phục"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleRemoveCinema}
      />
    </>
  )
}

export default TableCinema

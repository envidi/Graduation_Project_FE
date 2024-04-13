import { ConfirmDialog } from '@/admin/components/Confirm'
// import { Cinema } from '@/admin/types/cenima'
import { Movie } from '@/admin/types/movie'
import { getAllMovie, removeMovie } from '@/api/movie'
// import { getAllCinema, removeCinema } from '@/api/cinema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TableMovie = () => {
  const queryClient = useQueryClient()

  const [isOpenConfirm, setOpenConfirm] = useState(false)
  const idDelete = useRef<string>()
  const navigate = useNavigate()
  // fetch category by react-query
  const { data, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ['MOVIE'],
    queryFn: getAllMovie
  })
  // page
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  //tính mục phân trang
  const endIndex = currentPage * itemsPerPage
  const startIndex = endIndex - itemsPerPage
  const currentItems = (data && data.slice(startIndex, endIndex)) || []
  // Tính số trang
  const pageCount = data ? Math.floor(data.length / itemsPerPage) : 0
  //phương thức chuyển trang
  const setPage = (page: number) => {
    setCurrentPage(page)
  }
  console.log(pageCount)

  console.log('data:', data)

  // delete category by mutation react-query
  const { mutate } = useMutation({
    mutationFn: removeMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MOVIE'] })
      toast.success('Xoa thành công')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Xóa thất bại')
    }
  })

  const handleRemoveMovie = () => {
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
            navigate('/admin/movie/add')
          }}
          className="flex items-center justify-center border border-stroke py-2 px-4 rounded-full"
        >
          Add <FaPlusCircle size={20} className="ml-4" />
        </button>
      </div>
      {/*  */}
      <div className="rounded-sm border border-stroke bg-primary px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-primary-white xl:pl-11">
                  STT
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Tên phim
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Hình ảnh phim
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Ngôn ngữ
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Diễn viên
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Thời lượng
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Quốc gia
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Giới hạn tuổi
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Từ ngày
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Đến ngày
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Tác giả
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Ngôn ngữ
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Diễn viên
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Trailer
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Trạng thái
                </th>
                <th className="py-4 px-4 font-medium text-primary-white">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((movie, index) => (
                <tr key={movie.name}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">
                      {index + 1}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <img src={movie.image} alt="" className="w-full" />
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.language}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.actor}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.duration}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.country}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.age_limit}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.fromDate}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.toDate}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.author}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.language}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.actor}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-white hover:underline"
                    >
                      Watch Trailer
                    </a>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{movie.status}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pr-9 dark:border-strokedark">
                    <div className="flex justify-end space-x-4">
                      <button className="text-primary-white hover:underline" onClick={() => {
                        navigate(`/admin/movie/edit/${movie._id}`)
                      }}>
                        <FaEdit size={30}/>
                      </button>
                      <button className="text-primary-white hover:underline"  onClick={() => handleShowConfirm(movie._id)}>
                      <FaRegTrashCan size={30} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
      {/* <div className='pagination-controls'>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            disabled={currentPage === page}
            onClick={() => setPage(page)}
            // style={{ visibility: pageCount > 1 ? 'visible' : 'hidden' }}
            className='mg-2 border border-[#eee] py-6 px-5 dark:border-strokedark hover:bg-red-400'
          >
            {page}
          </button>
        ))}
      </div> */}
      <div className="pagination-controls">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            disabled={currentPage === page}
            onClick={() => setPage(page)}
            className="mx-2 px-4 py-2 border border-[#eee] dark:border-strokedark hover:bg-red-400"
          >
            {page}
          </button>
        ))}
      </div>

      <ConfirmDialog
        open={isOpenConfirm}
        title="Ban co chac muon xoa khong"
        subTitle="Xoa di se khong the khoi phuc"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleRemoveMovie}
      />
    </>
  )
}

export default TableMovie

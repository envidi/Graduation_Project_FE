import { ConfirmDialog } from '@/admin/components/Confirm'
// import { Cinema } from '@/admin/types/cenima'
import { Movie } from '@/admin/types/movie'
import { getAllMovie, removeMovie, softDeleteMovie } from '@/api/movie'
import { convertMintuteToHour, getDay, selectCalendar } from '@/utils'
// import { getAllCinema, removeCinema } from '@/api/cinema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
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
  console.log('data movie:',data)
  
  // page
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  //tính mục phân trang
  const endIndex = currentPage * itemsPerPage
  const startIndex = endIndex - itemsPerPage
  const currentItems = (data && data.slice(startIndex, endIndex)) || []
  // Tính số trang
  const pageCount = data ? Math.round(data.length / ITEMS_PER_PAGE) : 0
  //phương thức chuyển trang
  const setPage = (page: number) => {
    setCurrentPage(page)
  }
  console.log('data movie 2:',currentItems)
  
  // delete category by mutation react-query
  const { mutate } = useMutation({
    mutationFn: softDeleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MOVIE'] })
      toast.success('Xóa thành công')
    },
    onError: () => {
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
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
        <div className="max-w-full overflow-x-auto bg-white dark:bg-boxdark px-5 py-7 shadow-lg rounded-md scrollable-table">
          <div className="text-center mb-5 flex items-center justify-start space-x-4">
            <button
              onClick={() => {
                navigate('/admin/movie/add');
              }}
              className="bg-indigo-600 flex items-center px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-indigo-700 transition duration-300"
            >
              <span className="mr-2">Add</span>
              <FaPlusCircle size={20} />
            </button>
            <button
              onClick={() => {
                navigate('/admin/movie/softdelete');
              }}
              className="bg-red-500 px-5 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-red-600 transition duration-300">
              <FaRegTrashAlt />
            </button>
          </div>

          <table className=" w-full table-auto border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
            <thead>
              {/* <tr className="bg-gray-200 text-left dark:bg-meta-4 border border-gray-400 dark:border-strokedark"> */}
              <tr className="bg-gray-200 text-left dark:bg-meta-4 ">
                <th className="py-4 px-4 font-medium text-gray-800 xl:pl-11 border-b border-gray-400 dark:border-strokedark ">
                  STT
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Tên phim
                </th>
                <th className="min-w-[110px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Hình ảnh
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Ngôn ngữ
                </th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Diễn viên
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Thời lượng
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Quốc gia
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Giới hạn tuổi
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Từ ngày
                </th> */}
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Đến ngày
                </th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Tác giả
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Ngôn ngữ
                </th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Diễn viên
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">Đoạn phim giới thiệu</th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Trạng thái
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((movie, index) => (

                <tr
                  key={movie.name}
                  className="border-b border-gray-400 dark:border-strokedark"
                >
                  <td className="py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-gray-800">
                      {index + 1}
                    </p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.name}</p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <img src={movie.image} alt="" className="w-16" />
                  </td>
                  {/* <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.language}</p>
                  </td> */}
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.actor}</p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">
                      {convertMintuteToHour(movie.duration)}
                    </p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.country}</p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.age_limit}</p>
                  </td>
                  {/* <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">
                      {getDay(selectCalendar(movie.fromDate))}
                    </p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">
                      {getDay(selectCalendar(movie.toDate))}
                    </p>
                  </td> */}
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.author}</p>
                  </td>
                  {/* <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.language}</p>
                  </td> */}
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.actor}</p>
                  </td>
                  {/* <td className="py-5 px-4 dark:border-strokedark">
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:underline"
                    >
                      Xem đoạn giới thiệu
                    </a>
                  </td> */}
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">
                      {(() => {
                        switch (movie.status) {
                          case 'COMING_SOON':
                            return 'Sắp Công Chiếu';
                          case 'IS_SHOWING':
                            return 'Đang Công Chiếu';
                          case 'PRTMIERED':
                            return 'Đã Công Chiếu';
                          case 'CANCELLED':
                            return 'Đã Hủy';
                          default:
                            return movie.status;
                        }
                      })()}
                    </p>
                  </td>


                  <td className="px-5 py-5 border-b dark:border-strokedark bg-white dark:bg-boxdark text-sm flex flex-wrap justify-center gap-x-3 gap-y-3">
                    <div >
                        <button
                        onClick={() => navigate(`/admin/movie/edit/${movie._id}`)}
                          className="rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-ripple-light="true"
                          // disabled={movie.status === 'IS_SHOWING'}
                          disabled={movie.status === 'IS_SHOWING'}
                        >
                          Cập nhật
                        </button>
                    </div>
                    <div>
                      <button
                        className="rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={() => handleShowConfirm(movie._id)}
                        disabled={movie.status === 'IS_SHOWING'}
                      >
                        Xóa
                      </button>
                    </div>
                    <div>
                      <Link to={`/admin/movie/${movie.slug}`} className="inline-block">
                        <button
                          className="rounded-lg bg-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-400/20 transition-all hover:shadow-lg hover:shadow-green-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-ripple-light="true"
                        >
                          Chi tiết
                        </button>
                      </Link>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination-controls flex justify-center mt-4">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            disabled={currentPage === page}
            onClick={() => setPage(page)}
            className="mx-2 px-4 py-2 border border-[#eee] dark:border-strokedark hover:bg-gray-200"
          >
            {page}
          </button>
        ))}
      </div>
      <ConfirmDialog
        open={isOpenConfirm}
        title="Bạn có chắc muốn xóa không"
        subTitle="Xóa đi sẽ đưa vào thùng rác"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleRemoveMovie}
        titleStyle={{
          fontSize: '1.5rem',
          color: '#000',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}
        subTitleStyle={{
          fontSize: '1.2rem',
          color: '#000',
          marginBottom: '1rem'
        }}
      />
    </>
  )
}

export default TableMovie

import DefaultLayout from '@/admin/layout/DefaultLayout'
import { ContextMain } from '@/context/Context'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegTrashAlt } from 'react-icons/fa'
import { convertAmPm, getDay, getHourAndMinute } from '@/utils'

const Showtimes = () => {
  const { allShowTimes, showTimeSoft, removeShowtimeSoft } =
    useContext(ContextMain)
  const [confirmItemId, setConfirmItemId] = useState(null) // State để lưu id của item được chọn xóa
  const [conFirm, setConFirm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5) // Số người dùng trên mỗi trang

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage

  // Lấy mảng người dùng cho trang hiện tại
  const currentShowtime = allShowTimes?.slice(
    indexOfFirstUser,
    indexOfLastUser
  )

  // Logic xử lý khi chuyển trang
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber)
  // Tính toán số trang
  const pageNumbers = []
  for (
    let i = 1;
    i <= Math.ceil(allShowTimes?.length / usersPerPage);
    i++
  ) {
    pageNumbers.push(i)
  }

  const handleNextPage = () =>{
    if(currentPage < pageNumbers.length){
      setCurrentPage((pre) => pre + 1)
    }
  }

  const formatDate = (dateTimeString: any, type: string) => {
    const date = new Date(dateTimeString)
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    if (type == 'hour') {
      return getHourAndMinute(convertAmPm(formattedDate))
    }
    return getDay(convertAmPm(formattedDate))
  }

  // const isPastTime = (endTime: any) => {
  //   return moment().isAfter(endTime)
  // }
  // const handleDelete = (itemId: any) => {
  //   setConfirmItemId(itemId) // Lưu id của item được chọn vào state
  //   setConFirm(true) // Hiển thị modal
  // }

  const handleConfirmDelete = () => {
    if (confirmItemId) {
      removeShowtimeSoft
        .mutate(confirmItemId)
        .then(() => {
          toast.success('Xóa lịch chiếu thành công')
        })
        .catch((error: any) => {
          toast.error(`Lỗi khi xóa: ${error.message}`)
        })
        .finally(() => {
          setConfirmItemId(null)
          setConFirm(false)
        })
    }
  }
  return (
    <>
      <DefaultLayout>
        <div className="bg-white dark:bg-boxdark p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Lịch chiếu</h2>
              <span className="text-xs">Tất cả lịch chiếu</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="lg:ml-40   space-x-8">
                <Link to={'/admin/showtimes/create'}>
                  <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    Tạo lịch chiếu
                  </button>
                </Link>

                <Link to={'/admin/showtimes/restore'}>
                  <button className="bg-red-500 px-5 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer ">
                    <FaRegTrashAlt />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="w-full table-auto border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
                  <thead>
                    <tr>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        STT
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Phòng Chiếu
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Tên Phim
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Ngày Chiếu
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Giờ chiếu
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Kết thúc
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider ">
                        Số ghế
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Trạng Thái
                      </th>
                      <th
                        className=" py-3 border-b-2 border-gray-200 bg-gray-100  text-[10px] font-semibold text-gray-600 uppercase tracking-wider text-center"
                        colSpan={2}
                      >
                        Hành Động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentShowtime?.map((item: any, index: any) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200  text-sm ">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap ">
                                {index +1}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200  text-sm ">
                          <div className="flex items-center text-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap text-center">
                                {item?.screenRoomId?.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {' '}
                            {item?.movieId?.name}
                          </p>
                        </td>
                        <td className="px-4 py-5 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatDate(item?.date, 'day')}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatDate(item?.timeFrom, 'hour')}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatDate(item?.timeTo, 'hour')}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.SeatId ? item?.SeatId.length : 0}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                          {item?.status === 'Cancelled' ? (
                            <span className="relative inline-block px-3 py-1 font-semibold  text-red-900 leading-tight w-full text-center ">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full "
                              ></span>
                              <span className="relative ">{item?.status}</span>
                            </span>
                          ) : (
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight w-full text-center ">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full "
                              ></span>
                              <span className="relative ">{item?.status}</span>
                            </span>
                          )}
                        </td>

                        <td className="px-3 py-5 border-b border-gray-200 text-sm ">
                          <div>
                            <Link to={`/admin/showtimes/update/${item?._id}`}>
                              <button
                                className="middle none center  rounded-lg bg-blue-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                              >
                                Update
                              </button>
                            </Link>
                          </div>
                          <div>
                            {/* <button
                              className={`middle none center mr-4 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${
                                isPastTime(item?.timeTo)
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-red-500 hover:shadow-lg hover:shadow-red-500/40 shadow-red-500/20'
                              }`}
                              data-ripple-light="true"
                              onClick={() => handleDelete(item._id)}
                              disabled={isPastTime(item?.timeTo)}
                            >
                              Delete
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>


              
                </table>
                <nav
                aria-label="Page navigation"
                className="flex items-center justify-center mt-3"
              >
                <ul className="inline-flex space-x-2">
                <li>
                        <button className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100" onClick={handleNextPage}>
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </li>
                  {pageNumbers.map((number) => (
                    <>
                     
                      <li>
                        <button
                          className="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
                          onClick={() => paginate(number)}
                        >
                          {number}
                        </button>
                      </li>

                    
                    </>
                  ))}
                    <li>
                        <button className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </li>
                </ul>
              </nav>
              
              </div>
            </div>
          </div>
        </div>

        {/* modal */}
        {conFirm && (
          <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 h-screen">
            <div className="bg-white px-16 py-14 rounded-md text-center">
              <h1 className="text-xl mb-4 font-bold text-slate-500">
                Do you Want Delete
              </h1>
              <button
                className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setConFirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                onClick={handleConfirmDelete}
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </DefaultLayout>
    </>
  )
}

export default Showtimes

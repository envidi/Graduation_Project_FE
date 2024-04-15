import DefaultLayout from '@/admin/layout/DefaultLayout'
import { ContextMain } from '@/context/Context'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegTrashAlt } from "react-icons/fa";

const Showtimes = () => {
  const { allShowTimes, removeShowtime, showTimeSoft, removeShowtimeSoft } =
    useContext(ContextMain)
  const [confirmItemId, setConfirmItemId] = useState(null) // State để lưu id của item được chọn xóa
  const [conFirm, setConFirm] = useState(false)
  console.log('check', allShowTimes)
  const formatDate = (dateTimeString: any) => {
    const date = new Date(dateTimeString)
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    return formattedDate
  }
  console.log('check soft ', showTimeSoft)

  const handleDelete = (itemId: any) => {
    setConfirmItemId(itemId) // Lưu id của item được chọn vào state
    setConFirm(true) // Hiển thị modal
  }

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

const Showtimes = () => {
  const { allShowTimes, removeShowtime } = useContext(ContextMain)
  const [confirmItemId, setConfirmItemId] = useState(null); // State để lưu id của item được chọn xóa
  const [conFirm , setConFirm]  = useState(false)
  console.log('check', allShowTimes)
  const formatDate = (dateTimeString:any) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  };
  const handleDelete = (itemId:any) => {
    setConfirmItemId(itemId); // Lưu id của item được chọn vào state
    setConFirm(true); // Hiển thị modal
  };

  const handleConfirmDelete = () => {
    if (confirmItemId) {
      removeShowtime.mutate(confirmItemId)
        .then(() => {
          toast.success('Xóa lịch chiếu thành công');
        })
        .catch((error:any) => {
          toast.error(`Lỗi khi xóa: ${error.message}`);
        })
        .finally(() => {
          setConfirmItemId(null);
          setConFirm(false); 
        });
    }
  };
  return (
    <>
      <DefaultLayout>
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Lịch chiếu</h2>
              <span className="text-xs">Tất cả lịch chiếu</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="lg:ml-40   space-x-8">
                <Link to={'/admin/showtimes/create'}>
                  <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    Create
                  </button>
                </Link>

                <Link to={'/admin/showtimes/restore'}>
                  <button className="bg-red-500 px-5 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer ">
                  <FaRegTrashAlt />

                  </button>
            <div className="flex items-center justify-between">
              <div className="lg:ml-40 ml-10 space-x-8">
              
                <Link to={"/admin/showtimes/create"}>
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                 Tạo
                </button>
                </Link>
               
              </div>
              
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Phòng Chiếu
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Tên Phim
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Ngày Chiếu Phim
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Bắt Đầu Chiếu Phim
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Kết Thúc Phim
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider ">
                        Số  ghế
                      </th>
                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Trạng Thái
                      </th>
                      <th  className=" py-3 border-b-2 border-gray-200 bg-gray-100  text-[10px] font-semibold text-gray-600 uppercase tracking-wider text-center" colSpan={2}>
                        Hành Động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allShowTimes?.map((item: any, index: any) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                           
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item?.screenRoomId?.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {' '}
                            {item?.movieId?.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatDate(item?.date)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatDate(item?.timeFrom)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatDate(item?.timeTo)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                          {item?.SeatId ? item?.SeatId.length : 0}
                          </p>
                          <p className="text-gray-900 whitespace-no-wrap">{formatDate(item?.date)}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{formatDate(item?.timeFrom)}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{formatDate(item?.timeTo)}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">{item?.status}</span>
                          </span>
                        </td>
                        <td>
                            <Link to={`/admin/showtimes/update/${item?._id}`}>
                            <button
                            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true" 
                          >
                          Cập nhật
                          </button>
                            </Link>
                        
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm flex'>
                          <div>
                          <Link to={`/admin/showtimes/update/${item?._id}`}>
                            <button
                              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-light="true"
                            >
                              Update
                            </button>
                          </Link>
                          </div>
                        <div>
                        <button
                            className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            onClick={() => handleDelete(item._id)}
                          >
                           Xóa
                          </button>
                        </div>

                      
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span className="text-xs xs:text-sm text-gray-900"></span>
                  <span className="text-xs xs:text-sm text-gray-900">
                 
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      sau
                    </button>
                    &nbsp; &nbsp;
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                     trước
                    </button>
                  </div>
                </div>
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
  <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
  <div className="bg-white px-16 py-14 rounded-md text-center">
    <h1 className="text-xl mb-4 font-bold text-slate-500">Bạn có muốn xóa</h1>
    <button className="bg-red-500 px-4 py-2 rounded-md text-md text-white" onClick={() => setConFirm(false)}>Hủy bỏ</button>
    <button className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={handleConfirmDelete}>Ok</button>
  </div>
</div>
        )}
      
      </DefaultLayout>
    </>
  )
}

export default Showtimes

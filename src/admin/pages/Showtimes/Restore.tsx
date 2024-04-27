import DefaultLayout from '@/admin/layout/DefaultLayout'
import { ContextMain } from '@/context/Context'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { TbRestore } from 'react-icons/tb'

const Restore = () => {
  const { showTimeSoft, removeShowtime, restoreShowtime } =
    useContext<any>(ContextMain)
  const [confirmItemId, setConfirmItemId] = useState(null) // State để lưu id của item được chọn xóa
  const [confirmRestoreId, setConfirmRestoreId] = useState(null) // State để lưu id của item được chọn xóa
  const [conFirmRestore, setConFirmRestore] = useState(false)
  const [conFirm, setConFirm] = useState(false)
  const formatDate = (dateTimeString: any) => {
    const date = new Date(dateTimeString)
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    return formattedDate
  }
  const handleDelete = (itemId: any) => {
    setConfirmItemId(itemId) // Lưu id của item được chọn vào state
    setConFirm(true) // Hiển thị modal
  }
  const handleRestore = (itemId: any) => {
    setConfirmRestoreId(itemId) // Lưu id của item được chọn vào state
    setConFirmRestore(true) // Hiển thị modal
  }

  const handleConfirmDelete = () => {
    if (confirmItemId) {
      removeShowtime
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
  const handleConfirmRestore = () => {
    if (confirmRestoreId) {
      restoreShowtime
        .mutate(confirmRestoreId)
        .then(() => {
          toast.success('Xóa lịch chiếu thành công')
        })
        .catch((error: any) => {
          toast.error(`Lỗi khi xóa: ${error.message}`)
        })
        .finally(() => {
          setConfirmRestoreId(null)
          setConFirmRestore(false)
        })
    }
  }
  return (
    <DefaultLayout>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Phòng Chiếu
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên Phim
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Ngày Chiếu Phim
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Bắt Đầu Chiếu Phim
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Kết Thúc Phim
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Trạng Thái
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {showTimeSoft?.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {item?.screenRoomId.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-700">
                    {item?.movieId.name}
                  </span>
                </td>
                <td className="px-6 py-4">{formatDate(item?.date)}</td>
                <td className="px-6 py-4">{formatDate(item?.timeFrom)}</td>
                <td className="px-6 py-4">{formatDate(item?.timeTo)}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    {item?.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-between items-center gap-4">
                    <a href="#" onClick={() => handleDelete(item._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </a>

                    <TbRestore
                      className="text-2xl cursor-pointer"
                      onClick={() => handleRestore(item._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {conFirm && (
              <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
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

            {conFirmRestore && (
              <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-white px-16 py-14 rounded-md text-center">
                  <h1 className="text-xl mb-4 font-bold text-slate-500">
                    Bạn có muốn khôi phục không
                  </h1>
                  <button
                    className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                    onClick={() => setConFirmRestore(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                    onClick={handleConfirmRestore}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  )
}

export default Restore

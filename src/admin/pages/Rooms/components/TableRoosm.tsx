import { useEffect, useRef, useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { FaEdit, FaPlusCircle, FaTrashRestoreAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import {
  getAllRoomAdmin,
  getAllRooms,
  getOneRooms,
  SoftDeleteRooms
} from '@/api/screeningrooms'
import { Screeningrooms } from '@/Interface/screeningrooms'
import { ConfirmDialog } from '@/admin/components/Confirm'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import Loader from '@/admin/common/Loader'
// import moment from 'moment'

Modal.setAppElement('#root') // Tránh lỗi về accessibility

const ITEMS_PER_PAGE = 10
const TableRooms = () => {
  const [rooms, setRooms] = useState<Screeningrooms[]>([])
  const [selectedRoom, setSelectedRoom] = useState('')
  const [selectedShow, setSelectedShow] = useState('')
  
  const [idRoom, setIdRoom]=useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading, isError } = useQuery<Screeningrooms[]>({
    queryKey: ['ROOMS'],
    queryFn:()=> getAllRooms()
  })
  const { data: roomsData , isLoading: loadingDetail } = useQuery({
    queryKey: ['ROOMS', idRoom],
    queryFn: () => getOneRooms(idRoom)
  })

  const [isOpenConfirm, setOpenConfirm] = useState(false)
  const idDelete = useRef<string>()

  const { mutate } = useMutation({
    mutationFn: SoftDeleteRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ROOMS'] })
      toast.success('Xóa phòng thành công')
    },
    onError: () => {
      toast.error('Xóa phòng thất bại')
    }
  })
  const handleRemoveRoom = () => {
    mutate(idDelete.current!)
    setOpenConfirm(false)
  }
  const handleShowConfirm = (id: string) => {
    idDelete.current = id
    setOpenConfirm(true)
  }

  /*---------------Phân trang---------------- */
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  //tính mục phân trang
  const endIndex = currentPage * itemsPerPage
  const startIndex = endIndex - itemsPerPage
  const currentItems = (rooms && rooms.slice(startIndex, endIndex)) || []
  // Tính số trang
  const pageCount = rooms ? Math.ceil(rooms.length / itemsPerPage) : 0

  //phương thức chuyển trang
  const setPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, pageCount))
    setCurrentPage(newPage)
  }

  const MAX_VISIBLE_PAGES = 5
  const renderPagination = () => {
    const pages = []
    const halfWay = Math.ceil(MAX_VISIBLE_PAGES / 2)
    const isStart = currentPage <= halfWay
    const isEnd = pageCount - halfWay < currentPage
    const isMiddle = !isStart && !isEnd

    let ellipsis = false
    for (let i = 1; i <= pageCount; i++) {
      const pageInRange = isStart
        ? i <= MAX_VISIBLE_PAGES
        : isEnd
          ? pageCount - MAX_VISIBLE_PAGES < i
          : isMiddle
            ? currentPage - halfWay < i && i <= currentPage + halfWay - 1
            : false

      if (pageInRange) {
        pages.push(
          <PaginationItem
            key={i}
            {...(currentPage === i && { active: 'true' })}
          >
            <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
          </PaginationItem>
        )
        ellipsis = true
      } else if (ellipsis) {
        pages.push(
          <PaginationItem
            key={`ellipsis-${i}`}
            // disabled
          >
            <span className="px-3">...</span>
          </PaginationItem>
        )
        ellipsis = false
      }
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(currentPage - 1)}
              // disabled={currentPage === 1}
            />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(currentPage + 1)}
              // disabled={currentPage === pageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  useEffect(() => {
    const fecthRooms = async () => {
      try {
        const roomData = await getAllRoomAdmin({
          id: selectedRoom,
          _showId: selectedShow
        })
        setRooms(roomData)
      } catch (error) {
        throw new Error('Error fetching seats:')
      }
    }
    fecthRooms()
  }, [])
  /*------------------------------------------------- */



  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleOpenModal = (room: Screeningrooms) => {
    setIdRoom(room?._id!)
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
    // Thực hiện xử lý logic để trả về dữ liệu trống
  setSelectedShow(""); // Đặt giá trị mặc định cho selectedShow là ""
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="text-center mb-2 flex items-center justify-start">
        <button onClick={() => navigate('/admin/screeningrooms/add')} className="flex items-center justify-center border border-stroke py-2 px-4 rounded-full">
          Thêm <FaPlusCircle size={20} className="ml-4" />
        </button>
      </div>
      <div className="rounded-sm border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border-stroke">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-2 px-2 font-medium-600 text-primary-white xl:pl-11">STT</th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">Tên Phòng Chiếu</th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">Số Ghế</th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">Máy chiếu</th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">Trạng thái</th>
                <th className="py-4 px-4 font-medium-600 text-primary-white">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((room, index) => (
                <tr key={room._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {room.name}
                    <button
                      onClick={() => handleOpenModal(room)}
                      className="ml-2 text-gray-6 hover:text-blue-500"
                    >
                      <FaInfoCircle size={16} />
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{room.NumberSeat}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{room.projector}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{room.status}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/admin/screeningrooms/edit/${room._id}`)}
                        className="flex items-center justify-center text-gray-6 hover:text-gray-9"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleShowConfirm(room._id as string)}
                        className="flex items-center justify-center text-gray-6 hover:text-gray-9"
                      >
                        <FaTrashRestoreAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : ''}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hiển thị chi tiết phòng chiếu */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
            padding: '30px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <h2 style={{ color: 'red', borderBottom: '2px solid #ddd', paddingBottom: '10px', fontWeight: 'bold' }}>Chi tiết phòng chiếu</h2>
        
          <div>
            {loadingDetail ? (
              <div>Loading...</div>
            ) : (
              <table className="w-full table-auto" style={{ marginTop: '20px', lineHeight: '1.5', fontSize: '16px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Tên phòng:</td>
                    <td style={{ padding: '10px 0' }}>{roomsData?.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Chọn lịch chiếu:</td>
                    <td style={{ padding: '10px 0' }}>
                      <select
                        value={selectedShow}
                        onChange={(e) => setSelectedShow(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Chọn lịch chiếu</option>
                        {roomsData.ShowtimesId?.map((show: any) => (
                          <option key={show._id} value={show._id}>
                            {show.timeFrom} - {show.timeTo}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {selectedShow && (
                    <>
                      <tr>
                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Tên Phim:</td>
                        <td style={{ padding: '10px 0' }}>
                          {roomsData?.ShowtimesId &&
                            roomsData?.ShowtimesId.find((show: any) => show._id === selectedShow)?.movieId?.name}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Số ghế:</td>
                        <td style={{ padding: '10px 0' }}>{roomsData.NumberSeat}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Số ghế đã đặt:</td>
                        <td style={{ padding: '10px 0' }}>
                          {roomsData?.ShowtimesId &&
                            roomsData?.ShowtimesId.find((show: any) => show._id === selectedShow)?.SeatId?.seatSold}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Số ghế trống:</td>
                        <td style={{ padding: '10px 0' }}>
                          {roomsData?.ShowtimesId &&
                            roomsData?.ShowtimesId.find((show: any) => show._id === selectedShow)?.SeatId?.seatNotSold}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Ghế Vip:</td>
                        <td style={{ padding: '10px 0' }}>
                          {roomsData?.ShowtimesId &&
                            roomsData?.ShowtimesId.find((show: any) => show._id === selectedShow)?.SeatId?.seatVip.length}
                          <br />
                          {roomsData?.ShowtimesId &&
                            roomsData?.ShowtimesId.find((show: any) => show._id === selectedShow)?.SeatId?.seatVip[0]?.price + 'VĐN'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Ghế Thường:</td>
                        <td style={{ padding: '10px 0' }}>
                          {roomsData?.ShowtimesId &&
                            roomsData?.ShowtimesId.find((show: any) => show._id === selectedShow)?.SeatId?.seatNormal.length}
                          <br />
                          {roomsData?.ShowtimesId &&
                            roomsData?.ShowtimesId.find((show: any) => show._id === selectedShow)?.SeatId?.seatNormal[0]?.price +
                              'VĐN'}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            )}
          </div>
        <button
          onClick={handleCloseModal}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#0056b3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Đóng
        </button>
      </Modal>

      {renderPagination()}
      <ConfirmDialog
        open={isOpenConfirm}
        title="Bạn có chắc chắn muốn xóa không?"
        subTitle="Không thể hoàn tác hành động này"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleRemoveRoom}
      />
    </>
  )
}

export default TableRooms

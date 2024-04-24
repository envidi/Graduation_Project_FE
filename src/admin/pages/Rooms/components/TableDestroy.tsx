import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllRoomAdmin, getAllRoomsDestroy, HarddeleteRooms, undoSoftDeleteRooms } from '@/api/screeningrooms';
import { Screeningrooms } from '@/Interface/screeningrooms'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useState, useEffect } from 'react';
import Loader from '@/admin/common/Loader';



const ITEMS_PER_PAGE = 10
const TableRoomsDestroy = () => {

  const [rooms, setRooms] = useState<Screeningrooms[]>([])

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
          <PaginationItem key={`ellipsis-${i}`} disabled>
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
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  useEffect(() => {
    const fecthRooms = async () => {
      try {
        const roomData = await getAllRoomsDestroy()
        setRooms(roomData)
      } catch (error) {
        console.error('Error fetching seats:', error)
      }
    }
    fecthRooms()
  }, [])
  /*------------------------------------------------- */











  const navigate = useNavigate();
  // const history = useHistory();
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery<Screeningrooms[]>({
    queryKey: ['ROOMS'],
    queryFn: getAllRoomsDestroy

  })





  const undoSoftDeleteMutation = useMutation({
    mutationFn: undoSoftDeleteRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ROOMS'] });
      toast.success('Khôi phục thành công');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Khôi phục thất bại');
    },
  });
  const hardDeleteMutation = useMutation({
    mutationFn: HarddeleteRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ROOMS'] });
      toast.success('Xóa cứng thành công');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Xóa cứng thất bại');
    },
  });

  const handleRemoveRooms = (id: string, destroy: boolean) => {

    if (destroy) {
      // Nếu đã bị xóa mềm, hiển thị nút khôi phục
      undoSoftDeleteMutation.mutate(id);
      //   navigate()
    } else {
      // Nếu chưa bị xóa mềm, hiển thị nút xóa
      hardDeleteMutation.mutate(id);
    }
  };

  if (isLoading || !data) {
    return <Loader />
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>

      {/* Room Table */}
      <div className="rounded-sm border border-stroke px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-2 px-2 font-medium text-primary-white xl:pl-11">STT</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">NameRooms</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">NumberSeat</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Projector</th>
                {/* <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">CinemaName</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">CinemaAdress</th> */}
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Status</th>
                <th className="py-4 px-4 font-medium text-primary-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((rooms, index) => (
                <tr key={rooms._id}>

                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">{index + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.name ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.NumberSeat ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.projector ?? ''}</p>
                  </td>
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.CinemaId?.CinemaName ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.CinemaId?.CinemaAdress ?? ''}</p>
                  </td> */}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={`text-primary-white ${rooms.status ? 'text-success' : 'text-error'}`}>
                      {rooms.status ?? ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-2">


                      <button
                        onClick={() => {
                          if (window.confirm('Bạn có muốn khôi phục không?')) {
                            handleRemoveRooms(rooms._id as string, true);
                          }
                        }}
                        className="flex items-center justify-center text-gray-6 hover:text-gray-9"
                      >
                        <FaUndo size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Bạn có muốn xóa cứng không?')) {
                            handleRemoveRooms(rooms._id as string, false);
                          }
                        }}
                        className="flex items-center justify-center text-gray-6 hover:text-gray-9"
                      >
                        <FaTrashAlt size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {renderPagination()}
    </>
  );
};

export default TableRoomsDestroy;
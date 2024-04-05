import { Seat } from '@/admin/types/seat'
import { getAllSeatAdmin, removeSeat } from '@/api/seat'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaEdit } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConfirmDialog } from '@/admin/components/Confirm'
import { useState, useRef } from 'react'
import Loader from '@/admin/common/Loader'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'


const ITEMS_PER_PAGE = 10
// ...rest of your imports and TableSeat component
const TableSeat = () => {
    const { data, isLoading, isError } = useQuery<Seat[]>({
        queryKey: ['SEAT'],
        queryFn: getAllSeatAdmin
    })
    /*------------------------------------------------- */
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(ITEMS_PER_PAGE)
    //tính mục phân trang
    const endIndex = currentPage * itemsPerPage
    const startIndex = endIndex - itemsPerPage
    const currentItems = (data && data.slice(startIndex, endIndex)) || []
    // Tính số trang
    const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0

    //phương thức chuyển trang
    const setPage = (page: number) => {
        const newPage = Math.max(1, Math.min(page, pageCount))
        setCurrentPage(newPage)
    }

    const renderPagination = () => {
        const pages = Array.from({ length: pageCount }, (_, i) => i + 1)
        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>
                    {pages.map(page => (
                        <PaginationItem key={page} {...(currentPage === page && { active: "true" })}>
                            <PaginationLink onClick={() => setPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
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

    /*------------------------------------------------- */
    const queryClient = useQueryClient()
    const [isOpenConfirm, setOpenConfirm] = useState(false)
    const idDelete = useRef<string>()
    const navigate = useNavigate()


    const { mutate } = useMutation({
        mutationFn: removeSeat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['SEAT'] })
            toast.success('delete successfully')
        },
        onError: (error) => {
            console.log(error)
            toast.error('delete failed')
        }
    })

    const handleRemoveSeat = () => {
        mutate(idDelete.current!)
        setOpenConfirm(false)
    }
    const handleShowConfirm = (id: string) => {
        idDelete.current = id
        setOpenConfirm(true)
    }

    if (isLoading || !data) {
        return <Loader />
    }
    if (isError) {
        return <div>Error</div>
    }

    return (
        <>
            <div className="text-center mb-2 flex items-center justify-start">
                <button
                    onClick={() => {
                        navigate('/admin/seat/add')
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
                                    Type Seat
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                                    Price
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-primary-white">
                                    Row
                                </th>

                                <th className="py-4 px-4 font-medium text-primary-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((seat, index) => (
                                <tr key={seat._id}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-sm font-medium text-primary-white">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-primary-white">{seat.typeSeat}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-primary-white">${seat.price.toFixed(2)}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-primary-white">{seat.row}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                className="hover:text-primary"
                                                onClick={() => {
                                                    navigate(`/admin/seat/edit/${seat._id}`)
                                                }}
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                            <button
                                                className="hover:text-primary"
                                                onClick={() => handleShowConfirm(seat._id)}
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

            {renderPagination()}
            <ConfirmDialog
                open={isOpenConfirm}
                title='Are you sure you want to delete it?'
                subTitle='This action cannot be undone'
                onCancel={() => setOpenConfirm(false)}
                onConfirm={handleRemoveSeat}
            />
        </>

    )
}

export default TableSeat

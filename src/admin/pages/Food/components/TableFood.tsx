import { Food } from '@/admin/types/food'
import { getAllFood, removeFood } from '@/api/food'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaEdit } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConfirmDialog } from '@/admin/components/Confirm'
import { useState, useRef } from 'react'
import Loader from '@/admin/common/Loader'


const ITEMS_PER_PAGE = 10
// ...rest of your imports and TableFood component
const TableFood = () => {
    const { data, isLoading, isError } = useQuery<Food[]>({
        queryKey: ['FOOD'],
        queryFn: getAllFood
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
        setCurrentPage(page)
    }

    /*------------------------------------------------- */
    const queryClient = useQueryClient()
    const [isOpenConfirm, setOpenConfirm] = useState(false)
    const idDelete = useRef<string>()
    const navigate = useNavigate()



    const { mutate } = useMutation({
        mutationFn: removeFood,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['FOOD'] })
            toast.success('delete successfully')
        },
        onError: (error) => {
            console.log(error)
            toast.error('delete failed')
        }
    })

    const handleRemoveFood = () => {
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
                        navigate('/admin/food/add')
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
                                    Name
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                                    Image
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-primary-white">
                                    Price
                                </th>
                                <th className="py-4 px-4 font-medium text-primary-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((food, index) => (
                                <tr key={food._id}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-sm font-medium text-primary-white">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-primary-white">{food.name}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <img src={food.image} alt={food.name} className="w-20 h-20 object-cover rounded-full" />
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-primary-white">${food.price.toFixed(2)}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                className="hover:text-primary"
                                                onClick={() => {
                                                    navigate(`/admin/food/edit/${food._id}`)
                                                }}
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                            <button
                                                className="hover:text-primary"
                                                onClick={() => handleShowConfirm(food._id)}
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
            <div className='pagination-controls'>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        disabled={currentPage === page}
                        onClick={() => setPage(page)}
                    // style={{ visibility: pageCount > 1 ? 'visible' : 'hidden' }}
                    >
                        {page}
                    </button>
                ))}
            </div>



            <ConfirmDialog
                open={isOpenConfirm}
                title='Are you sure you want to delete it?'
                subTitle='This action cannot be undone'
                onCancel={() => setOpenConfirm(false)}
                onConfirm={handleRemoveFood}
            />
        </>

    )
}

export default TableFood

import Loader from '@/admin/common/Loader'
import { FormSeatAdd } from '@/admin/types/seat'
import { addSeat, editSeat, getOneSeat } from '@/api/seat'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormSeatProps = {
    typeForm: 'ADD' | 'EDIT';
};

const SeatForm = ({ typeForm }: FormSeatProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const { id } = useParams()
    const { data: seatData, isLoading } = useQuery({
        queryKey: ['SEAT', id],
        queryFn: async () => {
            const data = await getOneSeat(id as string)
            setFieldValue('typeSeat', data?.typeSeat)
            setFieldValue('price', data?.price)
            setFieldValue('row', data?.row)
            setFieldValue('column', data?.column)
            setFieldValue('status', data?.status)
            setFieldValue('ScreeningRoomId', data?.ScreeningRoomId)
            setFieldValue('ShowScheduleId', data?.ShowScheduleId)
            return data
        },
        enabled: typeForm === 'EDIT' && !!id
    })

    const { mutate } = useMutation({
        mutationFn: async (bodyData: FormSeatAdd) => {
            if (typeForm === 'EDIT') return editSeat(bodyData, id as string)
            return addSeat(bodyData)
        },
        onSuccess: () => {
            if (typeForm === 'EDIT') {
                toast.success('Edit seat successfully')
                navigate('/admin/seat')
                return
            }
            toast.success('Add seat successfully')
            navigate('/admin/seat')
        },
        onError: () => {
            if (typeForm === 'EDIT') {
                toast.error('Edit seat failed')
                return
            }
            toast.error('Add seat failed')
        }
    })

    const {
        values,
        setFieldValue,
        touched,
        errors,
        handleSubmit,
        handleChange,
        handleBlur
    } = useFormik({
        initialValues: {
            typeSeat: id ? (seatData?.typeSeat as 'Unavailable' | 'normal' | 'VIP') : 'normal',
            price: id ? (seatData?.price as number) : 0,
            row: id ? (seatData?.row as number) : 0,
            column: id ? (seatData?.column as number) : 0,
            status: id ? (seatData?.status as 'Available' | 'Sold' | 'Reserved' | 'Unavailable') : 'Available',
            ScreeningRoomId: id ? (seatData?.ScreeningRoomId as string) : '',
            ShowScheduleId: id ? (seatData?.ShowScheduleId as string) : ''
        },
        validate: (values) => {
            const errors: Partial<FormSeatAdd> = {}
            if (!values.typeSeat) {
                errors.typeSeat = 'Required type of seat'
            }
            if (values.price <= 0) {
                errors.price = 'Price must be greater than 0'
            }
            if (values.row <= 0) {
                errors.row = 'Row must be greater than 0'
            }
            if (values.column <= 0) {
                errors.column = 'Column must be greater than 0'
            }
            if (!values.ScreeningRoomId) {
                errors.ScreeningRoomId = 'Required Screening Room ID'
            }
            if (!values.ShowScheduleId) {
                errors.ShowScheduleId = 'Required Show Schedule ID'
            }
            return errors
        },
        onSubmit: async (values) => {
            try {
                const response = await mutate(values)
                console.log('res', response)
            } catch (error) {
                console.log('error', error)
            }
        }
    })

    if (isLoading) return <Loader />

    return (
        <div className="flex flex-col gap-9 items-center justify-center p-8">
            <button
                onClick={handleBack}
                className="self-start mb-4 flex items-center text-lg text-gray-700 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"

            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Back
            </button>
            <div className="max-w-lg w-full rounded-lg shadow-md overflow-hidden">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6">
                    <div className='mb-6'>
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Type of Seat
                        </label>
                        <select
                            name="typeSeat"
                            value={values.typeSeat}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm py-3 px-5 text-lg text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition ease-in-out duration-150"
                        >
                            <option value="Unavailable">Unavailable</option>
                            <option value="normal">Normal</option>
                            <option value="VIP">VIP</option>
                        </select>
                        {touched.typeSeat && errors.typeSeat && (
                            <div>{errors.typeSeat}</div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Price
                        </label>
                        <input
                            name="price"
                            type="number"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter seat price"
                            className="w-full rounded-md border-gray-300 shadow-sm py-3 px-5 text-lg text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition ease-in-out duration-150"
                        />
                        {errors.price && (
                            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.price}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Row
                        </label>
                        <input
                            name="row"
                            type="number"
                            value={values.row}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter seat row"
                            className="w-full rounded-md border-gray-300 shadow-sm py-3 px-5 text-lg text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition ease-in-out duration-150"
                        />
                        {errors.row && (
                            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.row}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Column
                        </label>
                        <input
                            name="column"
                            type="number"
                            value={values.column}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter seat row"
                            className="w-full rounded-md border-gray-300 shadow-sm py-3 px-5 text-lg text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition ease-in-out duration-150"
                        />
                        {errors.column && (
                            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.column}
                            </div>
                        )}
                    </div>

                    {/* <div className='mb-6'>
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Screening Room ID
                        </label>
                        <select
                            name="ScreeningRoomId"
                            value={values.ScreeningRoomId}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm py-3 px-5 text-lg text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition ease-in-out duration-150"
                        >
                            <option value="normal">Normal</option>
                            <option value="VIP">VIP</option>
                        </select>
                        {touched.ScreeningRoomId && errors.ScreeningRoomId && (
                            <div>{errors.ScreeningRoomId}</div>
                        )}
                    </div> */}










                    <button
                        className="w-full flex justify-center items-center rounded-md bg-indigo-600 py-3 px-6 text-xl font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-colors duration-300"
                        type="submit"
                    >
                        {typeForm === 'ADD' ? 'Add Seat' : 'Update Seat'}
                    </button>

                </form>
            </div>

        </div>
    )
}

export default SeatForm
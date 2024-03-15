import Loader from '@/admin/common/Loader'
import { Food, FormFoodAdd } from '@/admin/types/food'
import { addFood, editFood, getFoodById } from '@/api/food'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormFoodProps = {
    typeForm: 'ADD' | 'EDIT'
}

const FormFood = ({ typeForm }: FormFoodProps) => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: foodData, isLoading } = useQuery<Food>({
        queryKey: ['FOOD', id],
        queryFn: async () => {
            const data = await getFoodById(id as string)
            setFieldValue('name', data?.name)
            setFieldValue('price', data?.price)
            setFieldValue('image', data?.image)
            return data
        },
        enabled: typeForm === 'EDIT' && !!id
    })

    const { mutate } = useMutation({
        mutationFn: async (bodyData: Food) => {
            if (typeForm === 'EDIT') return editFood(bodyData, id as string)
            return addFood(bodyData)
        },
        onSuccess: () => {
            if (typeForm === 'EDIT') {
                toast.success('Edit food successfully')
                navigate('/admin/food')
                return
            }
            toast.success('Add food successfully')
            navigate('/admin/food')
        },
        onError: () => {
            if (typeForm === 'EDIT') {
                toast.error('Edit food failed')
                return
            }
            toast.error('Add food failed')
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
            name: id ? (foodData?.name as string) : '',
            price: id ? (foodData?.price as number) : 0,
            image: id ? (foodData?.image as string) : ''
        },
        validate: (values) => {
            const errors: Partial<FormFoodAdd> = {}
            if (!values.name) {
                errors.name = 'Required food name'
            }
            if (!values.image) {
                errors.image = 'Required food price'
            }
            if (values.price <= 0) {
                errors.price = 'Price must be greater than 0'
            }
            return errors
        },
        onSubmit: async (values) => {
            try {
                const response = await mutate(values)
                console.log('res', response)
            } catch (error) {
                console.log('error')
            }
        }
    })
    const handleBack = () => {
        navigate(-1)
    }

    if (isLoading) return <Loader />

    return (
        <div className="flex flex-col gap-9">
            <button
                onClick={handleBack}
                className="mb-4 flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Back
            </button>
            <div className="rounded-lg shadow-lg overflow-hidden">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8">
                    <div className="mb-6">
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Food name
                        </label>
                        <input
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Enter food name"
                            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-4 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {touched.name && errors.name && (
                            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Food image
                        </label>
                        <input
                            name="image"
                            type="text"
                            value={values.image}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter image URL from Cloudinary"
                            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-4 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        {touched.image && errors.image && (
                            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.image}
                            </div>
                        )}
                        {values.image && (
                            <img src={values.image} alt="Food" className="w-32 h-32 object-cover rounded-lg" />
                        )}
                    </div>

                    {/* Price Input */}
                    <div className="mb-6">
                        <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Price
                        </label>
                        <input
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="number"
                            placeholder="Enter food price"
                            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-4 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {touched.price && errors.price && (
                            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.price}
                            </div>
                        )}
                    </div>

                    <button
                        className="w-full flex justify-center items-center rounded-md bg-indigo-600 py-3 px-6 text-lg font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-colors duration-200"
                        type="submit"
                    >
                        {typeForm === 'ADD' ? 'Add' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FormFood
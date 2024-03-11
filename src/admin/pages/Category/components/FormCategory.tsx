import { Category, FormCategoryAdd } from '@/admin/types/category'
import { addCategory, editCategory, getCategoryById } from '@/api/category'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormCategoryProps = {
  typeForm: 'ADD' | 'EDIT'
}

const FormCategory = ({ typeForm }: FormCategoryProps) => {
  const navigate = useNavigate()

  //get id from url
  const { id } = useParams()

  //get category by id
  const { data: categoryData, isLoading } = useQuery<Category>({
    queryKey: ['CATEGORY', id],
    queryFn: async () => {
      const data = await getCategoryById(id as string)

      setFieldValue('name', data?.name)
      return data
    },
    enabled: typeForm === 'EDIT' && !!id
  })

  // mutation react-query
  const { mutate } = useMutation({
    mutationFn: async (bodyData: FormCategoryAdd) => {
      if (typeForm === 'EDIT') return editCategory(bodyData, id as string)
      return addCategory(bodyData)
    },
    onSuccess: () => {
      if (typeForm === 'EDIT') {
        toast.success('Sua category thanh cong')
        navigate('/admin/category')
        return
      }
      toast.success('Them category thanh cong')
      navigate('/admin/category')
    },
    onError: () => {
      if (typeForm === 'EDIT') {
        toast.error('Sua category that bai')
        return
      }
      toast.error('Them category that bai')
    }
  })

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues: {
      name: id ? (categoryData?.name as string) : ''
    },
    validate: (values) => {
      const errors: Partial<FormCategoryAdd> = {}
      if (!values.name) {
        errors.name = 'Required category name'
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

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">
                  Category name
                </label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter category name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormCategory

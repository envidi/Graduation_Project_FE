import { getDetailUser, updateClient } from '@/api/auth'
import { USERDETAIL } from '@/utils/constant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import UploadImage from './components/UploadImage'

export interface UserUpdateType {
  name: string
  email: string
  address: string
  mobile: string
}

const Settings = () => {
  const queryClient = useQueryClient()

  const { data: userDetail, isLoading } = useQuery({
    queryKey: [USERDETAIL],
    queryFn: async () => {
      const token = localStorage.getItem('Accesstoken')
      if (token) {
        const { data } = await getDetailUser()

        return data
      }
      return token
    }
  })

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setValues
    // setFieldValue
  } = useFormik<UserUpdateType>({
    initialValues: {
      name: userDetail.message.name,
      email: userDetail.message.email,
      address: userDetail.message?.address || '',
      mobile: userDetail.message?.mobile || 0
    },
    validate: (values) => {
      const errors: Partial<UserUpdateType> = {}
      if (!values.name || values.name.length <= 6) {
        errors.name = 'Bắt buộc phải nhập name và phải lớn hơn 6 ký tự '
      }
      if (!values.address || values.address.length <= 6) {
        errors.address = 'Bắt buộc phải nhập address và phải lớn hơn 6 ký tự '
      }
      if (!values.mobile || values.mobile.length <= 6) {
        errors.mobile = 'Bắt buộc phải nhập mobile và phải lớn hơn 6 ký tự '
      }
      if (!values.email) {
        errors.email = 'Required email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Chưa nhập địa chỉ email'
      }

      return errors
    },
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        address: values.address
      }

      try {
        const response = await userUpdate.mutate(data)

        console.log('res', response)
      } catch (error) {
        console.log('error', error)
      }
    }
  })

  console.log('errors', errors)

  useEffect(() => {
    if (userDetail && userDetail.message)
      setValues({
        ...values,
        name: userDetail?.message?.name,
        email: userDetail?.message?.email,
        address: userDetail?.message?.address,
        mobile: userDetail?.message?.mobile
      })
  }, [userDetail])

  const userUpdate = useMutation({
    mutationFn: async (user: UserUpdateType) => await updateClient(user),
    onSuccess() {
      toast.success('Update Successfully ')
      queryClient.invalidateQueries({
        queryKey: [USERDETAIL]
      })
    },
    onError() {
      toast.error('Update faile, try again !!!!!!!')
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Cài đặt thông tin" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black ">Thông tin cá nhân</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black "
                        htmlFor="fullName"
                      >
                        Tên tài khoản
                      </label>
                      <div className="relative">
                        <input
                          className="w-full pl-2 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                          name="name"
                          id="name"
                          placeholder="Name..."
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.name && errors.name && (
                          <div className="text-red-500 text-sm">
                            {errors.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black "
                        htmlFor="mobile"
                      >
                        Số điện thoại
                      </label>
                      <input
                        className="w-full pl-2 rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                        type="text"
                        name="mobile"
                        id="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.mobile && errors.mobile && (
                        <div className="text-red-500 text-sm">
                          {errors.mobile}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black "
                      htmlFor="email"
                    >
                      Địa chỉ email
                    </label>
                    <div className="relative">
                      <input
                        className="w-full pl-2 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <div className="text-red-500 text-sm">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black "
                      htmlFor="email"
                    >
                      Địa chỉ
                    </label>
                    <div className="relative">
                      <input
                        className="w-full pl-2 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.address && errors.address && (
                        <div className="text-red-500 text-sm">
                          {errors.address}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5 pt-4">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* UPload Avatar */}
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black ">Ảnh đại diện</h3>
              </div>
              <div className="p-7">
                <div className="flex lg:flex-col  lg:items-center md:flex-row xs:flex-col xs:items-center md:space-x-5 lg:space-x-0 space-y-4 md:mb-5 xs:mb-5 lg:mt-3">
                  <span className="mb-1.5 text-xl">Chỉnh sửa ảnh đại diện</span>
                  <Avatar className="lg:w-40 lg:h-40 xs:w-48 xs:h-48 ">
                    <AvatarImage src={userDetail.message.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <UploadImage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Settings

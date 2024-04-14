import { getDetailUser, updateClient } from '@/api/auth'
import { USERDETAIL } from '@/utils/constant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../layout/DefaultLayout'

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
        errors.name = 'Bắt buộc phải nhập tên và phải lớn hơn 6 ký tự '
      }
      if (!values.address || values.address.length <= 6) {
        errors.address = 'Bắt buộc phải nhập địa chỉ và phải lớn hơn 6 ký tự '
      }
      if (!values.mobile || values.mobile.length <= 6) {
        errors.mobile = 'Bắt buộc phải nhập số điện thoại và phải lớn hơn 6 ký tự '
      }
      if (!values.email) {
        errors.email = 'Yêu cầu email'
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
      toast.success('Cập nhật thành công ')
      queryClient.invalidateQueries({
        queryKey: [USERDETAIL]
      })
    },
    onError() {
      toast.error('Cập nhật không thành công, hãy thử lại')
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

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

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black "
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={6}
                        placeholder="Write your bio here"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                      ></textarea>
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
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={userDetail.message.avatar ?? ''} alt="User" />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black ">
                        Chỉnh sửa ảnh đại diện
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Xoá
                        </button>
                        <button className="text-sm hover:text-primary">
                          Cập nhật
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click để tải lên</span>{' '}
                        hoặc Kéo thả ảnh vào đây
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
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
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Settings

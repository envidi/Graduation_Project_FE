import { Category } from '@/admin/types/category'
import Loading from '@/admin/components/Loading/Loading'

import { Movie, FormMovieAdd } from '@/admin/types/movie'
import { getAllCategory } from '@/api/category'
import { addMovie, editMovie, getOneMovie } from '@/api/movie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { ChangeEventHandler, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.css'
import { format } from 'date-fns'

type FormMovieProps = {
  typeForm: 'ADD' | 'EDIT'
}

const FormMovie = ({ typeForm }: FormMovieProps) => {
  // const [date, setDate] = useState(new Date())
  const [fromDate, setfromDate] = useState(new Date())
  const [toDate, settoDate] = useState(new Date())
  const [file, setFiles] = useState<File[]>([])

  //get id from url
  const { id } = useParams()

  // fetch category by react-query
  const {
    data: datacate,
    isLoading: isLoadingCategory,
    isError: iserrCategory
  } = useQuery<Category[]>({
    queryKey: ['CATEGORY'],
    queryFn: getAllCategory
  })

  const { data: movieData, isLoading } = useQuery<Movie>({
    queryKey: ['MOVIE', id],
    queryFn: async () => {
      const data = await getOneMovie(id as string)

      // pricesId = data.prices

      setFieldValue('name', data?.name)
      setFieldValue('image', data?.image)
      setFieldValue('author', data?.author)
      setFieldValue('language', data?.language)
      setFieldValue('actor', data?.actor)
      setFieldValue('trailer', data?.trailer)
      setFieldValue('fromDate', data?.fromDate)
      setFieldValue('toDate', data?.toDate)
      setFieldValue('desc', data?.desc)
      setFieldValue('image', data?.image)
      setFieldValue('country', data?.country)
      setFieldValue('duration', data?.duration)
      setFieldValue('status', data?.status)
      setFieldValue('age_limit', data?.age_limit)
      setFieldValue('rate', data?.rate)
      setFieldValue('showTimes', data?.showTimes)
      setFieldValue('price', data?.price)
      setFieldValue(
        'categoryId',
        data?.categoryCol.map((c: any) => c._id)
      )
      setFieldTouched('categoryId', true)
      return data
    },

    enabled: typeForm === 'EDIT' && !!id
  })

  // mutation react-query
  const { mutate, isPending } = useMutation({
    mutationFn: async (bodyData: FormMovieAdd) => {
      if (typeForm === 'EDIT') {
        return editMovie(bodyData, id as string)
      }

      return addMovie(bodyData)
    },
    onSuccess: () => {
      if (typeForm === 'EDIT') {
        toast.success('Sửa phim thành công')

        return
      }
      toast.success('Thêm phim thành công')
    },
    onError: (error: { response: { data: { message: string } } }) => {
      if (typeForm === 'EDIT') {
        toast.error('Sửa phim thất bại')
        return
      }

      toast.error(`${error.response.data.message}`)
    }
  })

  // selecttor categories
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const initialValues = {
    name: id ? (movieData?.name as string) : '',
    image: id ? (movieData?.image as string) : '',
    author: id ? (movieData?.author as string) : '',
    language: id ? (movieData?.language as string) : '',
    actor: id ? (movieData?.actor as string) : '',
    trailer: id ? (movieData?.trailer as string) : '',
    fromDate: id ? (movieData?.fromDate as string) : '',
    toDate: id ? (movieData?.toDate as string) : '',
    desc: id ? (movieData?.desc as string) : '',
    country: id ? (movieData?.country as string) : '',
    status: id ? (movieData?.status as string) : '',
    duration: id ? (movieData?.duration as number | undefined) : undefined,
    age_limit: id ? (movieData?.age_limit as number | undefined) : undefined,
    rate: id ? (movieData?.rate as number | undefined) : undefined,
    categoryId: id ? (movieData?.categoryId as string[]) : [],
    showTimes: id ? (movieData?.showTimes as string[]) : '',
    price: id ? (movieData?.rate as number | undefined) : undefined
  }
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<FormMovieAdd> = {}
      if (!values.name) {
        errors.name = 'Tên bắt buộc'
      } else if (values.name.length < 3) {
        errors.name = 'Tên phải dài ít nhất 3 ký tự'
      }
      if (!id) {
        if (!file[0]) {
          errors.image = 'Hình ảnh bắt buộc'
        }
      }
      if (!values.author) {
        errors.author = 'tác giả bắt buộc'
      } else if (values.author.length < 3) {
        errors.author = 'tác giả phải dài ít nhất 3 ký tự'
      }
      if (!values.language) {
        errors.language = 'Ngôn ngữ bắt buộc'
      } else if (values.language.length < 3) {
        errors.language = 'ngôn ngữ phải dài ít nhất 3 ký tự'
      }
      if (!values.desc) {
        errors.desc = 'Mô tả bắt buộc'
      } else if (values.desc.length < 3) {
        errors.desc = 'Mô tả phải dài ít nhất 3 ký tự'
      }
      if (!values.actor) {
        errors.actor = 'Diễn viên bắt buộc'
      } else if (values.actor.length < 3) {
        errors.actor = 'diễn viên phải dài ít nhất 3 ký tự'
      }
      if (!values.trailer) {
        errors.trailer = 'Đoạn giới thiệu bắt buộc'
      } else if (values.trailer.length < 3) {
        errors.trailer = 'đoạn giới thiệu phải dài ít nhất 3 ký tự'
      }
      // Kiểm tra nếu fromDate không hợp lệ
      if (!values.fromDate) {
        errors.fromDate = 'Dữ liệu bắt buộc nhập'
      }

      // Kiểm tra nếu toDate không hợp lệ
      if (!values.toDate) {
        errors.toDate = 'Dữ liệu bắt buộc nhập'
      }
      if (!values.country) {
        errors.country = 'Quốc gia bắt buộc'
      } else if (values.country.length < 3) {
        errors.country = 'quốc gia phải dài ít nhất 3 ký tự'
      }
      if (!values.duration) {
        errors.duration = 'Thời lượng bắt buộc'
      } else if (isNaN(values.duration) || Number(values.duration) <= 30) {
        errors.duration = 'Thời lượng phải là một số và lớn hơn 30'
      }
      if (!values.age_limit) {
        errors.age_limit = 'Yêu cầu độ tuổi_giới hạn'
      } else if (isNaN(values.age_limit) || Number(values.age_limit) <= 0) {
        errors.age_limit = 'Giới hạn tuổi phải là một số và lớn hơn 0'
      }
      if (!values.rate) {
        errors.rate = 'Tỷ lệ bắt buộc'
      } else if (
        isNaN(values.rate) ||
        (Number(values.rate) <= 0 && Number(values.rate) <= 1)
      ) {
        errors.rate = 'tỷ lệ phải là một số và lớn hơn 1'
      }
      if (!values.price) {
        errors.price = 'Bắt buộc nhập giá'
      } else if (isNaN(values.price) || Number(values.price) <= 0) {
        errors.price = 'Giá phải là một số và lớn hơn 0'
      }
      if (!values.status) {
        errors.status = 'trạng thái bắt buộc'
      } else if (values.status.length < 3) {
        errors.status = 'trạng thái phải dài ít nhất 3 ký tự'
      }
      if (!values.categoryId) {
        // errors.categoryId = 'Id danh mục bắt buộc'
      } else if (values.categoryId.length < 1 || values.categoryId.length > 3) {
        errors.categoryId = 'Danh mục phải từ 1 đến 3 loại'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        // chuyển đồi fromDat and toDate

        const data = new FormData()
        data.set('name', values?.name)
        data.set('avatar', file[0])
        data.set('author', values?.author)
        data.set('actor', values?.actor)
        data.set('language', values?.language)
        data.set('trailer', values?.trailer)
        data.set('age_limit', values?.age_limit)
        data.set('desc', values?.desc)
        data.set('duration', values?.duration)
        data.set('country', values?.country)
        data.set('status', values?.status)
        data.set('rate', values?.rate)
        // data.set('price', values?.price)
        data.set('toDate', values?.toDate)
        data.set('fromDate', values?.fromDate)
        const priceObj: any = [
          {
            dayType: 'weekday',
            price: values?.price
          },
          {
            dayType: 'weekend',
            price: values?.price * 1.5
          }
        ]

        for (let i = 0; i < values.categoryId.length; i++) {
          data.append('categoryId[]', values.categoryId[i])
        }
        data.append('prices[]', JSON.stringify(priceObj))
        await mutate(data)
      } catch (error) {
        throw new Error(error as string)
      }
    }
  })

  // select style
  const colourOptions = datacate?.map((cate) => ({
    value: cate._id,
    label: cate.name
  }))
  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value)
    handleChange({
      target: { name: 'categoryId', value: selectedValues }
    })
  }
  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const target = e.target as HTMLInputElement
    const filesTarget = target.files
    if (filesTarget) {
      const filesArray = Array.from(filesTarget)
      setFiles(filesArray)
    }
  }
  const selectedOptions = colourOptions?.filter((option: any) =>
    values.categoryId?.includes(option.value)
  )
  // sử lý validate  date
  // check from date lớn hơn hiện tại
  // Hàm kiểm tra xem một ngày có lớn hơn ngày hiện tại không
  // const isFutureDate = (date: any) => {
  //   const currentDate = new Date();
  //   return date > currentDate;
  // };
  //   // Hàm kiểm tra xem fromDate có nhỏ hơn toDate không
  // const isStartDateBeforeEndDate = (startDate, endDate) => {
  //   return new Date(startDate) < new Date(endDate);
  // };

  // select style
  const dropdownStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#cbd5e0'
      },
      '&:focus': {
        borderColor: '#63b3ed',
        boxShadow: '0 0 0 2px rgba(99, 179, 237, 0.2)'
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#edf2f7' : 'white',
      color: state.isSelected ? '#2d3748' : '#4a5568',
      '&:hover': {
        backgroundColor: state.isSelected ? '#edf2f7' : '#f7fafc',
        color: state.isSelected ? '#2d3748' : '#4a5568'
      }
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#e2e8f0',
      borderRadius: '9999px'
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#2d3748'
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#718096',
      '&:hover': {
        color: '#4a5568'
      }
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (isLoadingCategory) return <div>Loading category...</div>
  if (iserrCategory) {
    return <div>Error</div>
  }
  return (
    <div className="">
      {isPending ? (
        <Loading />
      ) : (
        <div className="border rounded bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="p-6 space-y-6"
          >
            {/* <div className="p-6.5 flex"> */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="mb-4.5 gap-6 w-full">
                {/* name */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Tên Phim
                  </label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder=" Nhập tên phim ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.name && errors.name && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/*  */}

                {/* actor */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Diễn viên
                  </label>
                  <input
                    name="actor"
                    value={values.actor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập tên diễn viên ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.actor && errors.actor && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.actor}
                    </div>
                  )}
                </div>
                {/* author */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Tác giả
                  </label>
                  <input
                    name="author"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập tên tác giả ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.author && errors.author && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.author}
                    </div>
                  )}
                </div>
                {/* language */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Ngôn Ngữ
                  </label>
                  <input
                    name="language"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập ngôn ngữ ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.language && errors.language && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.language}
                    </div>
                  )}
                </div>
                {/* trailer */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Đoạn phim giới thiệu
                  </label>
                  <input
                    name="trailer"
                    value={values.trailer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập trailer ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.trailer && errors.trailer && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.trailer}
                    </div>
                  )}
                </div>
                {/* age_limit */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Giới hạn tuổi
                  </label>
                  <input
                    name="age_limit"
                    value={values.age_limit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập giới hạn tuổi ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.age_limit && errors.age_limit && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.age_limit}
                    </div>
                  )}
                </div>
                {/* desc */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Mô tả
                  </label>
                  {/* <input
                  name="desc"
                  value={values.desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Nhập Mô tả ..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                /> */}
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                    name="desc"
                    value={values.desc}
                    placeholder="Nhập Mô tả ..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {touched.desc && errors.desc && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.desc}
                    </div>
                  )}
                </div>
                {/* country */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Quốc gia
                  </label>
                  <input
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập quốc gia ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.country && errors.country && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.country}
                    </div>
                  )}
                </div>
                {/* duration */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Thời lượng phim
                  </label>
                  {/* <input
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Thời lượng phim  ..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                /> */}
                  <input
                    name="duration"
                    value={values.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Nhập giới hạn tuổi ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />

                  {touched.duration && errors.duration && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.duration}
                    </div>
                  )}
                </div>
                {/* rate */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Rate
                  </label>
                  <input
                    name="rate"
                    value={values.rate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Nhập rate ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />
                  {touched.rate && errors.rate && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.rate}
                    </div>
                  )}
                </div>
                {/*  */}
              </div>

              <div className="p-2 mb-4.5 ml-8  flex-col gap-6 xl:flex-row">
                {/* category */}
                <div className="form-group">
                  <label className="block mb-2 font-medium text-primary dark:text-yellow-400">
                    Danh mục:
                  </label>
                  <Select
                    name="categoryId"
                    closeMenuOnSelect={false}
                    defaultValue={colourOptions?.filter((option) =>
                      initialValues?.categoryId?.includes(option.value)
                    )}
                    isMulti
                    options={colourOptions}
                    value={selectedOptions}
                    onChange={handleSelectChange}
                    onBlur={handleBlur}
                    styles={dropdownStyles}
                    className="w-full mt-1 px-4 py-2 rounded-md border border-purple-400 shadow-lg focus:ring-4 focus:border-primary dark:border-yellow-400 dark:bg-purple-900 dark:text-white hover:border-pink-500 focus:outline-none focus:ring-pink-500"
                  />
                  {touched.categoryId && errors.categoryId && (
                    <div className="text-red-500 text-sm font-bold mt-1">
                      {errors.categoryId}
                    </div>
                  )}
                </div>
                {/* image */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Ảnh Phim
                  </label>
                  <input
                    name="image"
                    onChange={handleChangeFile}
                    onBlur={handleBlur}
                    type="file"
                    placeholder="Nhập URL ảnh ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />
                  {touched.image && errors.image && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.image}
                    </div>
                  )}
                  {values.image && (
                    <img
                      src={values.image}
                      alt="movie"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
                {/* fromDate */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Từ ngày
                  </label>
                  <Flatpickr
                    name="fromDate"
                    defaultValue={initialValues?.toDate || ''}
                    options={{
                      dateFormat: 'd-m-Y H:i',
                      enableTime: true,
                      onChange: (selectedDates) => {
                        const formattedDate = format(
                          selectedDates[0],
                          'dd-MM-yyyy HH:mm'
                        )
                        setfromDate(selectedDates[0])
                        setFieldValue('fromDate', formattedDate)
                      }
                    }}
                    placeholder="DD/MM/YYYY"
                    className="appearance-none block w-full bg-white text-gray-800 border border-gray-300 rounded-md py-3 px-4 shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 transition duration-300 ease-in-out"
                    id="grid-last-time"
                    type="text"
                  />
                  {touched.fromDate && errors.fromDate && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.fromDate}
                    </div>
                  )}
                </div>
                {/* todate */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Đến ngày
                  </label>
                  <Flatpickr
                    name="toDate"
                    defaultValue={initialValues?.toDate || ''}
                    options={{
                      dateFormat: 'd-m-Y H:i',
                      enableTime: true,
                      onChange: (selectedDates) => {
                        const formattedDate = format(
                          selectedDates[0],
                          'dd-MM-yyyy HH:mm'
                        ) // Định dạng lại ngày giờ
                        settoDate(selectedDates[0])
                        setFieldValue('toDate', formattedDate)
                      }
                    }}
                    placeholder="DD/MM/YYYY"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-primary"
                    id="grid-last-time"
                    type="text"
                  />
                  {touched.toDate && errors.toDate && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.toDate}
                    </div>
                  )}
                </div>
                {/* prices */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Giá phim:
                  </label>
                  <input
                    name="price"
                    value={values?.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Nhập giá  ..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-default disabled:bg-white disabled:text-gray-500"
                  />
                  {touched.price && errors.price && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.price}
                    </div>
                  )}
                </div>
                {/* status */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Trạng thái:
                  </label>
                  <div className="inline-block relative w-full">
                    <select
                      className="block appearance-none w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      id="multiSelect"
                      name="status"
                      // value={selectedState}
                      // onChange={ }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option className="text-gray-900" value="">
                        -- Chọn trạng thái --
                      </option>
                      <option
                        className="text-gray-900"
                        value="COMING_SOON"
                        selected={values.status === 'COMING_SOON'}
                      >
                        COMING_SOON
                      </option>
                      <option
                        className="text-gray-900"
                        value="IS_SHOWING"
                        selected={values.status === 'IS_SHOWING'}
                      >
                        IS_SHOWING
                      </option>
                      <option
                        className="text-gray-900"
                        value="PRTMIERED"
                        selected={values.status === 'PRTMIERED'}
                      >
                        PRTMIERED
                      </option>
                      <option
                        className="text-gray-900"
                        value="CANCELLED"
                        selected={values.status === 'CANCELLED'}
                      >
                        CANCELLED
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                    </div>
                  </div>
                  {touched.status && errors.status && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.status}
                    </div>
                  )}
                </div>
                {/*  */}
              </div>
              {/*  */}
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-50 transition duration-300 mt-4"
              type="submit"
            >
              {typeForm === 'ADD' ? 'Add' : 'Update'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default FormMovie

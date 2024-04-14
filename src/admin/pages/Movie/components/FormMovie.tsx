import { Category } from '@/admin/types/category'
import { Movie, FormMovieAdd } from '@/admin/types/movie'
import { getAllCategory } from '@/api/category'
import { addMovie, editMovie, getOneMovie } from '@/api/movie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Flatpickr from 'react-flatpickr'

import { useState } from 'react'
type FormMovieProps = {
  typeForm: 'ADD' | 'EDIT'
}

const FormMovie = ({ typeForm }: FormMovieProps) => {
  // const [date, setDate] = useState(new Date())
  // const [fromDate, setfromDate] = useState(new Date())
  // const [toDate, settoDate] = useState(new Date())

  const navigate = useNavigate()

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
  //get movie by id
  let pricesId

  const { data: movieData, isLoading } = useQuery<Movie>({
    queryKey: ['MOVIE', id],
    queryFn: async () => {
      const data = await getOneMovie(id as string)

      pricesId = data.prices

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
      setFieldValue('prices', data?.prices)
      setFieldValue('categoryId', data?.categoryId)
      return data
    },

    enabled: typeForm === 'EDIT' && !!id
  })

  // mutation react-query
  const { mutate } = useMutation({
    mutationFn: async (bodyData: FormMovieAdd) => {
      if (typeForm === 'EDIT') {
        // await editMoviePice(bodyData.prices[0].price as number, pricesId[0] as string)
        // await editMoviePice(bodyData.prices[1].price, pricesId[1] as string)
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
    onError: () => {
      if (typeForm === 'EDIT') {
        toast.error('Sửa phim thông công')
        return
      }
      toast.error('Thêm phim thành công')
    }
  })

  // selecttor categories
  // const [selectedCategories, setSelectedCategories] = useState([]);

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
      duration: id ? (movieData?.duration as number | undefined) : undefined,
      status: id ? (movieData?.status as string) : '',
      age_limit: id ? (movieData?.age_limit as number | undefined) : undefined,
      rate: id ? (movieData?.rate as number | undefined) : undefined,
      categoryId: id ? (movieData?.categoryId as string[]) : [],
      showTimes: id ? (movieData?.showTimes as string[]) : '',
      prices: id ? (movieData?.prices as string[]) : '',
      priceweekday: 0,
      dayTypeweekday: '',
      pricesweekend: '',
      dayTypeweekend: 0
    },
    validate: (values) => {
      const errors: Partial<FormMovieAdd> = {}
      if (!values.name) {
        errors.name = 'Tên bắt buộc'
      } else if (values.name.length < 3) {
        errors.name = 'Tên phải dài ít nhất 3 ký tự'
      }
      if (!values.image) {
        errors.image = 'Hình ảnh bắt buộc'
      } else if (values.image.length < 3) {
        errors.image = 'hình ảnh phải dài ít nhất 3 ký tự'
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
      if (!values.fromDate) {
        errors.fromDate = 'Bắt buộc từ Ngày'
      }
      if (!values.toDate) {
        errors.toDate = 'Required toDate'
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
      if (!values.priceweekday) {
        errors.priceweekday = 'Giá yêu cầu ngày trong tuần'
      } else if (
        isNaN(values.priceweekday) ||
        Number(values.priceweekday) <= 30
      ) {
        errors.priceweekday =
          'giá ngày trong tuần phải là một số và lớn hơn 30'
      }
      if (!values.pricesweekend) {
        errors.pricesweekend = 'Giá yêu cầu cuối tuần'
      } else if (
        isNaN(values.pricesweekend) ||
        Number(values.pricesweekend) <= 30
      ) {
        errors.pricesweekend =
          'giácuối tuần phải là một số và lớn hơn 30'
      }
      if (!values.age_limit) {
        errors.age_limit = 'Yêu cầu độ tuổi_giới hạn'
      } else if (isNaN(values.age_limit) || Number(values.age_limit) <= 0) {
        errors.age_limit = 'age_limit phải là một số và lớn hơn 30'
      }
      if (!values.rate) {
        errors.rate = 'Tỷ lệ bắt buộc'
      } else if (isNaN(values.rate) || Number(values.rate) <= 0) {
        errors.rate = 'tỷ lệ phải là một số và lớn hơn 30'
      }
      if (!values.status) {
        errors.status = 'trạng thái bắt buộc'
      } else if (values.status.length < 3) {
        errors.status = 'trạng thái phải dài ít nhất 3 ký tự'
      }

      if (!values.categoryId) {
        errors.categoryId = 'Id danh mục bắt buộc'
      } else if (values.categoryId.length < 1) {
        errors.categoryId = 'id danh mục phải dài ít nhất 3 ký tự'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        const newObject = {
          price: values?.priceweekday,
          dayType: 'weekday'
        }
        const newObject2 = {
          price: values?.pricesweekend,
          dayType: 'weekend'
        }

        values.prices = [newObject, newObject2]
        const bodyData = {
          name: values?.name,
          image: values?.image,
          author: values?.author,
          actor: values?.actor,
          language: values?.language,
          trailer: values?.trailer,
          fromDate: values?.fromDate,
          age_limit: values?.age_limit,
          toDate: values?.toDate,
          desc: values?.desc,
          duration: values?.duration,
          country: values?.country,
          status: values?.status,
          rate: values?.rate,
          categoryId: values?.categoryId || [],
          showTimes: values?.showTimes || [],
          prices: values?.prices
        }

        await mutate(bodyData)
        // console.log('res', response)
      } catch (error) {
        console.log('error', error)
      }
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (isLoadingCategory) return <div>Loading category...</div>
  if (iserrCategory) {
    return <div>Error</div>
  }
  return (
    <div className="">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} encType='multipart/form-data' className="bg-white dark:bg-gray-800 p-6">
          <div className="p-6.5 flex" >
            <div className="mb-4.5 gap-6 w-1/2">
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />


                {touched.name && errors.name && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.name}
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
                  value={values.image}
                  // // onChange={handleChange}
                  // onChange={(event) => {
                  //   setFieldValue('image', event.currentTarget.files[0]);
                  // }}
                  // type="file"

                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Nhập URL ảnh ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
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
              {/*  */}
              {/* <div className="mb-6">
                <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Movie image
                </label>
                <input
                  name="image"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('image', event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                  className="w-full rounded-md border-gray-300 shadow-sm py-3 px-5 text-lg text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition ease-in-out duration-150" />
                {touched.image && errors.image && (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.image}
                  </div>
                )}
                {values.image && (
                  <img src={values.image} alt="Food" className="w-32 h-32 object-cover rounded-lg" />
                )}
              </div> */}
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />

                {touched.age_limit && errors.age_limit && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.age_limit}
                  </div>
                )}
              </div>
              {/* fromDate */}
              <div className=" relative z-0 mb-6 w-full group">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Từ ngày
                </label>
                <input
                  name="fromDate"
                  value={values.fromDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Nhập từ ngày ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />

                {touched.fromDate && errors.fromDate && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.fromDate}
                  </div>
                )}
              </div>
              {/* <div className="relative z-0 mb-6 w-full group">
                <Flatpickr
                  name="date"
                  // value={date}
                  options={{
                    dateFormat: 'd-m-Y H:i',
                    enableTime: true,
                    onChange: (selectedDates) => {
                      const formattedDate = format(selectedDates[0], 'dd-MM-yyyy HH:mm'); // Định dạng lại ngày giờ
                      setDate(selectedDates[0]);
                      formikValidate.setFieldValue('date', formattedDate);
                    }
                  }}
                  placeholder="Nhập  ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white pt-3"
                />
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Ngày Khởi Chiếu
                </label>
              </div> */}
              {/* todate */}
              <div className=" relative z-0 mb-6 w-full group">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Đến ngày
                </label>
                <input
                  name="toDate"
                  value={values.toDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Nhập đến ngày ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />

                {touched.toDate && errors.toDate && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.toDate}
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                /> */}
                <textarea
                  className='w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white'
                  name="desc"
                  placeholder="Nhập Mô tả ..."
                  onChange={handleChange}
                  onBlur={handleBlur}

                >
                </textarea>
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
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
                <input
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Thời lượng phim  ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />

                {touched.duration && errors.duration && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.duration}
                  </div>
                )}
              </div>
              {/* status */}
              {/* <div className=" relative z-0 mb-6 w-full group">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  status
                </label>
                <input
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter status"
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />
                {touched.status && errors.status && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.status}
                  </div>
                )}
              </div> */}
              {/* age_limit */}
              {/* <div className=" relative z-0 mb-6 w-full group">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Giới hạn tuối
                </label>
                <input
                  name="age_limit"
                  value={values.age_limit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Nhập  ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />

                {touched.age_limit && errors.age_limit && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.age_limit}
                  </div>
                )}
              </div> */}
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />

                {touched.rate && errors.rate && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.rate}
                  </div>
                )}
              </div>
              {/* rate 2 */}
              <div className="relative z-0 mb-6 w-full group">
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
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />
                {touched.rate && errors.rate && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.rate}
                  </div>
                )}
              </div>

              {/* showTimes */}
              {/* <div className=" relative z-0 mb-6 w-full group">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  showTimes
                </label>
                <input
                  name="showTimes"
                  value={values.showTimes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter showTimes"
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />
                {touched.showTimes && errors.showTimes && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.showTimes}
                  </div>
                )}
              </div> */}
              {/*  */}
            </div>

            <div className="p-2 mb-4.5 ml-8  flex-col gap-6 xl:flex-row">
              {/* category */}
              <div className="form-group">
                <label className="block mb-2 font-medium text-black dark:text-white">
                  Categories:
                </label>
                {datacate?.map((cate) => (
                  <div className="flex items-center mb-2" key={cate._id}>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      id={cate._id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="categoryId"
                      value={cate._id}
                      checked={values.categoryId?.includes(cate._id)}
                    />
                    <label
                      className="ml-2 text-sm text-black dark:text-white"
                      htmlFor={cate._id}
                    >
                      {cate.name}
                    </label>
                  </div>
                ))}
                {touched.categoryId && errors.categoryId && (
                  <div className="text-red-500 text-sm font-bold">
                    {errors.categoryId}
                  </div>
                )}
              </div>
              {/* prices */}
              <div className=" relative z-0 mb-6 w-full group">
                <label className=" block text-xl font-medium text-black dark:text-white">
                  Giá :
                </label> <br />
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Ngày thường:
                </label>
                <input
                  name="priceweekday"
                  // value={values?.prices[0]?.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Nhập giá ngày thường ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />
                {touched.prices && errors.prices && (
                  <div className="mt-1 text-red-500 text-sm font-bold">
                    {errors.prices}
                  </div>
                )}
              </div>
              <div className=" relative z-0 mb-6 w-full group">
                {/* ngày vip */}                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Ngày Lễ:
                </label>
                <input
                  name="pricesweekend"
                  // value={values.prices}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Nhập giá ngày lễ ..."
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-form-input dark:text-white py-3 px-4 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-default disabled:bg-white"
                />
              </div>
              {/*  */}
              {/*  */}
              <div className=" relative z-0 mb-6 w-full group">
                <label className='mb-2 block text-sm font-medium text-black dark:text-white'>
                   Trạng thái:
                </label>
                <div className="inline-block relative w-full">

                  <select
                    className="block appearance-none w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" id="multiSelect"
                    name="status"
                    // value={selectedState}
                    // onChange={ }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option className='text-gray-900' value="">-- Chọn trạng thái --</option>
                    <option className='text-gray-900' value="COMING_SOON">COMING_SOON</option>
                    <option className='text-gray-900' value="IS_SHOWING">IS_SHOWING</option>
                    <option className='text-gray-900' value="PRTMIERED">PRTMIERED</option>
                    <option className='text-gray-900' value="CANCELLED">CANCELLED</option>
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
          </div>
          <button
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
            type="submit"
          >
            {typeForm === 'ADD' ? 'Add' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormMovie

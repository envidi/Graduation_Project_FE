import { Category } from '@/admin/types/category'
import { Movie, FormMovieAdd } from '@/admin/types/movie'
import { getAllCategory } from '@/api/category'
import { addMovie, editMovie, getOneMovie } from '@/api/movie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormMovieProps = {
  typeForm: 'ADD' | 'EDIT'
}

const FormMovie = ({ typeForm }: FormMovieProps) => {
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
        return editMovie(bodyData, id as string)
      }

      return addMovie(bodyData)
    },
    onSuccess: () => {
      if (typeForm === 'EDIT') {
        toast.success('Sua movie thanh cong')

        return
      }
      toast.success('Them movie thanh cong')
    },
    onError: () => {
      if (typeForm === 'EDIT') {
        toast.error('Sua cinema that bai')
        return
      }
      toast.error('Them cinema that bai')
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
        errors.name = 'Required name'
      } else if (values.name.length < 3) {
        errors.name = 'Name must be at least 3 characters long'
      }
      if (!values.image) {
        errors.image = 'Required image'
      } else if (values.image.length < 3) {
        errors.image = 'image must be at least 3 characters long'
      }
      if (!values.author) {
        errors.author = 'Required author'
      } else if (values.author.length < 3) {
        errors.author = 'author must be at least 3 characters long'
      }
      if (!values.language) {
        errors.language = 'Required language'
      } else if (values.language.length < 3) {
        errors.language = 'language must be at least 3 characters long'
      }
      if (!values.actor) {
        errors.actor = 'Required actor'
      } else if (values.actor.length < 3) {
        errors.actor = 'actor must be at least 3 characters long'
      }
      if (!values.trailer) {
        errors.trailer = 'Required trailer'
      } else if (values.trailer.length < 3) {
        errors.trailer = 'trailer must be at least 3 characters long'
      }
      if (!values.fromDate) {
        errors.fromDate = 'Required fromDate'
      } else if (values.fromDate.length < 3) {
        errors.fromDate = 'fromDate must be at least 3 characters long'
      }
      if (!values.toDate) {
        errors.toDate = 'Required toDate'
      } else if (values.toDate.length < 3) {
        errors.toDate = 'toDate must be at least 3 characters long'
      }
      if (!values.country) {
        errors.country = 'Required country'
      } else if (values.country.length < 3) {
        errors.country = 'country must be at least 3 characters long'
      }
      if (!values.duration) {
        errors.duration = 'Required duration'
      } else if (isNaN(values.duration) || Number(values.duration) <= 30) {
        errors.duration = 'Duration must be a number and greater than 30'
      }
      if (!values.priceweekday) {
        errors.priceweekday = 'Required priceweekday'
      } else if (
        isNaN(values.priceweekday) ||
        Number(values.priceweekday) <= 30
      ) {
        errors.priceweekday =
          'priceweekday must be a number and greater than 30'
      }
      if (!values.pricesweekend) {
        errors.pricesweekend = 'Required pricesweekend'
      } else if (
        isNaN(values.pricesweekend) ||
        Number(values.pricesweekend) <= 30
      ) {
        errors.pricesweekend =
          'pricesweekend must be a number and greater than 30'
      }
      if (!values.age_limit) {
        errors.age_limit = 'Required age_limit'
      } else if (isNaN(values.age_limit) || Number(values.age_limit) <= 0) {
        errors.age_limit = 'age_limit must be a number and greater than 30'
      }
      if (!values.rate) {
        errors.rate = 'Required rate'
      } else if (isNaN(values.rate) || Number(values.rate) <= 0) {
        errors.rate = 'rate must be a number and greater than 30'
      }
      if (!values.status) {
        errors.status = 'Required status'
      } else if (values.status.length < 3) {
        errors.status = 'status must be at least 3 characters long'
      }

      if (!values.categoryId) {
        errors.categoryId = 'Required categoryId'
      } else if (values.categoryId.length < 1) {
        errors.categoryId = 'categoryId must be at least 3 characters long'
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
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white dark:bg-gray-800 p-6"
        >
          <div className="p-6.5 flex">
            <div className="mb-4.5  flex-col gap-6 xl:flex-row">
              {/* name */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">movie name</label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter movie name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />

                {touched.name && errors.name && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.name}
                  </div>
                )}
              </div>
              {/* image */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">movie image</label>
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
                  placeholder="Enter movie image URL"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.image && errors.image && (
                  <div className="text-red-500 text-xl font-bold">
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
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">actor</label>
                <input
                  name="actor"
                  value={values.actor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter trailer"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.actor && errors.actor && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.actor}
                  </div>
                )}
              </div>
              {/* author */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">author</label>
                <input
                  name="author"
                  value={values.author}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter trailer"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.author && errors.author && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.author}
                  </div>
                )}
              </div>
              {/* language */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">language</label>
                <input
                  name="language"
                  value={values.language}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter trailer"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.language && errors.language && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.language}
                  </div>
                )}
              </div>
              {/* trailer */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">trailer</label>
                <input
                  name="trailer"
                  value={values.trailer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter trailer"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.trailer && errors.trailer && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.trailer}
                  </div>
                )}
              </div>
              {/* age_limit */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">age_limit</label>
                <input
                  name="age_limit"
                  value={values.age_limit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter age_limit"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.age_limit && errors.age_limit && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.age_limit}
                  </div>
                )}
              </div>
              {/* fromDate */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">fromDate</label>
                <input
                  name="fromDate"
                  value={values.fromDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter fromDate"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.fromDate && errors.fromDate && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.fromDate}
                  </div>
                )}
              </div>
              {/* todate */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">toDate</label>
                <input
                  name="toDate"
                  value={values.toDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter toDate"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.toDate && errors.toDate && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.toDate}
                  </div>
                )}
              </div>
              {/* desc */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">desc</label>
                <input
                  name="desc"
                  value={values.desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter desc"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.desc && errors.desc && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.desc}
                  </div>
                )}
              </div>
              {/* country */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">country</label>
                <input
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter country"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.country && errors.country && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.country}
                  </div>
                )}
              </div>
              {/* duration */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">duration</label>
                <input
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Enter duration"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.duration && errors.duration && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.duration}
                  </div>
                )}
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">age_limit</label>
                <input
                  name="age_limit"
                  value={values.age_limit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Enter age_limit"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.age_limit && errors.age_limit && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.age_limit}
                  </div>
                )}
              </div>
              {/* rate */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">rate</label>
                <input
                  name="rate"
                  value={values.rate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Enter rate"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {touched.rate && errors.rate && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.rate}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4.5  flex-col gap-6 xl:flex-row">
              {/* category */}
              <div className="form-group">
                <label>Categories:</label>
                {datacate?.map((cate) => (
                  <div className="form-check" key={cate._id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={cate._id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="categoryId"
                      value={cate._id}
                      checked={values.categoryId?.includes(cate._id)}
                    />
                    <label className="form-check-label">{cate.name}</label>
                  </div>
                ))}
                {touched.categoryId && errors.categoryId && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.categoryId}
                  </div>
                )}
              </div>
              {/* prices */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-primary">prices</label>{' '}
                <br />
                <label className="mb-2.5 block text-primary">
                  ngày thường:
                </label>
                <input
                  name="priceweekday"
                  // value={values?.prices[0]?.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Enter prices"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {/* <input
                  name="dayTypeweekday"
                  // value={values.prices}
                  value={'weekday'}
                  
                  hidden
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter prices"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                /> */}
                {/* ngày vip */}
                <label className="mb-2.5 block text-primary">ngày vip:</label>
                <input
                  name="pricesweekend"
                  // value={values.prices}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  placeholder="Enter prices"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {/* <input
                  name="dayTypeweekend"
                  // value={values.prices}
                  value={'weekend'}
                  hidden
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter prices"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                /> */}
                {touched.prices && errors.prices && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.prices}
                  </div>
                )}
              </div>
              {/* status */}
              <div className="w-full xl:w-1/2">
                {/* <label className="mb-2.5 block text-primary">
                  status
                </label>
                <input
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter status"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-primary outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                /> */}
                <label>
                  Chọn trạng thái:
                  <select
                    className="form-select"
                    name="status"
                    // value={selectedState}
                    // onChange={ }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">-- Chọn trạng thái --</option>
                    <option value="COMING_SOON">COMING_SOON</option>
                    <option value="IS_SHOWING">IS_SHOWING</option>
                    <option value="PRTMIERED">PRTMIERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </label>
                {touched.status && errors.status && (
                  <div className="text-red-500 text-xl font-bold">
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

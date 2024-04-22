import DefaultLayout from '@/admin/layout/DefaultLayout'
import { ContextMain } from '@/context/Context'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'flatpickr/dist/flatpickr.css'
import Flatpickr from 'react-flatpickr'
import { format } from 'date-fns'
import { getAllMovie } from '@/api/movie'
import { useQuery } from '@tanstack/react-query'
import { Movie } from '@/admin/types/movie'
import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import './showtime.css'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import Loading from '@/admin/components/Loading/Loading'
import { getDay, getTimeToShowTime } from '@/utils'
import { Value } from 'node_modules/react-time-picker/dist/esm/shared/types'
import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'

const CreateShowtimes = () => {
  const [open, setOpen] = React.useState(false)
  const [screen, setScreen] = React.useState(false)
  const [value, setValue] = React.useState<Movie>()
  const [screenValue, setScreenValue] = React.useState('')
  const { addShowtime, screenRoom } = useContext<any>(ContextMain)
  const [date, setDate] = useState<Date | string>('')
  const [loading, setLoading] = useState(false)
  const [timeInit, handleTimeInit] = useState<Value>('')
  const { data } = useQuery<Movie[]>({
    queryKey: ['MOVIE'],
    queryFn: getAllMovie
  })

  const handleItemClick = (movie: Movie) => {
    setValue(movie)
    handleTimeInit('')
    // Đặt giá trị cho 'value' khi người dùng chọn một phim
  }
  const handleItemScreen = (itemName: string) => {
    setScreenValue(itemName)
    handleTimeInit('')
    // Đặt giá trị cho 'value' khi người dùng chọn một phim
  }

  const formikValidate = useFormik({
    initialValues: {
      date: '',
      timeFrom: '',
      timeTo: '',
      screenRoomId: '',
      movieId: ''
    },

    validate: (values) => {
      const errors: any = {}

      if (!values.date) {
        errors.date = 'Bắt buộc phải nhập ngày'
      }
      if (!values.timeFrom) {
        errors.timeFrom = 'Hãy nhập thời gian'
      }
      // if (!values.timeTo) {
      //   errors.timeTo = 'Hãy nhập thời gian'
      // }
      if (!values.screenRoomId) {
        errors.screenRoomId = 'Hãy chọn phòng chiếu'
      }
      if (!values.movieId) {
        errors.movieId = 'Hãy chọn tên bộ phim !'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const response = await addShowtime(values)
        if (response.status === 200) {
          setLoading(false)

          toast.success('Tạo lịch chiếu thành công ')
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message
          setLoading(false)

          toast.error(`Có lỗi xảy ra: ${errorMessage}`)
        } else {
          setLoading(false)
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
        }
      }
    }
  })
  const handleChangeTime = (time: Value) => {
    if (date === '') {
      toast.error('Hãy chọn ngày trước', {
        position: 'top-right'
      })
      

      return
    }
    handleTimeInit(time)
    const formattedDate = format(date, 'dd-MM-yyyy HH:mm')
    const timeFrom = getDay(formattedDate) + ' ' + time
    const timeTo =
      getDay(formattedDate) +
      ' ' +
      getTimeToShowTime(time, value?.duration || 0)

    formikValidate.setFieldValue('timeFrom', timeFrom)
    formikValidate.setFieldValue('timeTo', timeTo)
  }
  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Thêm lịch chiếu"
          pageLink="/admin/showtimes"
          pageRetun="Lịch chiếu / Thêm lịch chiếu"
        />
        <div className=" mx-auto mt-10">
          {loading ? (
            <Loading /> // Hiển thị thông báo hoặc spinner khi đang load
          ) : (
            <form onSubmit={formikValidate.handleSubmit}>
              <div className="w-full border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="-mx-3 md:flex mb-6">
                  <div className="grid-cols-2 flex w-full">
                    <div className="px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        htmlFor="movie"
                      >
                        Chọn Phim
                      </label>

                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className=" justify-between border border-grey-lighter rounded hover:text-white text-sm h-12 w-full  border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                          >
                            <p>
                              {value
                                ? (data &&
                                    data.find(
                                      (movie) => movie.name == value.name
                                    )?.name) ||
                                  'Select movie'
                                : 'Chọn Phim'}
                            </p>

                            <ChevronsUpDown
                              size={16}
                              className="ml-2 h-4 w-4 shrink-0 opacity-50"
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command className="dark:bg-boxdark">
                            <CommandInput
                              className="caret-black dark:caret-white"
                              placeholder="Tìm Kiếm Phim..."
                            />
                            <CommandList>
                              {data?.length === 0 ? (
                                <CommandEmpty>
                                  Không tìm thấy phim.
                                </CommandEmpty>
                              ) : (
                                <CommandGroup>
                                  {data?.map((item) => (
                                    <CommandItem
                                      key={item._id}
                                      role="option"
                                      value={item.name}
                                      onSelect={() => {
                                        handleItemClick(item)
                                        formikValidate.setFieldValue(
                                          'movieId',
                                          item._id
                                        ) // Cập nhật giá trị của movieId
                                      }}
                                    >
                                      <div className="  w-full">
                                        <span className="text-sm dark:text-white">
                                          {item.name.toLocaleLowerCase()}
                                        </span>
                                        {/* <span className="text-gray-500 text-end">
                                          {item.duration} phút
                                        </span> */}
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {formikValidate.touched.movieId &&
                        formikValidate.errors.movieId && (
                          <div className="text-red-500 text-xs italic ml-3">
                            {formikValidate.errors.movieId}
                          </div>
                        )}
                    </div>

                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        htmlFor="movie"
                      >
                        Chọn Phòng Chiếu
                      </label>

                      <Popover open={screen} onOpenChange={setScreen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[250px] justify-between border border-grey-lighter rounded hover:text-white text-sm h-12  border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                          >
                            {screenValue
                              ? (screenRoom &&
                                  screenRoom?.find(
                                    (screen: { name: string }) =>
                                      screen.name === screenValue
                                  )?.name) ||
                                'Select frameworkeeee...' // Sử dụng toán tử && để kiểm tra giá trị của 'screenRoom'
                              : 'Chọn Phòng Chiếu'}

                            <ChevronsUpDown
                              size={16}
                              className="ml-2 h-4 w-4 shrink-0 opacity-50"
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command className="w-full justify-between dark:bg-boxdark">
                            <CommandInput
                              placeholder="Tìm kiếm phòng chiếu..."
                              className="caret-black dark:caret-white"
                            />
                            <CommandList className="w-[250px] justify-between">
                              {screenRoom?.length === 0 ? (
                                <CommandEmpty>No country found.</CommandEmpty>
                              ) : (
                                <CommandGroup>
                                  {screenRoom?.map(
                                    (item: {
                                      name: string
                                      _id: string
                                      duration: number
                                    }) => (
                                      <CommandItem
                                        className="w-[250px] justify-between text-sm"
                                        key={item._id}
                                        role="option"
                                        value={item.name}
                                        onSelect={() => {
                                          handleItemScreen(item.name)
                                          formikValidate.setFieldValue(
                                            'screenRoomId',
                                            item._id
                                          ) // Cập nhật giá trị của screen
                                        }}
                                      >
                                        <div className="grid grid-cols-2  w-full">
                                          <span className="text-sm">
                                            {item.name}
                                          </span>
                                        </div>
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {formikValidate.touched.screenRoomId &&
                        formikValidate.errors.screenRoomId && (
                          <div className="text-red-500 text-xs italic">
                            {formikValidate.errors.screenRoomId}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Ngày khởi chiếu
                    </label>
                    {/* <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Jane" /> */}
                    <Flatpickr
                      name="date"
                      // value={date}
                      options={{
                        dateFormat: 'd-m-Y',
                        enableTime: true,
                        onChange: (selectedDates) => {
                          const formattedDate =
                            format(selectedDates[0], 'dd-MM-yyyy') +
                            ' ' +
                            '07:01'
                          setDate(selectedDates[0])
                          handleTimeInit('')
                          formikValidate.setFieldValue('date', formattedDate)
                        }
                      }}
                      placeholder="DD/MM/YYYY"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                      id="grid-first-name"
                      type="text"
                    />
                    {formikValidate.touched.date &&
                      formikValidate.errors.date && (
                        <p className="text-red-500 text-xs italic">
                          {formikValidate.errors.date}
                        </p>
                      )}
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Thời Gian Khởi Chiếu
                    </label>
                    {/* <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe" /> */}
                    <TimePicker
                      disabled={date == ''}
                      className="w-54 rounded-lg border-[1.5px] border-stroke bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                      aria-label={true}
                      onChange={handleChangeTime}
                      value={timeInit}
                    />
                    {formikValidate.touched.timeFrom &&
                      formikValidate.errors.timeFrom && (
                        <span className="text-red-500 text-xs italic">
                          {formikValidate.errors.timeFrom}
                        </span>
                      )}
                  </div>
                </div>

                {/* <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      City
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      State
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        id="grid-state"
                      >
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                      </select>
                      <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Zip
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div> */}
                <button
                  type="submit"
                  className="middle none center w-full rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                >
                  Tạo Lịch Chiếu
                </button>
              </div>
            </form>
          )}
        </div>
      </DefaultLayout>
    </>
  )
}

export default CreateShowtimes

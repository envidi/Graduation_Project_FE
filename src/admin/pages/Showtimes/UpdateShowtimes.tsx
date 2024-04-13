import DefaultLayout from '@/admin/layout/DefaultLayout'
import { baseShowtimes } from '@/api/baseAuth'
import { DetailShowtimes, updateShowtimes } from '@/api/showtime'
import { ContextMain } from '@/context/Context'
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Flatpickr from 'react-flatpickr'
import { format } from 'date-fns';
const UpdateShowtimes = () => {
  const { id } = useParams()
  const { addShowtime, editShowtimes } = useContext(ContextMain)

  const [detailShowTime, setDetailShowTime] = useState<any>(null)
  const { register, handleSubmit, setValue } = useForm()
  const queryClient = useQueryClient()

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const response = await DetailShowtimes(id)
        const detail = response.data.response.docs

        setDetailShowTime(detail)
        if (detail) {
          setValue('date', detail[0].date)
          setValue('timeFrom', detail[0].timeFrom)
          setValue('timeTo', detail[0].timeTo)
          setValue('screenRoomId', detail[0].screenRoomId?._id || '')
          setValue('movieId', detail[0].movieId?._id || '')
        }
      } catch (error) {
        console.error('Error fetching showtime:', error)
      }
    }
    fetchShowtime()
  }, [id])

  const edit = useMutation({
    mutationFn: async (data: any) => {
      // const { showtime } = data;
      try {
        const result = await updateShowtimes(data, id as string);
        return result;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data: any) => {
      // const { showtime } = data;
      queryClient.invalidateQueries(["SHOWTIMES"] as InvalidateQueryFilters)

      toast.success('Update lịch chiếu thành công <3');
    },
    onError: (error: any, variables: any, context: any) => {
      toast.error('Update failed, try again!');
      console.error('Error updating showtimes:', error);
    }
  });

  const onSubmit = async (showtime: any) => {
    try {
      console.log("check showtime", showtime);
      // console.log("hhsfs",  await edit.mutateAsync(showtime));
      
       await edit.mutateAsync(showtime)
      toast.success('Update lịch chiếu thành công <3')
    } catch (error) {
      toast.error('Update failed, try again!')
    }
  }

  // Function to log changes
  const logChanges = (fieldName: string, value: any) => {
    console.log(`Field ${fieldName} changed to:`, value);
  };

  return (
    <>
      <DefaultLayout>
        <div className=" mx-auto mt-10">
          {detailShowTime && detailShowTime.length > 0 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-0 mb-6 w-full group">
                {/* <input
                  {...register('date')}
                  defaultValue={detailShowTime?.[0]?.date || ''}
                  type="text"
                  className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => {
                    setValue('date', e.target.value);
                    logChanges('date', e.target.value);
                  }}
                /> */}
<Flatpickr
                  name="date"
                  defaultValue={detailShowTime?.[0]?.date || ''}
                  options={{
                    dateFormat: 'd-m-Y H:i',
                    enableTime: true,
                    onChange: (selectedDates) => {
                      const formattedDate = format(selectedDates[0], 'dd-MM-yyyy HH:mm');
                      setValue('date', formattedDate);
                      logChanges('date', formattedDate);
                    },
                  }}
                  className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="date"
                  className="absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-3xl"
                >
                  Ngày Khởi Chiếu
                </label>
              </div>

              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  {/* <input
                    type="text"
                    {...register('timeFrom')}
                    defaultValue={detailShowTime?.[0]?.timeFrom || ''}
                    onChange={(e) => {
                      setValue('timeFrom', e.target.value);
                      logChanges('timeFrom', e.target.value);
                    }}
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  /> */}
                  <Flatpickr
                  name="timeFrom"
                  defaultValue={detailShowTime?.[0]?.timeFrom || ''}
                  options={{
                    dateFormat: 'd-m-Y H:i',
                    enableTime: true,
                    onChange: (selectedDates) => {
                      const formattedDate = format(selectedDates[0], 'dd-MM-yyyy HH:mm');
                      setValue('timeFrom', formattedDate);
                      logChanges('timeFrom', formattedDate);
                    },
                  }}
                  className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                  <label
                    htmlFor="floating_first_name"
                    className="absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Thời Gian Khởi Chiếu
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  {/* <input
                    type="text"
                    {...register('timeTo')}
                    defaultValue={detailShowTime?.[0]?.timeTo || ''}
                    onChange={(e) => {
                      setValue('timeTo', e.target.value);
                      logChanges('timeTo', e.target.value);
                    }}
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  /> */}
                   <Flatpickr
                  name="timeTo"
                  defaultValue={detailShowTime?.[0]?.timeTo || ''}
                  options={{
                    dateFormat: 'd-m-Y H:i',
                    enableTime: true,
                    onChange: (selectedDates) => {
                      const formattedDate = format(selectedDates[0], 'dd-MM-yyyy HH:mm');
                      setValue('timeTo', formattedDate);
                      logChanges('timeTo', formattedDate);
                    },
                  }}
                  className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                  <label
                    htmlFor="floating_last_name"
                    className="absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Thời Gian Kết Thúc
                  </label>
                </div>
              </div>
              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    {...register('screenRoomId')}
                    defaultValue={detailShowTime?.[0]?.screenRoomId?._id ?? ''}
                    onChange={(e) => {
                      setValue('screenRoomId', e.target.value);
                      logChanges('screenRoomId', e.target.value);
                    }}
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_phone"
                    className="absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phòng Chiếu
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    {...register('movieId')}
                    defaultValue={detailShowTime?.[0]?.movieId?._id ?? ''}
                    onChange={(e) => {
                      setValue('movieId', e.target.value);
                      logChanges('movieId', e.target.value);
                    }}
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_company"
                    className="absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tên Phim
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-3xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </DefaultLayout>
    </>
  )
}

export default UpdateShowtimes

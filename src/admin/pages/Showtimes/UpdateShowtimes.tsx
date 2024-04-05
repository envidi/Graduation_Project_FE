import DefaultLayout from '@/admin/layout/DefaultLayout'
import { baseShowtimes } from '@/api/baseAuth'
import { DetailShowtimes, updateShowtimes } from '@/api/showtime'
import { ContextMain } from '@/context/Context'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateShowtimes = () => {

    const { id } = useParams();
    const { addShowtime } = useContext(ContextMain);

    const [detailShowTime, setDetailShowTime] = useState<any>();
    const [screenRoomId, setScreenRoomId] = useState('');
    const [movieId, setMovieId] = useState('');
    const [date, setDate] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');

    useEffect(() => {
        const showtime = async () => {
            try {
                const response = await DetailShowtimes(id);
                const detail = response.data.response.docs;
                setDetailShowTime(detail);
                console.log('Check detail showtime ', detail);
            } catch (error) {}
        };
        showtime();
    }, [id]);

    const mutation = useMutation(
        async (values: any) => {
            try {
                const response = await updateShowtimes.mutateAsync(values, id);
                return response.data; // Trả về dữ liệu từ response để sử dụng trong onSuccess
            } catch (error) {
                throw new Error(error); // Ném lỗi để sử dụng trong onError
            }
        },
        {
            onSuccess: () => {
                toast.success('Thành công');
            },
            onError: (error: any) => {
                toast.error('Thất bại: ' + error.message); // Hiển thị thông báo lỗi cụ thể
            }
        }
    );
    

    const formikValidate = useFormik({
        initialValues: {
            date: detailShowTime?.[0]?.date || '',
            timeFrom: detailShowTime?.[0]?.timeFrom || '',
            timeTo: detailShowTime?.[0]?.timeTo || '',
            screenRoomId: detailShowTime?.[0]?.screenRoomId?.name || '',
            movieId: detailShowTime?.[0]?.movieId?.name || ''
        },
        onSubmit: async (values :any) => {
            try {
                await mutation.mutate(values);
            } catch (error) {
                toast.error('Có lỗi gì đó đã xảy ra !!!!!!!!!!!');
            }
        }
    });
  return (
    <>
      <DefaultLayout>
        <div className=" mx-auto mt-10">
          <form  onSubmit={formikValidate.handleSubmit}> 
          
            <div className="relative z-0 mb-6 w-full group">
              <input
                name="date"
                defaultValue={date}
                type='text'
                onChange={formikValidate.handleChange}
                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
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
                <input
                  type="text"
                  name="timeFrom"
                defaultValue={timeFrom}

                onChange={formikValidate.handleChange}


                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Thời Gian Khởi Chiếu
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="timeTo"
                defaultValue={timeTo}

                onChange={formikValidate.handleChange}



                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
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
                  onChange={formikValidate.handleChange}


                defaultValue={screenRoomId}
                  
                  name="screenRoomId"
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
                  name="movieId"
                  onChange={formikValidate.handleChange}


                  defaultValue={movieId}

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

       
        </div>
      </DefaultLayout>
    </>
  )
}

export default UpdateShowtimes

import DefaultLayout from '@/admin/layout/DefaultLayout'
import { ContextMain } from '@/context/Context'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'

const CreateShowtimes = () => {
    const {addShowtime} = useContext(ContextMain)

    const formikValidate = useFormik({
        initialValues: {
          date: '',
          timeFrom: '',
          timeTo: '',
          screenRoomId: '',
          movieId:""
        },
      
        // validate: (values) => {
        //   const errors = {};
      
        //   if (!values.date ) {
        //     errors.date = "Bắt buộc phải nhập ngày ";
        //   }
        //   if (!values.timeFrom) {
        //     errors.timeFrom = "Hãy nhập thowifd gian";
        //   }
        //   if (!values.timeTo) {
        //     errors.timeTo = "Hãy nhập câu chuyện ";
        //   }
        //   if (!values.screenRoomId) {
        //     errors.screenRoomId = "Hãy nhập câu chuyện ";
        //   }
        //   if (!values.movieId) {
        //     errors.movieId = "Hãy nhập câu chuyện ";
        //   }
        // //   const validCategories = ["Tình cảm", "Huyền huyễn", "Anime", "Trọng sinh"];
        // //   if (!values.categoryName) {
        // //     errors.categoryName = "Hãy nhập 1 trong các danh mục sau: Tình cảm, Huyền huyễn, Anime, Trọng sinh";
        // //   } else if (!validCategories.includes(values.categoryName)) {
        // //     errors.categoryName = "Chưa nhập đúng danh mục";
        // //   }
      
        //   return errors;
        // },
        onSubmit: async (values) => {
         
          try {
            const response = await addShowtime.mutateAsync(values)
            console.log("check tạo lịch chiếu ", response);
          if(response.status === 200 ){
            
    
            toast.success("Tạo lịch chiếu thành công <3")
            // setTimeout(() =>{
            //   window.location.href="/blog"
            // },2000)
    
          }
    
      
            
          } catch (error) {
            toast.error("Có lỗi gì đó đã xảy ra !!!!!!!!!!!")
    
    
            // Handle error
          }
      
        },
      });
  return (
    <>
      <DefaultLayout>
        <div className=" mx-auto mt-10">
          <form  onSubmit={formikValidate.handleSubmit}> 
            <div className="relative z-0 mb-6 w-full group">
              <input
                name="date"
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

export default CreateShowtimes

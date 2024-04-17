import React, { useContext, useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { block, getUser, unblock, updateUserId } from '@/api/auth'
import { ContextMain } from '@/context/Context'
import { toast } from 'react-toastify'

const Users = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [confirmBlock, setConfirmBlock] = useState(false)
  const [confirmUnBlock, setConfirmUnBlock] = useState(false)
  const [selectedUserIndex, setSelectedUserIndex] = useState(null)
  const [checkBlock, setCheckBlock] = useState(null)
  const [checkUnblockId, setCheckUnblockId] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    console.log('check id ', checkBlock)
  }, [selectedUserIndex, checkBlock, checkUnblockId]) // Log lại giá trị mỗi khi selectedUserIndex thay đổi

  const queryClient = useQueryClient()
  const userUpdateId = useMutation({
    mutationFn: async (user: any) => {
      // const { showtime } = user;
      try {
        const result = await updateUserId(user, selectedUserIndex)
        return result
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data: any) => {
      // const { showtime } = data;
      queryClient.invalidateQueries(['SHOWTIMES'] as InvalidateQueryFilters)

      toast.success('Update role thành công <3')
    }
  })

  const blockUser = useMutation({
    mutationFn: async (user: any) => {
      // const { showtime } = user;
      try {
        const result = await block(user, checkBlock)
        if (result.status === 200) {
          queryClient.invalidateQueries(['USER'] as InvalidateQueryFilters)

          toast.success('Block thành công <3')
          // setTimeout(() =>{
          //   window.location.href="/blog"
          // },2000)
        }
        return result
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message

          toast.error(`Có lỗi xảy ra: ${errorMessage}`)
        } else {

          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
        }
      }
    },
    // onSuccess: (data: any) => {
    //   // const { showtime } = data;
    //   queryClient.invalidateQueries(['USER'] as InvalidateQueryFilters)

    //   toast.success('Block thành công <3')
    // }
  })
  const unBlockUser = useMutation({
    mutationFn: async (user: any) => {
      // const { showtime } = user;
      try {
        const result = await unblock(user, checkUnblockId)
        return result
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data: any) => {
      // const { showtime } = data;
      queryClient.invalidateQueries(['USER'] as InvalidateQueryFilters)

      toast.success('Bỏ block thành công <3')
    }
  })
  const toggleCheckBlock = (user: any) => {
    setConfirmBlock(true)
    setCheckBlock(user?._id)
  }
  const toggleCheckUnBlockId = (user: any) => {
    setConfirmUnBlock(true)
    setCheckUnblockId(user?._id)
    console.log( " Check unlock id", checkUnblockId);
    
  }

  const handleOptionChange = (event: any) => {
    setSelectedRole(event.target.value)
  }

  const toggleShowEdit = (user: any) => {
    setShowEdit(true)
    setSelectedUserIndex(user?._id)
    console.log('check id 2', user?._id)
  }

  const { isLoading, data: allUser } = useQuery({
    queryKey: ['USER'],
    queryFn: async () => {
      try {
        const { data } = await getUser()
        return data
      } catch (error) {
        console.log('error', error)
      }
    }
  })

  const handleUpdateRole = (e: any) => {
    e.preventDefault()

    if (selectedUserIndex !== null && selectedUserIndex !== undefined) {
      // Thực hiện cập nhật vai trò cho người dùng với _id được chọn
      userUpdateId.mutate({ id: selectedUserIndex, roleIds: selectedRole })

      // Đóng modal sau khi cập nhật
      setShowEdit(false)
    } else {
      console.log('lỗi')
    }
  }
  const handleBlock = (e: any) => {
    e.preventDefault()

    if (checkBlock !== null && checkBlock !== undefined) {
      // Thực hiện cập nhật vai trò cho người dùng với _id được chọn
      blockUser.mutate({ id: checkBlock, isBlocked: true })

      // Đóng modal sau khi cập nhật
      setConfirmBlock(false)
    } else {
      console.log('lỗi')
    }
  }

  const handleUnBlock = (e: any) => {
    e.preventDefault()

    if (checkUnblockId !== null && checkUnblockId !== undefined) {
      // Thực hiện cập nhật vai trò cho người dùng với _id được chọn
      unBlockUser.mutate({ id: checkUnblockId, isBlocked: false })

      // Đóng modal sau khi cập nhật
      setConfirmUnBlock(false)
    } else {
      console.log('lỗi')
    }
  }

  console.log('check user ', allUser)

  return (
    <DefaultLayout>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Danh Sách User</h2>
            <span className="text-xs">Tất Cả User</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8">
             
            
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Tên
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Số Điện Thoại
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Địa Chỉ
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Trạng Thái
                    </th>
                    <th
                      className=" py-3 border-b-2 border-gray-200 bg-gray-100  text-[10px] font-semibold text-gray-600 uppercase tracking-wider text-center"
                      colSpan={2}
                    >
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUser?.response?.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={item?.avatar}
                              alt="Lỗi"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.mobile}
                        </p>
                      </td>
                      <td className=" border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.address}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.roleIds?.roleName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {item?.status === 'Blocked' ? (
                          <span className="relative inline-block px-3 py-1 font-semibold  text-red-900 leading-tight w-full text-center ">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full "
                            ></span>
                            <span className="relative ">{item?.status}</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight w-full text-center ">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full "
                            ></span>
                            <span className="relative ">{item?.status}</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex">
                        <button
                          className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-ripple-light="true"
                          onClick={() => toggleShowEdit(item)}
                        >
                          Update
                        </button>
                        {item?.status === 'Blocked' ? (
                          <button
                            className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            onClick={() => toggleCheckUnBlockId(item)}
                          >
                            UnBlock
                          </button>
                        ) : (
                          <button
                            className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full"
                            data-ripple-light="true"
                            onClick={() => toggleCheckBlock(item)}
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <>
          <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center  border border-black bg-opacity-50" style={{boxShadow: "3px 2px 10px 1px #d1c8c8;"}}>
            <div className="bg-white rounded  w-10/12 md:w-1/3 shadow shadow-xl" style={{boxShadow: "3px 2px 10px 1px #d1c8c8;"}}>
              <div className="border-b px-4 py-2 flex justify-center items-center text-center">
                <h3 className="font-semibold text-lg text-black ">
                  Update Role
                </h3>
              </div>
              <form onSubmit={handleUpdateRole}>
                <div className="p-3 justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2 p-4 ">
                    <label>
                      <input
                        type="radio"
                        value="659b79c6757ca91b82e2b9d0"
                        className="peer hidden"
                        name="roleIds"
                        checked={selectedRole === '659b79c6757ca91b82e2b9d0'}
                        onChange={handleOptionChange}
                      />

                      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                        <h2 className="font-medium text-gray-700">Admin</h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </label>

                    <label>
                      <input
                        type="radio"
                        value="659919a451a235a0f4b80700"
                        className="peer hidden"
                        name="roleIds"
                        checked={selectedRole === '659919a451a235a0f4b80700'}
                        onChange={handleOptionChange}
                      />

                      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                        <h2 className="font-medium text-gray-700">User</h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-center items-center border-t p-3">
                  <button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
                    onClick={() => setShowEdit(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {confirmBlock && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 h-screen">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Bạn có chắc muốn block người này
            </h1>
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
              onClick={() => setConfirmBlock(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              onClick={handleBlock}
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {confirmUnBlock && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 h-screen">
        <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1 className="text-xl mb-4 font-bold text-slate-500">
            Bạn có chắc muốn mở block người này
          </h1>
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick={() => setConfirmUnBlock(false)}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            onClick={handleUnBlock}
          >
            Ok
          </button>
        </div>
      </div>
      )}
    </DefaultLayout>
  )
}

export default Users

import { useContext, useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api/auth'
import { ContextMain } from '@/context/Context'

const Users = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [selectedUserIndex, setSelectedUserIndex] = useState(null)
  const { removeUser, userUpdateId } = useContext(ContextMain)
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {}, [selectedUserIndex]) // Log lại giá trị mỗi khi selectedUserIndex thay đổi

  const handleOptionChange = (event: any) => {
    setSelectedRole(event.target.value)
  }

  const toggleShowEdit = (user: any) => {
    setShowEdit(!showEdit)
    setSelectedUserIndex(user?._id)
  }

  const { data: allUser } = useQuery({
    queryKey: ['USER'],
    queryFn: async () => {
      try {
        const { data } = await getUser()
        return data
      } catch (error) {
        throw new Error(error as string)
      }
    }
  })

  const handleUpdateRole = (e: any) => {
    e.preventDefault()

    if (selectedUserIndex !== null && selectedUserIndex !== undefined) {
      // Thực hiện cập nhật vai trò cho người dùng với _id được chọn
      userUpdateId.mutate({ id: selectedUserIndex, roleName: selectedRole })

      // Đóng modal sau khi cập nhật
      setShowEdit(false)
    } else {
      return
    }
  }

  return (
    <DefaultLayout>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">All Users</h2>
            <span className="text-xs">All products item</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8">
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                New Report
              </button>
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                Create
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tên
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Số Điện Thoại
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Địa Chỉ
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Trạng Thái
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Activo</span>
                        </span>
                      </td>
                      <td>
                        <button
                          className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-ripple-light="true"
                          onClick={() => toggleShowEdit(item)}
                        >
                          Update
                        </button>
                        <button
                          className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          data-ripple-light="true"
                          onClick={() => {
                            if (
                              window.confirm('Bạn có muốn xóa không') == true
                            ) {
                              removeUser.mutate(item._id)
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      {selectedUserIndex !== null && (
                        <>
                          <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center  bg-opacity-50">
                            <div className="bg-white rounded  w-10/12 md:w-1/3 box">
                              <div className="border-b px-4 py-2 flex justify-between items-center">
                                <h3 className="font-semibold text-lg text-black">
                                  Update Role
                                </h3>
                              </div>
                              <form onSubmit={handleUpdateRole}>
                                <div className="p-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-4 ">
                                    <label>
                                      <input
                                        type="radio"
                                        value="admin"
                                        className="peer hidden"
                                        name="roleName"
                                        checked={selectedRole === 'admin'}
                                        onChange={handleOptionChange}
                                      />

                                      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                                        <h2 className="font-medium text-gray-700">
                                          Admin
                                        </h2>
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
                                        value="user"
                                        className="peer hidden"
                                        name="roleName"
                                        checked={selectedRole === 'user'}
                                        onChange={handleOptionChange}
                                      />

                                      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                                        <h2 className="font-medium text-gray-700">
                                          User
                                        </h2>
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
                                        value="manager"
                                        className="peer hidden"
                                        name="roleName"
                                        checked={selectedRole === 'manager'}
                                        onChange={handleOptionChange}
                                      />

                                      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                                        <h2 className="font-medium text-gray-700">
                                          Manager
                                        </h2>
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
                                  </div>
                                </div>
                                <div className="flex justify-end items-center w-100 border-t p-3">
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
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Users

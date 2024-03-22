import { deleteUser, getDetailUser, updateUser, updateUserId } from '@/api/auth'
import React, { createContext, useState } from 'react'
import { InvalidateQueryFilters, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { USERDETAIL } from '@/utils/constant'
import { getAllShowTimes } from '@/api/showtime'
export interface ContextAuth {
  userDetail: {
    message: {
      avatar: string
      cart: []
      confirmPassword: string
      createdAt: string
      email: string
      isBlocked: false
      name: string
      password: string
      roleIds: string
      updatedAt: string
      wishlist: []
      __v: number
      _id: string
      address: string
      mobile: number
    }
  }
  isLogined: boolean
  setIsLogined: (state: boolean) => void
}

export const ContextMain = createContext<ContextAuth>({
  userDetail: {
    message: {
      avatar: '',
      cart: [],
      confirmPassword: '',
      createdAt: '',
      email: '',
      isBlocked: false,
      name: '',
      password: '',
      roleIds: '',
      updatedAt: '',
      wishlist: [],
      __v: 0,
      _id: '',
      address: '',
      mobile: 0
    }
  },
  isLogined: false,
  setIsLogined: () => {}
})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()
  // const [accessToken, setAccessToken] = useLocalStorage<any>('Accesstoken')
  const [isLogined, setIsLogined] = useState(
    !!localStorage.getItem('Accesstoken')
  )
  const { data: userDetail } = useQuery({
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
  

  const removeUser = useMutation({
    mutationFn: async (id: any) => await deleteUser(id),
    onSuccess (){
      console.log("Deleting User was successful");
      queryClient.invalidateQueries(["USERS"] as InvalidateQueryFilters)
      toast.success("Delete User thành công")
  },
  onError(){
      toast.error("Delete User thất bại")
  }   
  }) 

  const userUpdate = useMutation({
    mutationFn: async (user) => await updateUser(user),
    onSuccess() {
      toast.success('Update Successfully ')
    },
    onError() {
      toast.error('Update faile, try again !')
    }
  })

  const userUpdateId = useMutation({
    mutationFn: async (user) => await updateUserId(user),
    onSuccess() {
      toast.success('Update Successfully <3 ')
    },
    onError() {
      toast.error('Update faile, try again !')
    }
  })


  const {data : allShowTimes} = useQuery({
    queryKey: ["SHOWTIMES"],
    queryFn : async () => {
      try {
        const response = await getAllShowTimes()
        return response.data.response.docs
        
      } catch (error) {
        
      }
    }
  })

  const values = { isLogined, setIsLogined, userDetail, userUpdate, removeUser, updateUserId, userUpdateId,allShowTimes }
  return <ContextMain.Provider value={values}>{children}</ContextMain.Provider>
}

export default ContextProvider

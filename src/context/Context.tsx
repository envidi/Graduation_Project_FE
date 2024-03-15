import { deleteUser, getDetailUser, updateUser, updateUserId } from '@/api/auth'
import React, { createContext, useState } from 'react'
import { InvalidateQueryFilters, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const ContextMain = createContext({})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()
  const [isLogined, setIsLogined] = useState(
    !!localStorage.getItem('Accesstoken')
  )
  const { data: userDetail } = useQuery({
    queryKey: ['USERDETAIL'],
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
      toast.success('Update Successfully <3 ')
    },
    onError() {
      toast.error('Update faile, try again !!!!!!!')
    }
  })

  const userUpdateId = useMutation({
    mutationFn: async (user) => await updateUserId(user),
    onSuccess() {
      toast.success('Update Successfully <3 ')
    },
    onError() {
      toast.error('Update faile, try again !!!!!!!')
    }
  })
  const values = { isLogined, setIsLogined, userDetail, userUpdate, removeUser, updateUserId, userUpdateId }
  return <ContextMain.Provider value={values}>{children}</ContextMain.Provider>
}

export default ContextProvider

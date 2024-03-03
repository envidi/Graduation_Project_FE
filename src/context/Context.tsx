import { getDetailUser, updateUser } from '@/api/auth'
import React, { createContext, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const ContextMain = createContext({})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
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

  const userUpdate = useMutation({
    mutationFn: async (user) => await updateUser(user),
    onSuccess() {
      toast.success('Update Successfully <3 ')
    },
    onError() {
      toast.error('Update faile, try again !!!!!!!')
    }
  })

  const values = { isLogined, setIsLogined, userDetail, userUpdate }
  return <ContextMain.Provider value={values}>{children}</ContextMain.Provider>
}

export default ContextProvider
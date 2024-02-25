import { getDetailUser, updateUser } from '@/api/auth'
import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export const ContextMain = createContext({})

const ContextProvider = ({children} : {children: React.ReactNode}) => {

    const [isLogined, setIsLogined] = useState(false)
    const { data: userDetail } = useQuery({
        queryKey: ['USERDETAIL'],
        queryFn: async () => {
          try {
            const token = localStorage.getItem('Accesstoken')
            if (token) {
              const { data } = await getDetailUser()
              console.log('data', data)
    
              return data
            }
          } catch (error) {
            console.error('Error fetching products:', error)
            throw error
          }
        },
      })
      console.log('user detail ', userDetail)
      

      const userUpdate = useMutation({
        mutationFn : async (user) => await updateUser(user),
        onSuccess() {
          toast.success("Update Successfully <3 ")
        },
        onError(){
          toast.error("Update faile, try again !!!!!!!")
        }
      })

      const values = {isLogined, setIsLogined, userDetail,userUpdate}
  return (
    <ContextMain.Provider value={values}>
        {children}
    </ContextMain.Provider>
  )
    }

export default ContextProvider
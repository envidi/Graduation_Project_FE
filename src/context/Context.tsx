import { getDetailUser, updateUser } from '@/api/auth'
import React, { createContext, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { USERDETAIL } from '@/utils/constant'
import { useQueryClient } from '@tanstack/react-query'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { DELETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'

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
  isLoading: boolean
  logout: () => void
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
  setIsLogined: () => {},
  isLoading: false,
  logout: () => {}
})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { mutate } = useTicket(DELETE_TICKET)
  const [ticket] = useLocalStorage<TicketType>('ticket')
  const queryClient = useQueryClient()
  const [isLogined, setIsLogined] = useState(
    !!localStorage.getItem('Accesstoken')
  )
  const { data: userDetail, isLoading } = useQuery({
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

  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    if (ticket && ticket.ticket_id) {
      mutate({
        ticket_id: ticket.ticket_id
      })
    }
    localStorage.removeItem('Accesstoken')
    queryClient.invalidateQueries({
      queryKey: [USERDETAIL]
    })
    setTimeout(() => {
      localStorage.removeItem('ticket')
      localStorage.removeItem('countdown')
    }, 1000)
    // navigate('/')
    setIsLogined(false)
    toast.success('Logout successful')
  }

  const userUpdate = useMutation({
    mutationFn: async (user) => await updateUser(user),
    onSuccess() {
      toast.success('Update Successfully ')
    },
    onError() {
      toast.error('Update faile, try again !')
    }
  })

  const values = {
    isLogined,
    setIsLogined,
    userDetail,
    userUpdate,
    isLoading,
    logout
  }
  return <ContextMain.Provider value={values}>{children}</ContextMain.Provider>
}

export default ContextProvider

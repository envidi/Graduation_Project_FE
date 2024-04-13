import { deleteUser, getDetailUserClient, updateUser, updateUserId } from '@/api/auth'
import React, { createContext, useState } from 'react'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { USERDETAIL } from '@/utils/constant'
import { useQueryClient } from '@tanstack/react-query'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { DELETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'
import {
  CreateShowtimes,
  DeleteShowtimes,
  DetailShowtimes,
  getAllShowTimes,
  updateShowtimes
} from '@/api/showtime'

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
      mobile: number,
      age : number,
      sex : string
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
      mobile: 0,
      age : 15,
      sex : ''
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
        const { data } = await getDetailUserClient()

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
  const removeUser = useMutation({
    mutationFn: async (id: any) => await deleteUser(id),
    onSuccess() {
      queryClient.invalidateQueries(['USERS'] as InvalidateQueryFilters)
      toast.success('Xóa người dùng thành công')
    },
    onError() {
      toast.error('Xóa người dùng thất bại')
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

  const { data: allShowTimes } = useQuery({
    queryKey: ['SHOWTIMES'],
    queryFn: async () => {
      try {
        const response = await getAllShowTimes()
        return response.data.response.docs
      } catch (error) {}
    }
  })

  const addShowtime = useMutation({
    mutationFn: async (showtime) => await CreateShowtimes(showtime),
    onSuccess() {
      queryClient.invalidateQueries(["SHOWTIMES"] as InvalidateQueryFilters)

    },
    
  })
  const removeShowtime = useMutation({
    mutationFn: async (id) => await DeleteShowtimes(id),
    onSuccess() {
      queryClient.invalidateQueries(["SHOWTIMES"] as InvalidateQueryFilters)
      toast.success('Xóa lịch chiếu thành công <3 ')


    },
    onError() {
      toast.error('Xóa faile, try again !')
    }
  })

  const detailShowtime = useMutation({
    mutationFn: async (id) => await DetailShowtimes(id),
    onSuccess() {
      toast.success('Update lịch chiếu thành công <3 ')
    },
    onError() {
      toast.error('Update faile, try again !')
    }
  })
  const editShowtimes = useMutation({
    mutationFn: async (data: any) => {
      const { showtime ,id} = data;
      try {
        const result = await updateShowtimes(showtime, id as string);
        return result;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data: any) => {
      const { showtime } = data;
      queryClient.invalidateQueries(["SHOWTIMES"] as InvalidateQueryFilters)

      toast.success('Update lịch chiếu thành công <3');
    },
    onError: (error: any, variables: any, context: any) => {
      toast.error('Update failed, try again!');
      console.error('Error updating showtimes:', error);
    }
  });

  const values = {
    isLogined,
    setIsLogined,
    userDetail,
    userUpdate,
    isLoading,
    logout,
    detailShowtime,
    allShowTimes,
    userUpdateId,
    removeUser,
    addShowtime,
    removeShowtime,
    editShowtimes
  }
  return <ContextMain.Provider value={values}>{children}</ContextMain.Provider>
}

export default ContextProvider

import DefaultLayout from '@/admin/layout/DefaultLayout'
import { baseShowtimes } from '@/api/baseAuth'
import { DetailShowtimes, updateShowtimes } from '@/api/showtime'
import { ContextMain } from '@/context/Context'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Flatpickr from 'react-flatpickr'
import { format } from 'date-fns'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { getAllMovie, getAllScreenRoom, getOneScreenRoom } from '@/api/movie'
import { Movie } from '@/admin/types/movie'
const UpdateShowtimes = () => {
  const { id } = useParams<{ id: string }>()
  const { addShowtime, editShowtimes, screenRoom } = useContext(ContextMain)
  const [open, setOpen] = React.useState(false)
  const [openMovie, setOpenMovie] = React.useState(false)
  const [screen, setScreen] = React.useState(false)
  const [valueMovie, setValueMovie] = React.useState('')
  const [screenValue, setScreenValue] = React.useState('')
  const [loading, setLoading] = useState(false)

  const [detailShowTime, setDetailShowTime] = useState<any>(null)
  const { register, handleSubmit, setValue } = useForm()
  const queryClient = useQueryClient()
  const { data } = useQuery<Movie[]>({
    queryKey: ['MOVIE'],
    queryFn: getAllMovie
  })
  console.log(' check data movie', data)
 
 
  console.log("check screen", screenRoom);
  
  const handleItemScreen = (itemName: any) => {
    setScreenValue(itemName._id)
    console.log('check itemScreen ', itemName)
    // Đặt giá trị cho 'value' khi người dùng chọn một phim
  }
  const handleItemMovie = (itemName: any) => {
    setValueMovie(itemName._id)
    console.log('check itemMovie ', itemName)
    // Đặt giá trị cho 'value' khi người dùng chọn một phim
  }
  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const response = await DetailShowtimes(id)
        
        const detail = response.data.response.docs
     

        setDetailShowTime(detail)
        if (detail) {
          setValue('date', detail[0].date)
          setValue('timeFrom', detail[0].timeFrom)
          setValue('timeTo', detail[0].timeTo)
          setValue('screenRoomId', detail[0].screenRoomId?._id || '')
          setScreenValue( detail[0].screenRoomId?._id || '')
          setValueMovie( detail[0].movieId?._id || '')
        }
      } catch (error) {
        console.error('Error fetching showtime:', error)
      }
    }
    fetchShowtime()
  }, [id])

  

  const edit = useMutation({
    mutationFn: async (data: any) => {
      // const { showtime } = data;
      try {
        const result = await updateShowtimes(data, id as string)
        return result
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data: any) => {
      // const { showtime } = data;
      queryClient.invalidateQueries(['SHOWTIMES'] as InvalidateQueryFilters)

      toast.success('Update lịch chiếu thành công <3')
    }

  })

  const onSubmit = async (showtime: any) => {
    try {
      setLoading(true)
      console.log('check showtime', showtime)
      // console.log("hhsfs",  await edit.mutateAsync(showtime));
      showtime.screenRoomId = screenValue
      showtime.movieId = valueMovie 
      console.log('check showtime', showtime)

      await edit.mutateAsync(showtime)
      toast.success('Update lịch chiếu thành công <3')
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message
        setLoading(false)

        toast.error(`Có lỗi xảy ra: ${errorMessage}`)
      } else {
        setLoading(false)

        toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
      }
    }
  }

  // Function to log changes
  const logChanges = (fieldName: string, value: any) => {
    console.log(`Field ${fieldName} changed to:`, value)
  }

  return (
    <>
      <DefaultLayout>
        <div className=" mx-auto mt-10">
          {detailShowTime && detailShowTime.length > 0 && (
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Ngày khởi chiếu
                    </label>
                    <Flatpickr
                  name="date"
                  defaultValue={detailShowTime?.[0]?.date || ''}
                  options={{
                    dateFormat: 'd-m-Y H:i',
                    enableTime: true,
                    onChange: (selectedDates) => {
                      const formattedDate = format(
                        selectedDates[0],
                        'dd-MM-yyyy HH:mm'
                      )
                      setValue('date', formattedDate)
                      logChanges('date', formattedDate)
                    }
                  }}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                      id="grid-first-name"
                      type="text"
                />
                    
                    
                  </div>


                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Thời Gian Khởi Chiếu
                    </label>
                    
                    <Flatpickr
                    name="timeFrom"
                    defaultValue={detailShowTime?.[0]?.timeFrom || ''}
                    options={{
                      dateFormat: 'd-m-Y H:i',
                      enableTime: true,
                      onChange: (selectedDates) => {
                        const formattedDate = format(
                          selectedDates[0],
                          'dd-MM-yyyy HH:mm'
                        )
                        setValue('timeFrom', formattedDate)
                        logChanges('timeFrom', formattedDate)
                      }
                    }}
                    placeholder="DD/MM/YYYY"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="grid-last-name"
                    type="text"
                  />



                    
                  </div>
                </div>

                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-last-time"
                    >
                      Thời Gian Kết Thúc
                    </label>

                    <Flatpickr
                    name="timeTo"
                    defaultValue={detailShowTime?.[0]?.timeTo || ''}
                    options={{
                      dateFormat: 'd-m-Y H:i',
                      enableTime: true,
                      onChange: (selectedDates) => {
                        const formattedDate = format(
                          selectedDates[0],
                          'dd-MM-yyyy HH:mm'
                        )
                        setValue('timeTo', formattedDate)
                        logChanges('timeTo', formattedDate)
                      }
                    }}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="grid-last-time"
                    type="text"
                    />

                  
                  
                  </div>

                  <div className="grid-cols-2 flex">
                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        htmlFor="movie"
                      >
                        Chọn Phim
                      </label>

                      <Popover open={openMovie} onOpenChange={setOpenMovie}>
                    <PopoverTrigger asChild>
                      <Button
                          variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[250px] justify-between border border-grey-lighter rounded hover:text-white text-sm h-12"

                      >
                        {(valueMovie && data &&
            data?.find((movie: any) => movie._id === valueMovie)?.name) ||
            (detailShowTime?.[0]?.movieId?.name ?? 'Chọn Phim')}

                        <ChevronsUpDown
                          size={16}
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="w-full justify-between">
                        <CommandInput
                          placeholder="Tìm kiếm phòng chiếu..."
                          className=""
                        />
                        <CommandList className="w-[250px] justify-between">
                          {data?.length === 0 ? (
                            <CommandEmpty>No country found.</CommandEmpty>
                          ) : (
                            <CommandGroup>
                              {data?.map((item:any) => (
                                <CommandItem
                                  className="w-[250px] justify-between text-sm"
                                  key={item._id}
                                  role="option"
                                  value={item.name}
                                  onSelect={() => {
                                    handleItemMovie(item)

                                    // Cập nhật giá trị của screen
                                  }}
                                >
                                  <div className="grid grid-cols-2  w-full">
                                        <span className='text-sm'>{item.name}</span>
                                        <span className="text-gray-500 text-end">
                                          {item.duration} phút
                                        </span>
                                      </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

               
                     
                    </div>

                    <div className="md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        htmlFor="movie"
                      >
                        Chọn Phòng Chiếu
                      </label>

                      <Popover open={screen} onOpenChange={setScreen}>
                    <PopoverTrigger asChild>
                      <Button
                          variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[250px] justify-between border border-grey-lighter rounded hover:text-white text-sm h-12"

                      >
                        {(screenValue && screenRoom &&
            screenRoom?.find((screen: any) => screen._id === screenValue)?.name) ||
            (detailShowTime?.[0]?.screenRoomId?.name ?? 'Chọn Phòng Chiếu')}

                        <ChevronsUpDown
                          size={16}
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="w-full justify-between">
                        <CommandInput
                          placeholder="Tìm kiếm phòng chiếu..."
                          className=""
                        />
                        <CommandList className="w-[250px] justify-between">
                          {screenRoom?.length === 0 ? (
                            <CommandEmpty>No country found.</CommandEmpty>
                          ) : (
                            <CommandGroup>
                              {screenRoom?.map((item:any) => (
                                <CommandItem
                                  className="w-[250px] justify-between text-sm"
                                  key={item._id}
                                  role="option"
                                  value={item.name}
                                  onSelect={() => {
                                    handleItemScreen(item)

                                    // Cập nhật giá trị của screen
                                  }}
                                >
                                  {item.name}
                                  {/* Thêm hình ảnh nếu cần */}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>



                   
                    
                    </div>
                  </div>
                </div>

                {/* <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      City
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      State
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        id="grid-state"
                      >
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                      </select>
                      <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Zip
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div> */}
                <button
                  type="submit"
                  className="middle none center w-full rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                >
                  Cập Nhật Lịch Chiếu
                </button>
              </div>




             
            </form>
          )}
        </div>
      </DefaultLayout>
    </>
  )
}

export default UpdateShowtimes

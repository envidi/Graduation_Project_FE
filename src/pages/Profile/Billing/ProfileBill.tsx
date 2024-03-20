import { CalendarDateRangePicker } from '@/components/react-day-picker'
// import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { getAllTicketByUser } from '@/api/ticket'
import { ContextMain } from '@/context/Context'
import { ChangeEventHandler, useContext, useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
import ProfileBillItem from './ProfileBillItem'
import { TicketBill } from '@/Interface/ticket'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import { useDebounce } from '@uidotdev/usehooks'
function ProfileBill() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const {
    userDetail: {
      message: { _id }
    }
  } = useContext(ContextMain)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 1, 20),
    to: addDays(new Date(2024, 2, 20), 30)
  })

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)
  useEffect(() => {
    const searchHN = async () => {
      setIsSearching(true)
      setResults(searchTerm)
      setIsSearching(false)
    }

    searchHN()
  }, [debouncedSearchTerm])
  const { data: dataBill, isLoading } = useQuery({
    queryKey: [
      'bill',
      {
        ...date,
        _q : results,
        _id
      }
    ],
    queryFn: () =>
      getAllTicketByUser({
        ...date,
        _q : results,
        _id
      })
  })
  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const target = e.target as HTMLInputElement
    setSearchTerm(target.value)
    setIsSearching(true)
  }

  return (
    <>
      <div className="flex gap-4">
        <Input
          placeholder="Enter your bill"
          className="basis-96 text-2xl py-8 border-primary-movieColor"
          onChange={handleChange}
          value={searchTerm}
        />
        <CalendarDateRangePicker date={date} setDate={setDate} className="" />
        {/* <Button className="bg-primary-movieColor text-2xl px-10">Search</Button> */}
      </div>
      {dataBill &&
        dataBill?.map((bill: TicketBill) => {
          return <ProfileBillItem key={bill._id} data={bill} />
        })}
    </>
  )
}

export default ProfileBill

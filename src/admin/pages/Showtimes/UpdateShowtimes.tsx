import DefaultLayout from '@/admin/layout/DefaultLayout'

import { useParams } from 'react-router-dom'

import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import './showtime.css'

import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import { useShowtime } from '@/hooks/useShowtime'
import FormUpdateShow from './FormUpdateShow'
import Loading from '@/admin/components/Loading/Loading'

const UpdateShowtimes = () => {
  const { id = '' } = useParams<{ id: string }>()

  const { data: dataDetailShow, isFetching } = useShowtime(id)
  // if (isFetching) return <Loading />

  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Sửa lịch chiếu"
          pageLink="/admin/showtimes"
          pageRetun="Lịch chiếu / Sửa lịch chiếu"
        />
        {!isFetching ? <FormUpdateShow show={dataDetailShow[0]} /> : <Loading />}
      </DefaultLayout>
    </>
  )
}

export default UpdateShowtimes

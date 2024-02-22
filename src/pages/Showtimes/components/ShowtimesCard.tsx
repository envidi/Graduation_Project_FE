import { getOneMovie } from '@/api/movie'
import { ShowTime } from '@/pages/MovieDetails/components/MovieInfoSection'
import {
  chuyenDoiNgayDauVao,
  convertAmPm,
  getDay,
  getHourAndMinute,
  selectCalendar
} from '@/utils'
import { AVAILABLE, MOVIE_DETAIL } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { format } from 'date-fns'

type ShowtimesCardProps = {
  _id: string
  userLocation: string
}
export const ShowtimesCard = (props: ShowtimesCardProps) => {
  // const dates2d = props['2D'] ? Object.keys(props['2D']) : []

  const navigate = useNavigate()

  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE_DETAIL, props._id],
    queryFn: () => getOneMovie(props._id)
  })

  const override = {
    display: 'block',
    margin: '4.8rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }

  function getFourConsecutiveDays() {
    return [...Array(4)].map((_, i) => new Date(Date.now() + i * 86400000))
  }

  // Sử dụng hàm để lấy mảng chứa 4 ngày liên tiếp
  const fourDays = getFourConsecutiveDays()

  // render showtimes của từng ngày
  const renderCurStartTimes = (curDate) => {
    const formatTime = format(curDate, 'dd-MM-yyyy HH:mm')

    const currentDay = getDay(formatTime)

    // tạo một object là ngày có value là mảng showtime của ngày đó
    const objShowTimePerDay: { [key: string]: ShowTime[] } = {}

    dataMovie.showTimeCol.forEach((showTime: ShowTime) => {
      const currDay = getDay(showTime.date)

      if (currDay) {
        objShowTimePerDay[currDay] = [
          ...(objShowTimePerDay[currDay] || []),
          showTime
        ]
      }
    })

    console.log('objShowTimePerDay', objShowTimePerDay)

    if (!objShowTimePerDay[currentDay]) {
      return null
    }
    return objShowTimePerDay[currentDay].map((curStartTime) => {
      return (
        <li key={`${curStartTime}`}>
          <button
            onClick={() => {
              navigate('/purchase')
            }}
            className="showtimes-startime-btn border-2 border-primary-movieColor hover:bg-primary-movieColorSecond text-primary-infoMovie xs:w-52 xs:h-20 md:w-40 md:h-16"
          >
            {convertAmPm(getHourAndMinute(curStartTime.timeFrom))}
          </button>
        </li>
      )
    })
  }

  const renderShowTimes = () => {
    // lap qua 4 ngay
    return fourDays.map((curDate, id) => {
      // render showtimes của từng ngày
      // lấy ra các giờ chiếu của ngày hiện tại

      const formattedDate = chuyenDoiNgayDauVao(getDay(selectCalendar(curDate)))

      return (
        <div
          key={`${dataMovie['name']} ${id}`}
          className="showtimes-schedule h-100"
        >
          <h3 className="showtimes-date">{formattedDate}</h3>
          <ul className="showtimes-startime-btn-list">
            {renderCurStartTimes(curDate)}
          </ul>
        </div>
      )
    })
  }

  // render
  return (
    <div className="showtimes-card">
      <div className="showtimes-card-leftpart">
        <div className="showtimes-img-box">
          <img
            className="showtimes-img"
            src={dataMovie.image}
            alt={dataMovie.name}
          />
        </div>

        <h2 className="showtimes-title">{dataMovie.name}</h2>
        <button
          className="showtimes-details-btn"
          onClick={() => navigate(`/movie/${props._id}`)}
        >
          See details
        </button>
      </div>

      <div className="showtimes-screen-container">
        {!dataMovie.showTimeCol || dataMovie.showTimeCol.length > 0 ? (
          <div className="showtimes-schedule-container">
            {renderShowTimes()}
          </div>
        ) : (
          <div className="h-full text-3xl flex items-center justify-center w-full">
            No showtime
          </div>
        )}
      </div>
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { getOneMovie } from '@/api/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { LocationSelector } from '../../../components/LocationSelector'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
// import axios from 'axios'
import { useParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import {
  chuyenDoiNgayDauVao,
  convertAmPm,
  getDay,
  getHourAndMinute,
  selectCalendar
} from '@/utils'

export interface ShowTime {
  _id: string
  screenRoomId: string
  status: string
  timeFrom: string
  timeTo: string
  date: string
}

export const MovieInfoSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const id = useParams()
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: ['MOVIE', id],
    queryFn: () => getOneMovie('65c8dc874a19975a1cc5fc7e')
  })

  const isTrue = true
  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }

  const {
    name,
    image,
    rate,
    author,
    actor,
    language,
    duration,
    categoryCol,
    fromDate,
    desc,
    showTimeCol
  } = dataMovie
  const today = chuyenDoiNgayDauVao(getDay(selectCalendar(date)))

  const showTimePerDay = showTimeCol
    .map((showTime: ShowTime) => {
      if (
        getDay(showTime.date) === getDay(selectCalendar(date)) &&
        showTime.status === 'Available'
      ) {
        return showTime
      }
    })
    .filter(function (element: ShowTime) {
      return element !== undefined
    })

  return (
    <div className="section-movie-info container ">
      <div className="max-w-[132rem] mx-auto px-[3.2rem]">
        <div className="movie-info-grid-container">
          <div className="movie-info-img-container">
            <LazyLoadImage
              className="movie-info-img"
              src={image}
              alt={'Movie Photo'}
              effect="blur"
            />
          </div>

          <div className="movie-info-attr-container">
            <h2 className="movie-info-name">{name}</h2>

            <div className="movie-info-small-container ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="movie-info-icon"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"
                />
                <path
                  d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
              <p>{language}</p>
            </div>

            <div className="movie-info-small-container ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="movie-info-icon"
                viewBox="0 0 512 512"
              >
                <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
              </svg>
              <p>{rate}/10</p>
            </div>

            <div className="movie-info-small-container ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="movie-info-icon"
                viewBox="0 0 512 512"
              >
                <rect
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  x="48"
                  y="80"
                  width="416"
                  height="384"
                  rx="48"
                />
                <circle cx="296" cy="232" r="24" />
                <circle cx="376" cy="232" r="24" />
                <circle cx="296" cy="312" r="24" />
                <circle cx="376" cy="312" r="24" />
                <circle cx="136" cy="312" r="24" />
                <circle cx="216" cy="312" r="24" />
                <circle cx="136" cy="392" r="24" />
                <circle cx="216" cy="392" r="24" />
                <circle cx="296" cy="392" r="24" />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  strokeLinecap="round"
                  d="M128 48v32M384 48v32"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M464 160H48"
                />
              </svg>
              <p>{getDay(fromDate)}</p>
            </div>

            <div className="movie-info-small-container ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="movie-info-icon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M256 128v144h96"
                />
              </svg>
              <p>{duration}</p>
            </div>

            <div className="movie-info-genre-container">
              <p className="movie-info-title">Genre: </p>
              {categoryCol.map((category: { _id: string; name: string }) => (
                <p key={category._id}>{category.name}</p>
              ))}
            </div>

            <div className="movie-info-director-container">
              <p className="movie-info-title">Directed by: </p>
              <p>{author}</p>
            </div>

            <div className="movie-info-cast-container">
              <p className="movie-info-title">Top Cast: </p>
              <p>{actor}</p>
            </div>
          </div>
        </div>

        <div className="movie-info-description-container">
          <h3 className="movie-info-description-heading">Synopsis</h3>
          <p className="movie-info-description">{desc}</p>
        </div>

        <div className="movie-info-location-container">
          <LocationSelector />
        </div>

        <h3 className="movie-info-screen-heading heading-collection w-fit mb-10">
          Showtimes
        </h3>
        <div className="flex md:flex-row w-full md:items-start md:justify-between sm:items-center sm:flex-col xs:flex-col xs:items-center ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md px-5 border border-border-calendarBorder mt-[3.2rem] "
          />
          {isTrue ? (
            <div className="movie-info-screen-container md:basis-3/5 lg:basis-2/3 sm:w-full  xs:w-full ">
              <div
                className={`movie-info-screen-container-3d ${showTimePerDay.length > 0 ? 'grid' : ''}`}
              >
                <h2 className="showtimes-screen">{today}</h2>

                {showTimePerDay.length > 0 ? (
                  showTimePerDay.map((showtime: ShowTime, index: number) => {
                    return (
                      <div
                        className="showtimes-schedule md:my-8 xs:my-10"
                        key={index}
                      >
                        {/* <h3 className="showtimes-date">Aug 19, 2023</h3> */}
                        <button className="showtimes-startime-btn xs:w-52 xs:h-20 md:w-40 md:h-16">
                          {convertAmPm(getHourAndMinute(showtime.timeFrom))}
                        </button>
                      </div>
                    )
                  })
                ) : (
                  <div className="h-32 text-3xl flex items-center justify-center w-full">
                    No showtime in this day
                  </div>
                )}
              </div>
            </div>
          ) : (
            <HashLoader cssOverride={override} size={60} color="#eb3656" />
          )}
        </div>
      </div>
    </div>
  )
}
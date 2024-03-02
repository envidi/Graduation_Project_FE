import { useQuery } from '@tanstack/react-query'
import { getOneMovie } from '@/api/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { LocationSelector } from '../../../components/LocationSelector'
import { Calendar } from '@/components/ui/calendar'
import { useEffect, useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ticketAction } from '@/store/ticket'

import { useParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import {
  chuyenDoiNgayDauVao,
  convertAmPm,
  getDay,
  getHourAndMinute,
  selectCalendar
} from '@/utils'
import { AVAILABLE, MOVIE_DETAIL } from '@/utils/constant'
import { useSelector } from 'react-redux'
import { MovieType } from '@/Interface/movie'

export interface ShowTime {
  _id: string
  screenRoomId: {
    _id: string
    name : string
  }
  cinemaId: {
    _id: string
    CinemaName: string
    CinemaAdress: string
  }
  status: string
  timeFrom: string
  timeTo: string
  date: string
}

export const MovieInfoSection = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.movies.movies)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const navigate = useNavigate()
  const { slug } = useParams()

  const { _id = '' } =
    movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE_DETAIL, _id],
    queryFn: () => getOneMovie(_id)
  })

  useEffect(() => {
    if (
      dataMovie &&
      Object.keys(dataMovie).length > 0 &&
      dataMovie?.showTimeCol?.length > 0
    ) {
      setCurrentLocation(dataMovie?.showTimeCol[0]?.cinemaId?._id || [])
    }
  }, [dataMovie])
  const handleCurrentLocation = (locationId: string) => {
    setCurrentLocation(locationId)
  }
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
    ?.map((showTime: ShowTime) => {
      if (
        getDay(showTime.date) === getDay(selectCalendar(date)) &&
        showTime.status === AVAILABLE &&
        showTime.cinemaId._id.toString() === currentLocation.toString()
      ) {
        return showTime
      }
    })
    .filter(function (element: ShowTime) {
      return element !== undefined
    })
  const handleChooseShowtime = (showtime: ShowTime) => {
    dispatch(
      ticketAction.addProperties({
        id_showtime: showtime._id,
        id_movie: _id,
        hall_name: showtime.screenRoomId.name,
        hall_id: showtime.screenRoomId._id
      })
    )
    navigate('/purchase/seat')
  }

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
            <h2 className="movie-info-name text-primary-nameMovie">{name}</h2>

            <div className="movie-info-small-container text-primary-locationMovie">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
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
                className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
                viewBox="0 0 512 512"
              >
                <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
              </svg>
              <p>{rate}/10</p>
            </div>

            <div className="movie-info-small-container ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
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
                className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
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

            <div className="movie-info-genre-container text-primary-infoMovie">
              <p className="movie-info-title text-primary-movieColor">
                Genre:{' '}
              </p>
              {categoryCol?.map((category: { _id: string; name: string }) => (
                <p key={category._id}>{category.name}</p>
              ))}
            </div>

            <div className="movie-info-director-container text-primary-infoMovie">
              <p className="movie-info-title text-primary-movieColor">
                Directed by:{' '}
              </p>
              <p>{author}</p>
            </div>

            <div className="movie-info-cast-container text-primary-infoMovie">
              <p className="movie-info-title text-primary-movieColor">
                Top Cast:{' '}
              </p>
              <p>{actor}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline">
                  Trailer
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 w-fit">
                <iframe
                  width="917"
                  height="516"
                  src="https://www.youtube.com/embed/RemcgXjZEHM"
                  title="Một video hạnh phúc để gửi lời chúc Valentine | Review Xàm: Gara Hạnh Phúc"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="movie-info-description-container">
          <h3 className="movie-info-description-heading">Synopsis</h3>
          <p className="movie-info-description">{desc}</p>
        </div>

        <div className="movie-info-location-container">
          <LocationSelector handleCurrentLocation={handleCurrentLocation} />
        </div>

        <h3 className="movie-info-screen-heading border-b-4 border-primary-movieColor text-primary-movieColor w-fit mb-10">
          Showtimes
        </h3>
        <div className="flex md:flex-row w-full md:items-start md:justify-between sm:items-center sm:flex-col xs:flex-col xs:items-center ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md px-5 border border-border-calendarBorder shadow mt-[3.2rem] "
          />
          <div className="movie-info-screen-container md:basis-3/5 lg:basis-2/3 sm:w-full xs:w-full">
            <div
              className={`movie-info-screen-container-3d bg-background-third ${showTimePerDay?.length > 0 ? 'grid' : ''}`}
            >
              <h2 className="showtimes-screen bg-background-headerShow shadow-lg dark:shadow-2xl text-primary-locationMovie">
                {today}
              </h2>

              {showTimePerDay?.length > 0 ? (
                showTimePerDay.map((showtime: ShowTime, index: number) => {
                  return (
                    <div
                      className="showtimes-schedule md:my-8 xs:my-10"
                      key={index}
                      onClick={() => handleChooseShowtime(showtime)}
                    >
                      {/* <h3 className="showtimes-date">Aug 19, 2023</h3> */}
                      <button className="showtimes-startime-btn border-2 border-primary-movieColor hover:bg-primary-movieColorSecond text-primary-infoMovie xs:w-52 xs:h-20 md:w-40 md:h-16">
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
        </div>
      </div>
    </div>
  )
}

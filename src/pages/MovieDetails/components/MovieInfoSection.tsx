import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOneMovie } from '@/api/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { LocationSelector } from '../../../components/LocationSelector'
// import { Calendar } from '@/components/ui/calendar'
import { useContext } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TicketType, ticketAction } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'

import { useParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { chuyenDoiNgay, getDay } from '@/utils'
import { MOVIE_DETAIL, WATCHLIST } from '@/utils/constant'
import { useSelector } from 'react-redux'
import { MovieType } from '@/Interface/movie'
import { Plus, Loader } from 'lucide-react'
import { addWatchList } from '@/api/watchList'
import { ContextMain } from '@/context/Context'
import { toast } from 'react-toastify'
import useWatchList from '@/hooks/useWatchList'
import MovieShowtimeSection from './MovieShowtimeSection'

export interface ShowTimeType {
  screenRoomId: string
  _id: string
  timeFrom: string
  date: string
}
export interface ShowTime {
  _id: string
  screenRoomId: {
    _id: string
    name: string
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
  const queryClient = useQueryClient()
  const { userDetail } = useContext(ContextMain)
  const { data: dataWatchList } = useWatchList(userDetail)
  const watchListId = dataWatchList
    ? dataWatchList.map(
        (watchId: { movieId: { _id: string } }) => watchId.movieId._id
      )
    : []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.movies.movies)
  const [, setTicket] = useLocalStorage<TicketType | null>('ticket', null)
  // const [date] = useState<Date | undefined>(new Date())
  // const [currentLocation, setCurrentLocation] = useState<string>(
  //   '65d30a80a047aeebd3c78c72'
  // )
  const navigate = useNavigate()
  const { slug } = useParams()

  const { _id = '' } =
    movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)
  const { mutate: mutateWatchlist, isPending } = useMutation({
    mutationFn: (data: { userId: string; movieId: string }) =>
      addWatchList(data),
    onSuccess: () => {
      toast.success('success', {
        position: 'top-right'
      })
      queryClient.invalidateQueries({
        queryKey: [WATCHLIST]
      })
    }
  })
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE_DETAIL, _id],
    queryFn: () => getOneMovie(_id)
  })

  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }

  const {
    _id: movieId,
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
    trailer,
    // showTimeCol,
    moviePriceCol,
    showTimeDimension
  } = dataMovie

  const handleChooseShowtime = (showtime: ShowTimeType) => {
    const screenRoom = dataMovie.showTimeCol.find(
      (screen: { screenRoomId: { _id: string } }) => {
        return screen.screenRoomId._id == showtime.screenRoomId
      }
    )

    const ticketObject = {
      id_showtime: showtime._id,
      cinema_name: screenRoom.cinemaId.CinemaName,
      cinemaId: screenRoom.cinemaId._id,
      id_movie: _id,
      hall_name: screenRoom.screenRoomId.name,
      hall_id: screenRoom.screenRoomId._id,
      image_movie: image,
      name_movie: name,
      duration_movie: duration,
      price_movie: moviePriceCol[0].price,
      price_id: moviePriceCol[0]._id,
      time_from: showtime.timeFrom
    }
    dispatch(ticketAction.addProperties(ticketObject))
    setTicket(ticketObject)
    navigate('/purchase/seat')
  }

  const handleAddWatchList = () => {
    mutateWatchlist({ movieId: movieId, userId: userDetail.message._id })
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
              <p>{rate}/5</p>
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
                Thể loại:{' '}
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
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="md" variant="outline">
                    Trailer
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 w-fit">
                  <iframe
                    width="917"
                    height="516"
                    src={trailer}
                    title="Một video hạnh phúc để gửi lời chúc Valentine | Review Xàm: Gara Hạnh Phúc"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </DialogContent>
              </Dialog>
              {!watchListId.includes(_id) ? (
                <Button
                  onClick={handleAddWatchList}
                  className="bg-primary-movieColor text-2xl flex items-center border-transparent hover:text-primary-movieColor hover:bg-transparent border hover:border-primary-movieColor"
                >
                  {isPending ? (
                    <div className="px-10">
                      <Loader className="animate-spin" />
                    </div>
                  ) : (
                    <>
                      <Plus size={20} /> Watchlist
                    </>
                  )}
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        <div className="movie-info-description-container">
          <h3 className="movie-info-description-heading">Synopsis</h3>
          <p className="movie-info-description">{desc}</p>
        </div>

        <h3 className="movie-info-screen-heading border-b-4 border-primary-movieColor text-primary-movieColor w-fit mb-10">
          Showtimes
        </h3>
        <div className="flex md:flex-row w-full md:items-start md:justify-between sm:items-center sm:flex-col xs:flex-col xs:items-center gap-10 ">
          {showTimeDimension && showTimeDimension.length > 0 && (
            <MovieShowtimeSection
              handleChooseShowtime={handleChooseShowtime}
              showTimeDimension={showTimeDimension}
            />
          )}
          {!showTimeDimension ||
            (showTimeDimension.length == 0 && (
              <div className="movie-info-screen-container md:basis-3/5 lg:basis-2/3 sm:w-full xs:w-full">
                <div className="movie-info-screen-container-3d bg-background-third ">
                  <h2 className="showtimes-screen bg-background-headerShow shadow-lg dark:shadow-2xl text-primary-locationMovie">
                    {chuyenDoiNgay(new Date())}
                  </h2>

                  <div className="h-32 text-3xl flex items-center justify-center w-full">
                    No showtime in this day
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

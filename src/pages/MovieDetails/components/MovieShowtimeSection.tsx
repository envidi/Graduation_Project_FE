import { chuyenDoiNgay, convertAmPm, getHourAndMinute } from '@/utils'
import { ShowTimeType } from './MovieInfoSection'

interface MovieShowtimeSectionType {
  showTimeDimension: ShowTimeType[][]
  // eslint-disable-next-line no-unused-vars
  handleChooseShowtime: (state: ShowTimeType) => void
}

function MovieShowtimeSection({
  showTimeDimension,
  handleChooseShowtime
}: MovieShowtimeSectionType) {
  return showTimeDimension.map((showTimeDay: ShowTimeType[], index: number) => {
    return (
      <div
        key={index}
        className="movie-info-screen-container md:basis-3/5 lg:basis-[47%] sm:w-full xs:w-full"
      >
        <div
          className={`movie-info-screen-container-3d bg-background-third grid ${showTimeDimension?.length > 0 ? 'grid' : ''}`}
        >
          <h2 className="showtimes-screen bg-background-headerShow shadow-lg dark:shadow-2xl text-primary-locationMovie">
            {showTimeDay && chuyenDoiNgay(showTimeDay[0]?.date)}
          </h2>

          {showTimeDay?.length > 0 ? (
            showTimeDay.map((showtime: ShowTimeType, index: number) => {
              return (
                <div
                  className="showtimes-schedule md:my-8 xs:my-10"
                  key={index}
                  onClick={() => handleChooseShowtime(showtime)}
                >
                  <button className="showtimes-startime-btn border-2 border-primary-movieColor hover:bg-primary-movieColorSecond text-primary-infoMovie xs:w-52 xs:h-20 md:w-40 md:h-16">
                    {convertAmPm(getHourAndMinute(showtime.timeFrom))}
                  </button>
                </div>
              )
            })
          ) : (
            <div className="h-32 text-3xl flex items-center justify-center w-full">
             Không có lịch chiếu vào ngày này
            </div>
          )}
        </div>
      </div>
    )
  })
}

export default MovieShowtimeSection

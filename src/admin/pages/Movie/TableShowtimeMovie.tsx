import { ShowTimeCol } from '@/Interface/movieDetail'
import { getDay, getHourAndMinute } from '@/utils'

// const showData: show[] = [
//   {
//     logo: showOne,
//     name: 'Google',
//     visitors: 3.5,
//     revenues: '5,768',
//     sales: 590,
//     conversion: 4.8
//   },
//   {
//     logo: showTwo,
//     name: 'Twitter',
//     visitors: 2.2,
//     revenues: '4,635',
//     sales: 467,
//     conversion: 4.3
//   },
//   {
//     logo: showThree,
//     name: 'Github',
//     visitors: 2.1,
//     revenues: '4,290',
//     sales: 420,
//     conversion: 3.7
//   },
//   {
//     logo: showFour,
//     name: 'Vimeo',
//     visitors: 1.5,
//     revenues: '3,580',
//     sales: 389,
//     conversion: 2.5
//   },
//   {
//     logo: showFive,
//     name: 'Facebook',
//     visitors: 3.5,
//     revenues: '6,768',
//     sales: 390,
//     conversion: 4.2
//   }
// ]

const TableShowTimeMovie = ({
  dataShowtime
}: {
  dataShowtime: ShowTimeCol[]
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Lịch chiếu
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2 xl:py-5 hidden sm:block">
            <h5 className=" text-sm font-medium uppercase xsm:text-base ">
              Thứ tự
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ngày chiếu
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Giờ chiếu
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Giờ kết thúc
            </h5>
          </div>
          <div className=" p-2 text-center block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phòng chiếu
            </h5>
          </div>
        </div>

        {dataShowtime?.length > 0 ? (
          dataShowtime?.map((show, key: number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === dataShowtime.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="sm:flex hidden items-center gap-3 p-2 xl:p-5">
                {key + 1}
              </div>

              <div className="flex items-center justify-center p-2 xl:p-5">
                <p className="text-black dark:text-white">
                  {getDay(show.timeFrom)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2 xl:p-5">
                <p className="text-meta-3">
                  {getHourAndMinute(show?.timeFrom) || ''}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {getHourAndMinute(show?.timeTo) || ''}
                </p>
              </div>

              <div className=" items-center justify-center p-2 flex xl:p-5">
                <p className="text-meta-5">{show?.screenRoomId?.name || ''}</p>
              </div>
            </div>
          ))
        ) : (
          <div
            className='flex items-center justify-center py-3'
          >
            Không có lịch chiếu
          </div>
        )}
      </div>
    </div>
  )
}

export default TableShowTimeMovie

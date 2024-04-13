// import { BRAND } from '../../types/brand'
// import BrandOne from '../../images/brand/brand-01.svg'
// import BrandTwo from '../../images/brand/brand-02.svg'
// import BrandThree from '../../images/brand/brand-03.svg'
// import BrandFour from '../../images/brand/brand-04.svg'
// import BrandFive from '../../images/brand/brand-05.svg'
import { addCommasToNumber } from '@/utils'
import useStatistic from '@/hooks/useStatistic'
interface TopMovieType {
  movieDetails: { name: string; image: string }[]
  profit: number
  totalSold: number
  count: number
}
interface TopUserType {
  userDetails: { name: string; avatar: string; email: string }[]
  count: number
  totalSold: number
}
// const brandData: BRAND[] = [
//   {
//     logo: BrandOne,
//     name: 'Google',
//     visitors: 3.5,
//     revenues: '5,768',
//     sales: 590,
//     conversion: 4.8
//   },
//   {
//     logo: BrandTwo,
//     name: 'Twitter',
//     visitors: 2.2,
//     revenues: '4,635',
//     sales: 467,
//     conversion: 4.3
//   },
//   {
//     logo: BrandThree,
//     name: 'Github',
//     visitors: 2.1,
//     revenues: '4,290',
//     sales: 420,
//     conversion: 3.7
//   },
//   {
//     logo: BrandFour,
//     name: 'Vimeo',
//     visitors: 1.5,
//     revenues: '3,580',
//     sales: 389,
//     conversion: 2.5
//   },
//   {
//     logo: BrandFive,
//     name: 'Facebook',
//     visitors: 3.5,
//     revenues: '6,768',
//     sales: 390,
//     conversion: 4.2
//   }
// ]

const TableOne = ({ title, action }: { title: string; action: string }) => {
  const { data: dataTop = {}, isLoading: loadingdataTop } = useStatistic(action)

  if (loadingdataTop) {
    return <div>loading</div>
  }
  if (action === 'TOP_USER') {
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 my-5">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên người dùng
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5 sm:block hidden">
              <h5 className=" text-sm font-medium  uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Số lần mua
              </h5>
            </div>
            <div className=" p-2.5 text-center  xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tổng tiền
              </h5>
            </div>
            {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Conversion
              </h5>
            </div> */}
          </div>

          {dataTop.map((top_movie: TopUserType, key: number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === dataTop.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5 ">
                <div className="flex-shrink-0">
                  <img
                    width={'50'}
                    src={top_movie.userDetails[0]?.avatar}
                    alt="Brand"
                  />
                </div>
                <p className="hidden text-black dark:text-white sm:block ">
                  {top_movie.userDetails[0]?.name}
                </p>
              </div>
              <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5 ">
                <p className="text-black dark:text-white">
                  {top_movie.userDetails[0]?.email}
                </p>
              </div>

              <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5 ">
                <p className="text-black dark:text-white">
                  {addCommasToNumber(top_movie?.count)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {addCommasToNumber(top_movie?.totalSold)}
                </p>
              </div>

              {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{brand.conversion}%</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phim
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5 sm:block hidden">
            <h5 className=" text-sm font-medium  uppercase xsm:text-base">
              Vé đã bán
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Doanh thu
            </h5>
          </div>
          <div className=" p-2.5 text-center  xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lợi nhuận
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div> */}
        </div>

        {dataTop.map((top_movie: TopMovieType, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === dataTop.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5 ">
              <div className="flex-shrink-0">
                <img
                  width={'50'}
                  src={top_movie.movieDetails[0]?.image}
                  alt="Brand"
                />
              </div>
              <p className="hidden text-black dark:text-white sm:block ">
                {top_movie.movieDetails[0]?.name}
              </p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5 ">
              <p className="text-black dark:text-white">
                {addCommasToNumber(top_movie?.count)}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">
                {addCommasToNumber(top_movie?.totalSold)}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5  xl:p-5">
              <p className="text-black dark:text-white">
                {addCommasToNumber(top_movie?.profit)}
              </p>
            </div>

            {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.conversion}%</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableOne

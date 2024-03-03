import { FoodType } from '@/Interface/food'
import { Star } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Minus } from 'lucide-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'


function FoodItem({ food }: FoodType) {
  return (
    <div className="showtimes-schedule md:my-8 xs:my-10">
      {/* <h3 className="showtimes-date">Aug 19, 2023</h3> */}
      <div className="rounded-xl ">
        <LazyLoadImage
          className="object-cover hover:scale-110 transition-all duration-300 ease-in-out rounded-xl"
          src={food.image}
          alt={'Movie Photo'}
          effect="opacity"
        />
      </div>
      <div className="food-item flex flex-col mt-3 bg-background-secondary rounded-xl px-5 py-5 border-2 border-border-calendarBorder shadow-md  primary-movieColor">
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((_: number, index: number) => (
            <Star
              key={index}
              size={15}
              className="fill-primary-movieColor text-primary-movieColor"
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="text-primary-locationMovie text-2xl">{food.name}</div>
          <div className="bg-primary-movieColor text-primary-nameMovie px-5 py-2 rounded-lg text-2xl">
            ${food.price}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          {/* <div className="border-2 border-primary-movieColor rounded-lg bg-transparent text-2xl px-3 py-2 text-primary-movieColor">
              Order now
            </div> */}
          <div className="flex gap-4  ">
            <span className="border-[1px] border-primary-nameMovie flex items-center rounded-lg sm:px-2 sm:py-2 xs:px-5 xs:py-3 hover:bg-primary-movieColor hover:border-primary-movieColor hover:cursor-pointer">
              <Minus size={18} />
            </span>
            <input
              type="text"
              className="lg:w-20 md:w-20 sm:w-16 xs:w-20 bg-transparent border-primary-nameMovie border-[1px] rounded-lg outline-none px-3 text-2xl py-2"
              value={1}
            />
            <span className="border-[1px] border-primary-nameMovie flex items-center rounded-lg sm:px-2 sm:py-2 xs:px-5 xs:py-3 hover:bg-primary-movieColor hover:border-primary-movieColor hover:cursor-pointer">
              <Plus size={18} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
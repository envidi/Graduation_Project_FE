import { QueryMovie } from '@/api/movie'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
const ages = [
  { value: '9', age: '9+' },
  { value: '13', age: '13+' },
  { value: '18', age: '18+' }
]
import { Dispatch, SetStateAction } from 'react'
interface FilterAgeType {
  query: { age: string }
  setQuery: Dispatch<SetStateAction<QueryMovie>>
  className: string
  handleCloseSheet?: ()=>void
}
function FilterAge({ setQuery, query, className,handleCloseSheet }: FilterAgeType) {
  const handleSelectAge = (age: string) => {
    setQuery((prev: QueryMovie): QueryMovie => {
      const old = { ...prev }
      return {
        ...old,
        age
      }
    })
    handleCloseSheet && handleCloseSheet()
  }
  return (
    <Select onValueChange={handleSelectAge}>
      <SelectTrigger
        className={`w-[110px] bg-transparent rounded-full text-xl font-semibold flex px-10 border-2 border-primary-movieColor ${className}`}
      >
<<<<<<< HEAD
        <SelectValue placeholder="Chọn tuổi" />
=======
        <SelectValue placeholder="Theo độ tuổi" />
>>>>>>> 4e99822c989c331a0caaf315ddc77fa06ca159e2
      </SelectTrigger>
      <SelectContent className=" bg-background-main p-2 border-primary-movieColor">
        <SelectGroup>
          <SelectLabel className="bg-background-secondary text-primary-movieColor text-2xl py-3 rounded-md">
<<<<<<< HEAD
            Chọn tuổi
=======
            Chọn theo độ tuổi
>>>>>>> 4e99822c989c331a0caaf315ddc77fa06ca159e2
          </SelectLabel>
          <SelectItem
            value="0"
            className={`bg-background-secondary my-2 text-2xl text-primary-movieColor py-3 rounded-md focus:bg-accent focus:text-accent-foreground ${query.age === '0' ? 'bg-accent text-accent-foreground' : ''}`}
          >
<<<<<<< HEAD
          Bất kỳ độ tuổi
=======
            Mọi độ tuổi
>>>>>>> 4e99822c989c331a0caaf315ddc77fa06ca159e2
          </SelectItem>
          {ages.map((age, index) => {
            return (
              <SelectItem
                key={index}
                value={age.value}
                className={`bg-background-secondary my-2 text-2xl text-primary-movieColor py-3 rounded-md focus:bg-accent focus:text-accent-foreground ${query.age === age.value ? 'bg-accent text-accent-foreground' : ''}`}
              >
                {age.age}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterAge

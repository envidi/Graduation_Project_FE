import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import HashLoader from 'react-spinners/HashLoader'

export const LocationSelector = () => {
  // const [loading, setLoading] = useState(true)

  // const locationOptions =
  //   locationData.length > 0 &&
  //   locationData.map((location:any, idx:any) => {
  //     return (
  //       <option key={idx} value={location.location}>
  //         {location.location}
  //       </option>
  //     )
  //   })

  return true ? (
    <div className="location-select-container ">
      <Select>
        <SelectTrigger className="w-[10rem] bg-[#313441] outline-none py-8 text-[#e6e6e8] border-none px-5 text-[1.7rem] rounded-xl">
          <SelectValue placeholder="BHD" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="text-[1.6rem]" value="BHD">
            BHD
          </SelectItem>
          <SelectItem className="text-[1.6rem]" value="CGV">
            CGV
          </SelectItem>
        </SelectContent>
      </Select>

      <p className="selected-location">
        Location: <span>Hà Nội</span>
      </p>
      <p className="selected-theatre">
        Theatre: <span>BHD</span>
      </p>
    </div>
  ) : (
    <HashLoader color="#eb3656" />
  )
}

import { LocationSelector } from '../../../components/LocationSelector'
import { CategorySelector } from './CategorySelector'

type ShowTimesHeaderProps = {
  handleCurrentLocation: (locationId: string) => void
}

export const ShowTimesHeader = ({
  handleCurrentLocation
}: ShowTimesHeaderProps) => {
  return (
    <section className="showtimes-header container">
      <LocationSelector handleCurrentLocation={handleCurrentLocation} />
      <CategorySelector />
    </section>
  )
}

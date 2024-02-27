import { LocationSelector } from '../../../components/LocationSelector'
import { CategorySelector } from './CategorySelector'

type ShowTimesHeaderProps = {
  handleCurrentLocation: (locationId: string) => void
  handleSelectedCategory: (categoryId: string) => void
}

export const ShowTimesHeader = ({
  handleCurrentLocation,
  handleSelectedCategory
}: ShowTimesHeaderProps) => {
  return (
    <section className="showtimes-header container">
      <LocationSelector handleCurrentLocation={handleCurrentLocation} />
      <CategorySelector handleSelectedCategory={handleSelectedCategory} />
    </section>
  )
}

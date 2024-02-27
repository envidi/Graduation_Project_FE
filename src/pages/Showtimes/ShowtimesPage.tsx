import { useState } from 'react'
import { AnimatedPage } from '../../components/AnimatedPage'
import { ShowTimesCollection } from './components/ShowTimesCollection'
import { ShowTimesHeader } from './components/ShowTimesHeader'

const ShowtimesPage = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [currentCategory, setCurrentCategory] = useState<string>('')

  const handleCurrentLocation = (locationId: string) => {
    setCurrentLocation(locationId)
  }

  const handleSelectedCategory = (categoryId: string) => {
    setCurrentCategory(categoryId)
  }

  console.log('currentCategory', currentCategory)
  return (
    <AnimatedPage>
      <>
        <ShowTimesHeader
          handleCurrentLocation={handleCurrentLocation}
          handleSelectedCategory={handleSelectedCategory}
        />
        <ShowTimesCollection
          userLocation={currentLocation}
          currentCategory={currentCategory}
        />
      </>
    </AnimatedPage>
  )
}

export default ShowtimesPage

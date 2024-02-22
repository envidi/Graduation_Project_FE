import { useState } from 'react'
import { AnimatedPage } from '../../components/AnimatedPage'
import { ShowTimesCollection } from './components/ShowTimesCollection'
import { ShowTimesHeader } from './components/ShowTimesHeader'

const ShowtimesPage = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('')

  console.log({ currentLocation })
  const handleCurrentLocation = (locationId: string) => {
    setCurrentLocation(locationId)
  }

  return (
    <AnimatedPage>
      <>
        <ShowTimesHeader handleCurrentLocation={handleCurrentLocation} />
        <ShowTimesCollection userLocation={currentLocation} />
      </>
    </AnimatedPage>
  )
}

export default ShowtimesPage

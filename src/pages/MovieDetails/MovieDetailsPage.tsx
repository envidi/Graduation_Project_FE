// import { Navbar } from '../../components/Navbar'
import { MovieInfoSection } from './components/MovieInfoSection'
import { MovieInfoCollection } from './components/MovieInfoCollection'
// import { Footer } from '../../components/Footer'
import { AnimatedPage } from '../../components/AnimatedPage'
import Comment from '@/components/Comment/Comment'

import '@/components/Comment/comment.css'

const MovieDetailsPage = () => {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  // }, [movieDetailsId])

  return (
    <AnimatedPage>
      <>
        <MovieInfoSection />
        <MovieInfoCollection />
        <div className="App">
          <Comment />
        </div>
      </>
    </AnimatedPage>
  )
}

export default MovieDetailsPage

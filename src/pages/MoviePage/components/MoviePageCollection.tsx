import MoviePageItem from './MoviePageItem'

function MoviePageCollection() {

  return (
    <section className="section-movies-page bg-background-secondary">
      <div className="movies-page-collection container">
        <MoviePageItem title="Trending now" status='' />
        <MoviePageItem title="Coming soon" status='COMING_SOON'/>
      </div>
    </section>
  )
}

export default MoviePageCollection

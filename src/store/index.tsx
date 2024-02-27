import { configureStore } from '@reduxjs/toolkit'

import movies from './movie'


const store = configureStore({
  reducer: {
    movies: movies.reducer
  }
})

export default store

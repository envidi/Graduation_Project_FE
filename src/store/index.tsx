import { configureStore } from '@reduxjs/toolkit'

import movies from './movie'
import categories from './category'


const store = configureStore({
  reducer: {
    movies: movies.reducer,
    categories: categories.reducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export default store

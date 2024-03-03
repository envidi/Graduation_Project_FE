import { createSlice } from '@reduxjs/toolkit'

const foodInitialState = {
  foods: []
}

const foods = createSlice({
  name: 'foods',
  initialState: foodInitialState,
  reducers: {
    incrementFood(state: any, action: any) {
      const existFood = state.foods.some(
        (food: any) => food.id === action.payload.id
      )
      if (existFood) {
        state.foods = [
          ...state.foods.map((food: any) => {
            if (food.id === action.payload.id) {
              return {
                ...food,
                quantity: food.quantity + 1
              }
            }
            return food
          })
        ]
        return
      }
      state.foods = [...state.foods, action.payload]
    },
    decrementFood(state: any, action: any) {
      const existFood = state.foods.find((food) => {
        return food.id == action.payload.id
      })
      if (existFood.quantity <= 1) {
        state.foods = [
          ...state.foods.filter((food: any) => food.id !== action.payload.id)
        ]
        return
      }
      state.foods = [
        ...state.foods.map((food: any) => {
          if (food.id === action.payload.id) {
            return {
              ...food,
              quantity: food.quantity - 1
            }
          }
          return food
        })
      ]
    }
  }
})

export const foodsAction = foods.actions

export default foods

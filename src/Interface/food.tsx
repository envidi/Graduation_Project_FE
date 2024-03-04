export interface FoodType {
  food: {
    _id: string
    name: string
    image: string
    price: number,
    quantity?: number
  }
  index: number
}
export interface FoodCollectionType {
  _id: string
  name: string
  image: string
  price: number
}
export interface FoodItemState{
  _id : string
  name : string
  quantity : number
  price : number,
  image ?:string
}

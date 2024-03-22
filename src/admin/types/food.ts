export interface Food {
    _id?: string
    name: string
    price: number
    image?: string
    isDeleteable?: boolean
}

export interface FormFoodAdd {
    name: string
    price: number
    image?: string
}

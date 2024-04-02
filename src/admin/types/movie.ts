export interface Movie {
    _id: string
    name: string
    image: string
    desc: string
    country: string
    age_limit: string
    duration: string
    author: string
    language: string
    actor: string
    trailer: string
    status: string
    rate: string
    categoryId: string[] | string
    prices: string[] | string
    showTimes: string[] | string
    slug: string
    destroy: boolean
    createdAt: Date
    updatedAt: Date
    fromDate: string
    toDate: string
  }
  
  export interface FormMovieAdd {
    _id: string
    name: string
    author: string
    image: string
    desc: string
    country: string
    age_limit: number
    duration: number
    language: string
    trailer: string
    status: string
    rate: number
    categoryId: string[] | string
    showTimes: string[] | string
    fromDate: string
    toDate: string
  }
  
export interface Movie {
    _id: string
    MovieName: string
    MovieAdress: string
    ScreeningRoomId: string[] | string
    slug: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface FormMovieAdd {
    MovieName: string,
    MovieAdress: string,
    ScreeningRoomId: string[] | string,
  }
  
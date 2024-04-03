import instance from './config'
export interface CommentService {
  movieId : string,
  like : number,
  userId : string,
  empty ?: boolean,
  content : string,
  parentId?: string
}
export const getCommentByMovie = async (id: string) => {
  const result = await instance.get('/comment/recursive/' + id)
  return result.data.datas
}
export const postCommentByMovie = async (data: CommentService) => {

  const result = await instance.post('/comment', data)
  return result.data.datas
}
export const replyCommentByMovie = async (data: CommentService) => {

  const result = await instance.post('/comment/reply', data)
  return result.data.datas
}

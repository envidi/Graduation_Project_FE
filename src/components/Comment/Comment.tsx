import { useContext, useState } from 'react'
import './comment.css'
import CommentList from './CommentList'
import useNode from '@/hooks/useNode'
import { countComments } from '@/utils'
import { MyObjectComment } from '@/hooks/useNode'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MovieType } from '@/Interface/movie'
import useComment from '@/hooks/useComment'
import FormComment from './FormComment'
import { ContextMain } from '@/context/Context'
import { Button } from '../ui/button'
const comments: MyObjectComment = {
  id: 1,
  _id: '1',
  content: '',
  like: 1,
  comments: [
    {
      _id: '2',
      id: 2,
      content: 'John',
      like: 1,
      comments: [
        {
          id: 3,
          content: 'Envidi',
          like: 2,
          comments: [
            {
              id: 4,
              content: 'JohnCena',
              like: 3,
              comments: []
            }
          ]
        }
      ]
    }
  ]
}
function Comment() {
  const [commentData, setCommentData] = useState(comments)
  const { userDetail } = useContext(ContextMain)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.movies.movies)
  const { slug } = useParams()
  const { _id = '' } =
    movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)
  const { data, isLoading } = useComment(_id)

  const highestCommentId = data && data._id
  const commentCount = countComments(data) == 0 ? 0 : countComments(data) - 1

  const { insertNode, editNode } = useNode()

  const handleInsertNode = (
    folderId: string | undefined = '1',
    item: string,
    like: number
  ) => {
    const finalStructure = insertNode(commentData, folderId, like, item)
    setCommentData((prev: MyObjectComment) => {
      return { ...prev, ...finalStructure }
    })
  }
  const handleEditNode = (
    folderId: string | undefined = '1',
    item: string,
    like: number
  ) => {
    const finalStructure = editNode(commentData, folderId, like, item)
    setCommentData(finalStructure)
  }

  return (
    <div className="xl:px-60 md:px-20 xs:px-20">
      <h2 className="heading-secondary text-primary-locationMovie border-b-4 border-primary-movieColor  md:text-5xl sm:text-4xl mt-20 font-semibold mb-20 w-fit">
        Comment <span className="text-primary-white">{commentCount}</span>
      </h2>
      <div className="bg-background-main flex  flex-col">
        <div className="w-full md:w-100 h-auto shadow py-2 flex flex-col space-y-2">
          {userDetail ? (
            <div
              className={
                'w-full md:w-100 h-auto shadow py-2 flex flex-col space-y-2'
              }
            >
              <FormComment movieId={_id} commentCount={commentCount} />
            </div>
          ) : (
            <Button className="text-2xl">Đăng nhập để bình luận</Button>
          )}
          {data && Object.keys(data).length > 0 ? (
            <CommentList
              movieId={_id}
              isLoading={isLoading}
              highestCommentId={highestCommentId}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              commentCount={commentCount}
              comment={data}
            />
          ) : (
            <div className="ms-24 text-2xl text-primary-movieColor">
              Không có bình luận
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment

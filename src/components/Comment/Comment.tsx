import { useState } from 'react'
import './comment.css'
import CommentList from './CommentList'
import useNode from '@/hooks/useNode'
import { countComments } from '@/utils'
import { MyObjectComment } from '@/hooks/useNode'
const comments: MyObjectComment = {
  id: 1,
  content: '',
  like: 1,
  items: [
    {
      id: 2,
      content: 'John',
      like: 1,
      items: [
        {
          id: 3,
          content: 'Envidi',
          like: 2,
          items: [
            {
              id: 4,
              content: 'JohnCena',
              like: 3,
              items: []
            }
          ]
        }
      ]
    }
  ]
}
function Comment() {
  const [commentData, setCommentData] = useState(comments)
  const commentCount = countComments(commentData) - 1
  const { insertNode, editNode } = useNode()

  const handleInsertNode = (folderId: number, item: string, like: number) => {
    const finalStructure = insertNode(commentData, folderId, like, item)
    setCommentData((prev: MyObjectComment) => {
      return { ...prev, ...finalStructure }
    })
  }
  const handleEditNode = (folderId: number, item: string, like: number) => {
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
          <CommentList
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            comment={commentData}
          />
        </div>
      </div>
    </div>
  )
}

export default Comment

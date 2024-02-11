import { useState } from 'react'
import './comment.css'
import CommentItem from './CommentList'
import useNode from '@/hooks/useNode'
import { countComments } from '@/utils'
import { MyObjectComment } from '@/hooks/useNode'
const comments: MyObjectComment = {
  id: 1,
  content: '',
  items: [
    {
      id: 2,
      content: 'John',
      items: [
        {
          id: 3,
          content: 'Envidi',
          items: [
            {
              id: 4,
              content: 'JohnCena',
              items:[]
            }
          ]
        }
      ]
    }
  ]
}
function Comment() {
  const [commentData, setCommentData] = useState(comments)
  const { insertNode } = useNode()
  const commentCount = countComments(commentData) - 1
  const handleInsertNode = (folderId: number, item: string) => {
    console.log(commentCount)
    const finalStructure = insertNode(commentData, folderId, item)
    setCommentData(finalStructure)
  }

  return (
    <div className="xl:px-60 md:px-20 xs:px-20">
      <h2 className="heading-secondary heading-collection md:text-5xl sm:text-4xl mt-20 font-semibold mb-20 w-fit">
        Comment {commentCount}
      </h2>
      <div className="bg-background-main flex  flex-col">
        <div className="w-full md:w-100 h-auto shadow py-2 flex flex-col space-y-2">
          <CommentItem
            handleInsertNode={handleInsertNode}
            comment={commentData}
          />
        </div>
      </div>
    </div>
  )
}

export default Comment

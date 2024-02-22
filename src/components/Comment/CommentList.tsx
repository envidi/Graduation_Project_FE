import FormComment from './FormComment'
import FormReply from './FormReply'
import { useState } from 'react'
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
import { MyObjectComment } from '@/hooks/useNode'
import CommentItem from './CommentItem'
interface CommentListType {
  // eslint-disable-next-line no-unused-vars
  handleInsertNode: (folderId: number, item: string, like: number) => void
  // eslint-disable-next-line no-unused-vars
  handleEditNode: (folderId: number, item: string, like: number) => void
  comment: {
    id: number
    content: string
    like: number
    items: MyObjectComment[]
  }
}

const CommentList = ({
  handleInsertNode,
  handleEditNode,
  comment
}: CommentListType) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  const [input, setInput] = useState('')
  const handleNewComment = () => {
    setShowInput(!showInput)
    setExpand(true)
  }
  const handleChange = (e: ChangeEvent): void => {
    const target = e.target
    setInput(target?.value)
  }
  const toggleReply = () => {
    setExpand(!expand)
  }
  const cancleReply = () => {
    setShowInput(false)
  }
  const addComment = (like: number) => {
    setExpand(true)
    handleInsertNode(comment.id, input, like)
    setShowInput(false)
    setInput('')
  }
  return (
    <>
      {
        // eslint-disable-next-line quotes
        <div
          className={
            comment.id === 1
              ? 'w-full md:w-100 h-auto shadow py-2 flex flex-col space-y-2'
              : 'flex flex-row items-start justify-start  w-full h-auto  space-x-2'
          }
        >
          {comment.id === 1 ? (
            <FormComment
              handleChange={handleChange}
              addComment={addComment}
              input={input}
            />
          ) : (
            <CommentItem
              comment={comment}
              handleNewComment={handleNewComment}
              handleEditNode={handleEditNode}
              toggleReply={toggleReply}
              expand={expand}
            />
          )}
        </div>
      }
      <div
        className={comment.id !== 1 ? 'sm:ms-24 xs:ms-16' : ''}
        style={{ display: expand || comment.id === 1 ? 'block' : 'none' }}
      >
        {showInput && (
          <FormReply
            comment={comment}
            cancleReply={cancleReply}
            setExpand={setExpand}
            setShowInput={setShowInput}
            handleInsertNode={handleInsertNode}
          />
        )}
        {comment?.items?.map((cmnt: MyObjectComment) => {
          return (
            <CommentList
              handleEditNode={handleEditNode}
              handleInsertNode={handleInsertNode}
              key={cmnt.id}
              comment={cmnt}
            />
          )
        })}
      </div>
    </>
  )
}

export default CommentList
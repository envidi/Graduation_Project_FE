import FormComment from './FormComment'
import FormReply from './FormReply'
import { useRef, useState } from 'react'
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
import { MyObjectComment } from '@/hooks/useNode'
import CommentItem from './CommentItem'
interface CommentListType {
  // eslint-disable-next-line no-unused-vars
  handleInsertNode: (folderId: number, item: string) => void
  comment: {
    id: number
    content: string
    items: MyObjectComment[]
  }
}

const CommentList = ({ handleInsertNode, comment }: CommentListType) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

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
  const addComment = () => {
    setExpand(true)
    handleInsertNode(comment.id, input)
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
              toggleReply={toggleReply}
              expand={expand}
            />
          )}
        </div>
      }
      <div
        className={comment.id !== 1 ? 'ms-24' : ''}
        style={{ display: expand || comment.id === 1 ? 'block' : 'none' }}
      >
        {showInput && (
          <FormReply
            handleChange={handleChange}
            handleClick={addComment}
            cancleReply={cancleReply}
            ref={inputRef}
          />
        )}
        {comment?.items?.map((cmnt: MyObjectComment) => {
          return (
            <CommentList
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

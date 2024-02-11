import { ChevronRight, ChevronDown, ThumbsUp } from 'lucide-react'
import Action from '../Action/Action'
import { MyObjectComment } from '@/hooks/useNode'
interface CommentItemType {
    comment : MyObjectComment
    handleNewComment : ()=>void
    toggleReply : ()=>void
    expand:boolean
}

function CommentItem({ comment, handleNewComment, toggleReply, expand }: CommentItemType) {
  return (
    <>
      <div className="group relative flex flex-shrink-0 self-start cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1507965613665-5fbb4cbb8399?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="h-8 w-8 md:h-20 md:w-20 xs:h-16 xs:w-16 object-fill rounded-full"
        />
      </div>

      <div className="flex items-center justify-start space-x-2 w-full">
        <div className="block w-full">
          <div className="flex justify-center items-center space-x-2 w-full">
            <div className="bg-background-secondary rounded-xl px-5 py-5 pt-4 w-full">
              <div className="font-medium">
                <a
                  href="#"
                  className="hover:underline xs:text-4xl font-semibold"
                >
                  <small>Ganendra</small>
                </a>
              </div>
              <div className="sm:text-2xl xs:text-3xl font-thin">
                {comment.content}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center sm:text-3xl  xs:text-4xl w-full my-3">
            <div className="font-semibold text-[#babbc0] gap-4 px-2 flex flex-col items-center justify-center space-x-1">
              <div className="font-semibold text-[#babbc0] gap-4 px-2 flex items-center justify-center space-x-1">
                <a href="#" className="hover:underline">
                  <small className="flex">
                    <ThumbsUp size={20} className="mb-2" />
                    <span className="flex items-center mt-1 ms-2">12</span>
                  </small>
                </a>
                <small className="self-center">.</small>
                <a className="hover:underline hover:cursor-pointer flex items-center flex-row">
                  <small className="flex items-center">
                    <Action
                      type={<div className="flex items-center">Reply</div>}
                      className="flex items-center"
                      handleClick={handleNewComment}
                    />
                  </small>
                </a>
                <small className="self-center">.</small>
                <a href="#" className="hover:underline">
                  <small>15 hour</small>
                </a>
              </div>
              {comment?.items?.length > 0 && (
                <a className="hover:underline">
                  <small
                    className="flex items-center text-primary-movieColor"
                    onClick={toggleReply}
                  >
                    {expand ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}{' '}
                    {comment.items.length} Reply
                  </small>
                </a>
              )}
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------- */}
        </div>
      </div>
    </>
  )
}

export default CommentItem

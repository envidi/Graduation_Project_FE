import { SendHorizontal } from 'lucide-react'
import { RefObject, forwardRef } from 'react'
import { Button } from '../ui/button'
import { ChangeEvent } from 'react'
interface MyComponentProps {
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  ref: RefObject<HTMLTextAreaElement>
  handleClick: () => void
  cancleReply: () => void
}
const FormReply = forwardRef<HTMLTextAreaElement, MyComponentProps>(
  ({ handleChange, handleClick, cancleReply }, ref) => {
    return (
      <div className="flex flex-row h-full  space-x-2 space-y-2 mt-1 mb-5">
        <div className="group relative flex flex-shrink-0 self-start cursor-pointer pt-2">
          <img
            src="https://images.unsplash.com/photo-1610156830615-2eb9732de349?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="h-8 w-8 md:w-20 md:h-20 xs:h-16 xs:w-16 object-fill rounded-full"
          />
        </div>
        <div className="flex items-center justify-center space-x-2 w-full">
          <div className="block w-full">
            <div className="bg-background-secondary  rounded-xl px-5 py-6 w-full">
              <div className="flex  w-full">
                <small className="hover:underline xs:text-3xl font-semibold mr-3">
                  Ganendra
                </small>
                <div className="sm:text-2xl xs:text-3xl font-thin w-full flex items-center break-all">
                  <textarea
                    className="w-full outline-none bg-transparent resize-none sm:text-3xl "
                    placeholder="Text here..."
                    onChange={handleChange}
                    ref={ref}
                    rows={2}
                  ></textarea>
                </div>
                <div
                  className="px-5 flex items-center hover:cursor-pointer hover:opacity-60"
                  onClick={handleClick}
                >
                  <SendHorizontal
                    className="text-primary-movieColor"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={cancleReply} className="bg-background-secondary px-10 rounded-lg sm:text-2xl text-primary-movieColor font-semibold max-h-none  hover:opacity-80 hover:text-red-500">
          Cancel
        </Button>
      </div>
    )
  }
)

export default FormReply

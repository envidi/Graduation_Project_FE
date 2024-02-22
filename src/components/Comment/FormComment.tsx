import { ChangeEvent } from 'react'
interface MyComponentProps {
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  // eslint-disable-next-line no-unused-vars
  addComment: (like: number) => void
  input: string | number
}

const FormComment = ({ handleChange, addComment, input }: MyComponentProps) => {
  const isValid =
    input.toString().length > 0 && !input.toString().startsWith(' ')

  return (
    <div className="group flex flex-row  mb-4 ">
      <img
        src="https://source.unsplash.com/50x50/?avatar"
        alt="Your Avatar"
        className="w-8 h-8 md:h-20 md:w-20 xs:h-16 xs:w-16 rounded-full mr-2"
      />
      <textarea
        className="bg-background-secondary w-full py-4 group-focus-within:border-primary-movieColor px-5 border text-3xl border-r-0 rounded-xl rounded-r-none focus:outline-none"
        placeholder="Add your comment..."
        style={{ resize: 'none' }}
        rows={3}
        value={input}
        onChange={handleChange}
      ></textarea>
      <div className="bg-background-secondary  group-focus-within:border-primary-movieColor border-r-[1px] border-t-[1px]  rounded-r-lg border-b-[1px] flex justify-center items-center md:w-60 xs:w-72">
        <button
          type="submit"
          onClick={() => addComment(0)}
          disabled={!isValid}
          className="ml-2 md:px-9 md:py-4 lg:px-10 lg:py-5 disabled:cursor-not-allowed disabled:opacity-40 sm:px-10 xs:py-4 xs:px-9 sm:py-5 bg-primary-movieColor text-primary-white md:text-3xl sm:text-4xl xs:text-3xl text rounded-lg font-semibold"
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default FormComment
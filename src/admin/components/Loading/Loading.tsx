
const Loading = () => {
  return (
    <div className="grid min-h-screen place-content-center">
      <div className="flex items-center gap-2 text-gray-500">
        <span className="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
        loading...
      </div>
    </div>
  )
}

export default Loading

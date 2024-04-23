import { Screeningrooms } from '@/Interface/screeningrooms';
import { getOneRooms } from '@/api/screeningrooms';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const GetDetailRoons = () => {
    const handleBack = () => {
        navigate(-1)
      }
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { id } = useParams()
  //   const { data : roomsData, isLoading, isError } = useQuery<Screeningrooms[]>({
  //   queryKey: ['ROOMS',id ],
  //   queryFn :async()=>getOneRooms(id as string)
  // })

 
  // if (isLoading  || !roomsData ) {
  //   return <div>Loading...</div>;
  // }

  // if (isError ) {
  //   return <div>Error</div>;
  // }
  return (
    <div className="flex flex-col gap-9 items-center justify-center p-8">
        <button
        onClick={handleBack}
        className="self-start mb-4 flex items-center text-lg text-gray-700 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Trở lại
      </button>
   
      </div>
  )
}

export default GetDetailRoons
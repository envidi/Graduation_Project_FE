import { useQueryClient,useMutation, useQuery } from '@tanstack/react-query';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllRooms, deleteRooms } from '@/api/screeningrooms';
// import { ROOMS } from '@/utils/constant';
import { Screeningrooms } from '@/Interface/screeningrooms';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useEffect, useState } from 'react';


type Props = {};

const TableRooms: React.FC<Props> = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  // fetch rooms by react-query
  const [roomData, setRoomData] = useState<Screeningrooms[]>([])

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     const data = await getAllRooms()
  //     console.log(data)
  //     if(data){
  //       setRoomData(data)
  //     }
  //   }
  //   fetchData()
  // }, [])
  const {data :allRoom} = useQuery({
    queryKey: ["ALLROOM"],
    queryFn: async () =>{
      try {
        const res = await getAllRooms()
        return res
        console.log("res", res);
        
      } catch (error) {
        
      }
    }
  })
  console.log("data", allRoom);
  

  // console.log(roomData)
  // delete rooms by mutation react-query
  const { mutate } = useMutation({
    mutationFn : deleteRooms, 
    
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['ROOMS']});
      toast.success('Xoa thành công');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Xoa that bai');
    },

  });
  

  // fetch cinema by react-query
  // const { data: cinemaData, isLoading: cinemaLoading, isError: cinemaError } = useQuery<Cinema>({
  //   queryKey: ['CINEMA', roomId],
  //   queryFn: () => getCinemaById(roomId),
  // });

  const handleRemoveRooms = (id: string) => {
    mutate(id);

  };

  // if (roomLoading  || !roomData ) {
  //   return <div>Loading...</div>;
  // }

  // if (roomError ) {
  //   return <div>Error</div>;
  // }

  return (
    <>
      {/* Add Room */}
      <div className="text-center mb-2 flex items-center justify-start">
        <button
          onClick={() => {
            navigate('/admin/screeningrooms/add');
          }}
          className="flex items-center justify-center border border-stroke py-2 px-4 rounded-full"
        >
          Add <FaPlusCircle size={20} className="ml-4" />
        </button>
      </div>
      {/* Room Table */}
      <div className="rounded-sm border border-stroke bg-primary px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-2 px-2 font-medium text-primary-white xl:pl-11">STT</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">NameRooms</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">NumberSeat</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Projector</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">CinemaName</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">CinemaAdress</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">TimeFrom</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">TimeDate</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Status</th>
                <th className="py-4 px-4 font-medium text-primary-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRoom?.docs?.map((rooms:any, index:any) => (
                <tr key={rooms._id}>
      
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">{index}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.name ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.NumberSeat ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.projector ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.CinemaId?.CinemaName ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.CinemaId?.CinemaAdress ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms?.ShowtimesId[0]?.timeFrom ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-primary-white">{rooms?.ShowtimesId[0]?.timeTo ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={`text-primary-white ${rooms.status ? 'text-success' : 'text-error'}`}>
                      {rooms.status ? 'Active' : 'Inactive'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          navigate(`/admin/screeningrooms/edit/${rooms._id}`);
                        }}
                        className="flex items-center justify-center text-gray-6 hover:text-gray-9"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() =>{window.confirm('bạn có muốn xóa k ?') &&handleRemoveRooms(rooms._id)}}
                        className="flex items-center justify-center text-gray-6 hover:text-gray-9"
                      >
                        <FaRegTrashCan size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableRooms;
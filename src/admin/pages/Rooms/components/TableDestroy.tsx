import { useQueryClient,useMutation, useQuery } from '@tanstack/react-query';
import {  FaTrashAlt, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  getAllRoomsDestroy, HarddeleteRooms, undoSoftDeleteRooms } from '@/api/screeningrooms';
import { Screeningrooms } from '@/Interface/screeningrooms';






type Props = {};

const TableRoomsDestroy: React.FC<Props> = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery<Screeningrooms[]>({
    queryKey: ['ROOMS'],
    queryFn:()=> getAllRoomsDestroy()
    
  })


  

    
  const undoSoftDeleteMutation = useMutation( {
    mutationFn : undoSoftDeleteRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['ROOMS']});
      toast.success('Khôi phục thành công');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Khôi phục thất bại');
    },
  });
  const hardDeleteMutation = useMutation( {
    mutationFn :HarddeleteRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['ROOMS']});
      toast.success('Xóa cứng thành công');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Xóa cứng thất bại');
    },
  });
  
  const handleRemoveRooms = (id: string,destroy:boolean ) => {

    if (destroy) {
      // Nếu đã bị xóa mềm, hiển thị nút khôi phục
      undoSoftDeleteMutation.mutate(id);
    //   navigate()
    } else {
      // Nếu chưa bị xóa mềm, hiển thị nút xóa
    hardDeleteMutation.mutate(id);
    }
  };

  if (isLoading  || !data ) {
    return <div>Loading...</div>;
  }

  if (isError ) {
    return <div>Error</div>;
  }

  return (
    <>
    
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
              </tr>
            </thead>
            <tbody>
              {data?.map((rooms, index) => (
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
  <div className="flex items-center space-x-2">
    
 
    <button
      onClick={() => {
        if (window.confirm('Bạn có muốn khôi phục không?')) {
          handleRemoveRooms(rooms._id as string, true);
        }
      }}
      className="flex items-center justify-center text-gray-6 hover:text-gray-9"
    >
       <FaUndo size={16} />
    </button>
    <button
      onClick={() => {
        if (window.confirm('Bạn có muốn xóa cứng không?')) {
          handleRemoveRooms(rooms._id  as string, false);
        }
      }}
      className="flex items-center justify-center text-gray-6 hover:text-gray-9"
    >
      <FaTrashAlt size={16} />
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

export default TableRoomsDestroy;
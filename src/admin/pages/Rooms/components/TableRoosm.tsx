import { useQueryClient,useMutation, useQuery } from '@tanstack/react-query';
import { FaEdit, FaPlusCircle, FaTrashRestoreAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllRooms,  SoftDeleteRooms } from '@/api/screeningrooms';
import { Screeningrooms } from '@/Interface/screeningrooms';

type Props = {};

const TableRooms: React.FC<Props> = () => {
  const navigate = useNavigate();
  
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery<Screeningrooms[]>({
    queryKey: ['ROOMS'],
    queryFn:()=> getAllRooms()
    
  })

  
  // delete rooms by mutation react-query
  const { mutate } = useMutation({
    mutationFn : SoftDeleteRooms, 
    
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['ROOMS']});
      toast.success('Xóa mềm thành công');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Xóa mềm thất bại');
    },

  });
    
  if (isLoading  || !data ) {
    return <div>Loading...</div>;
  }

  if (isError ) {
    return <div>Error</div>;
  }

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
          Thêm <FaPlusCircle size={20} className="ml-4" />
        </button>
      </div>
      {/* Room Table */}
      <div className="rounded-sm border border-stroke bg-primary px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-2 px-2 font-medium text-primary-white xl:pl-11">STT</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Tên Phòng Chiếu</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Số Ghế</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Máy chiếu</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Tên rạp</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Địa Chỉ rạp</th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-primary-white">Trạng thái</th>
                <th className="py-4 px-4 font-medium text-primary-white">Actions</th>
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
                    <p className="text-primary-white">{rooms.CinemaId?.CinemaName ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.CinemaId?.CinemaAdress ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={`text-primary-white ${rooms.status ? 'text-success' : 'text-error'}`}>
                      {rooms.status ?? '' }
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
      onClick={() => {
        if (window.confirm('Bạn có muốn xóa không?')) {
          mutate(rooms._id as string);
        }
      }}
      className="flex items-center justify-center text-gray-6 hover:text-gray-9"
    >
        <FaTrashRestoreAlt size={16} />
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
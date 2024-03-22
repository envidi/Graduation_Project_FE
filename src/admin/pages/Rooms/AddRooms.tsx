// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { newRooms } from '@/api/screeningrooms';
// import { AddandEditRooms, Screeningrooms } from '@/Interface/screeningrooms';

// const Add = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { mutate } = useMutation({
//     mutationFn: (rooms:AddandEditRooms)=>newRooms(rooms),
//     onSuccess:()=>{
//         queryClient.invalidateQueries({
//             queryKey:["ROOMS"]
//         })
//         alert('thêm thành công');
//         navigate('/')
//     }
//   } 
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AddandEditRooms>();

//   const onSubmit: SubmitHandler<AddandEditRooms> = (data) => {
//     mutate(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="form-group">
//         <div className="form-label">Tên</div>
//         <input type="text" className="form-control" {...register('name', { required: 'Vui lòng nhập tên' })} />
//       </div>
//       <div className="form-group">
//         <div className="form-label">Mô tả</div>
//         <input type="text" className="form-control" {...register('projector')} />
//       </div>
//       <div className="form-group">
//         <div className="form-label">Tên rạp</div>
//         <input type="text" className="form-control" {...register('CinemaId.CinemaName')} />
//       </div>
//       <div className="form-group">
//         <div className="form-label">Địa chỉ rạp</div>
//         <input type="text" className="form-control" {...register('CinemaId.CinemaAdress')} />
//       </div>
//       <div className="form-group">
//         <div className="form-label">Thời gian bắt đầu</div>
//         <input type="text" className="form-control" {...register('ShowtimesId.timeFrom')} />
//       </div>
//       <div className="form-group">
//         <div className="form-label">Thời gian kết thúc</div>
//         <input type="text" className="form-control" {...register('ShowtimesId.timeTo')} />
//       </div>
//       <button type="submit" className="btn btn-primary mt-2">
//         Thêm
//       </button>
//     </form>
//   );
// };

// export default Add;

import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormRooms from './components/FormRoom'


const AddRooms = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="AddRooms" />

      <div className="flex flex-col gap-10">
        <FormRooms typeForm="ADD" />
      </div>
    </DefaultLayout>
  )

  }
export default AddRooms

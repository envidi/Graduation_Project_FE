import { AddandEditRooms, Screeningrooms } from '@/Interface/screeningrooms';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Cinema from '@/Interface/cinema';
// import Showtimes from '@/Interface/Showtimes';
import { getAllCinema } from '@/api/cinema';
// import { getAllShowTimes } from '@/api/showtimes';
import { editRooms, getOneRooms, newRooms } from '@/api/screeningrooms';
import { ROOMS } from '@/utils/constant';
import { Button } from '@/components/ui/button';

type FormCURDProps = {
  typeForm: 'ADD' | 'EDIT';
};

const FormRooms = ({ typeForm }: FormCURDProps) => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const queryClient = useQueryClient();

  const { data: RoomsData, isLoading } = useQuery<Screeningrooms>({
    queryKey: ['ROOMS', _id],
    enabled: typeForm === 'EDIT' && !!_id,
    queryFn: () => getOneRooms(_id as string)
  });

  const { data: cinemaData } = useQuery<Cinema[]>({
    queryKey: ['CINEMAS'],
    queryFn: () => getAllCinema(),
    
  });

  // const { data: showtimesData } = useQuery<Showtimes[]>({
  //   queryKey: ['SHOWTIMES'],
  //   queryFn: () => getAllShowTimes(),
  // });

  const { register, handleSubmit, setValue } = useForm<AddandEditRooms>();
  const { mutate } = useMutation({
    mutationFn: async (RoomsData: AddandEditRooms) => {
      if (typeForm === 'EDIT') return editRooms(RoomsData, _id as string)
      return newRooms(RoomsData)
      
    },
    
    // newRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ROOMS],
      });
      alert('Thêm thành công');
      
    },
    onError:(err)=>{
      console.log(err)
    }
  });
  
  const [selectedCinemaAddress, setSelectedCinemaAddress] = useState('');

  const onSubmit = async (data: AddandEditRooms) => {
    if (typeForm === 'ADD') {
      mutate(data);
      navigate('/admin/screeningrooms')
      console.log(data)
    } else if (typeForm === 'EDIT') {
      mutate(data)
      alert("Chỉnh sửa thành công ");
      console.log(data)
      navigate('/admin/screeningrooms')
    }
  };

  useEffect(() => {
    if (RoomsData) {
      setValue('name', RoomsData.name);
      setValue('projector', RoomsData.projector);
      setValue('CinemaId', RoomsData.CinemaId._id);
      
    }
  }, [RoomsData, setValue]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="form-label">Name</div>
          <input type="text" className="form-control" {...register('name')} value={RoomsData?.name} />
        </div>
        <div className="form-group">
          <div className="form-label">Projector</div>
          <input type="text" className="form-control" {...register('projector')} value={RoomsData?.projector} />
        </div>
        <div className="form-group">
          <div className="form-label">Cinema Name</div>
          <select
            className="form-control"
            {...register('CinemaId')} 
            onChange={(e) => {
              const selectedCinema = cinemaData.find(cinema => cinema._id === e.target.value);
              if (selectedCinema) {
                setSelectedCinemaAddress(selectedCinema.CinemaAdress);
                setValue('CinemaAdress', selectedCinema.CinemaAdress);
              }
            }}
          >
            {cinemaData &&
              cinemaData.map((cinema) => (
                <option key={cinema._id} value={cinema._id}>
                  {cinema.CinemaName}
                </option>
              ))} 
          </select>
        </div>
        <div className="form-group">
          <div className="form-label">Cinema Address</div>
          <input
            type="text"
            className="form-control"
            value={selectedCinemaAddress}
            readOnly
          />
        </div>
        <Button type="submit" className="btn btn-primary mt-2">
          {typeForm === 'ADD' ? 'Add' : 'Update'}
        </Button>
      </form>
    </div>
  );
};

export default FormRooms;
import { useParams } from 'react-router-dom';
import EditRoomForm from './EditRoomForm';
import { useGetHotelRoomByRoomIdQuery, useGetRoomClassesQuery, useGetRoomViewsQuery } from '../../../services/rooms';

const EditRoomContainer = () => {

    const { roomId } = useParams();

  const { data: room, isLoading, isError } = useGetHotelRoomByRoomIdQuery({ roomId: roomId! }, { refetchOnMountOrArgChange: !!roomId })


  const { data: roomClassesData } = useGetRoomClassesQuery();
  const { data: roomViewsData } = useGetRoomViewsQuery();


  const roomClassesOptions = roomClassesData?.map((roomClass) => ({
    value: roomClass.id,
    label: roomClass.name,
  })) || [];


  const roomViewsOptions = roomViewsData?.map((roomView) => ({
    value: roomView.id,
    label: roomView.name
  })) || [];

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading room</div>
  return <EditRoomForm room={room} roomClassesOptions={roomClassesOptions} roomViewsOptions={roomViewsOptions} />;  

};

export default EditRoomContainer;
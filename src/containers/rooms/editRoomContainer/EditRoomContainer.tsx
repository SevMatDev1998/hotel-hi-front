import { useParams } from 'react-router-dom';
import EditRoomForm from './EditRoomForm';
import { useGetHotelRoomByRoomIdQuery, useGetRoomClassesQuery, useGetRoomViewsQuery } from '../../../services/rooms';

const EditRoomContainer = () => {

  const { roomId } = useParams();
  const { data: roomClassesData, isLoading: isRoomClassesLoading } = useGetRoomClassesQuery();
  const { data: roomViewsData, isLoading: isRoomViewsLoading } = useGetRoomViewsQuery();



  const { data: room, isLoading, isError } = useGetHotelRoomByRoomIdQuery({ roomId: roomId! }, { refetchOnMountOrArgChange: !!roomId })



  const roomClassesOptions = roomClassesData?.map((roomClass) => ({
    value: roomClass.id,
    label: roomClass.name,
  })) || [];


  const roomViewsOptions = roomViewsData?.map((roomView) => ({
    value: roomView.id,
    label: roomView.name
  })) || [];

  if (isLoading || isRoomClassesLoading || isRoomViewsLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading room</div>
  return <EditRoomForm room={room} roomClassesOptions={roomClassesOptions} roomViewsOptions={roomViewsOptions} roomClassesData={roomClassesData} />;  

};

export default EditRoomContainer;
import { FC } from 'react';
import CardContainer from '../../../../public/CardContainer';
import AddRoomPricePolicyFood from './AddRoomPricePolicyFood';
import useAppSelector from '../../../../../hooks/useAppSelector';
import { HotelAgeAssignment, HotelFood, HotelRoom } from '../../../../../types';
import AddRoomPricePolicyRoom from './AddRoomPricePolicyRoom';

interface IAddRoomPricePolicyFormProps {
  room: HotelRoom
    hotelFoods?: HotelFood[],
    hotelAvailabilityAgeAssessments?: HotelAgeAssignment[]
}

const AddRoomPricePolicyForm: FC<IAddRoomPricePolicyFormProps> = ({ room, hotelFoods, hotelAvailabilityAgeAssessments }) => {

  const {user} = useAppSelector(state => state.auth);

  // state
  // send request

  return (

    <div>
      <CardContainer className=''>
      <h3 className="text-lg font-medium mb-2">Room: {room.id}</h3>
        <AddRoomPricePolicyFood hotelId={user?.hotelId} hotelFoods={hotelFoods} hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments} />
        <AddRoomPricePolicyRoom room={room} />
      </CardContainer>

    </div>
  );
};

export default AddRoomPricePolicyForm;
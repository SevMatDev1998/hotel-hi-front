import { FC } from 'react';
import CardContainer from '../../../../public/CardContainer';
import AddRoomPricePolicyFood from './AddRoomPricePolicyFood';
import useAppSelector from '../../../../../hooks/useAppSelector';

interface IAddRoomPricePolicyFormProps {
  roomId: string
}

const AddRoomPricePolicyForm: FC<IAddRoomPricePolicyFormProps> = ({ roomId }) => {

  const {user} = useAppSelector(state => state.auth);

  // state
  // send request

  return (

    <div>
      <CardContainer className=''>
      <h3 className="text-lg font-medium mb-2">Room: {roomId}</h3>
        <AddRoomPricePolicyFood hotelId={user?.hotelId} />

      </CardContainer>

    </div>
  );
};

export default AddRoomPricePolicyForm;
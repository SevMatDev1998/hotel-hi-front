import { FC } from 'react';
import CardContainer from '../../../../public/CardContainer';

interface IAddRoomPricePolicyFormProps {
  roomId: string
}

const AddRoomPricePolicyForm: FC<IAddRoomPricePolicyFormProps> = ({ roomId }) => {

  return (
    <div>
      <CardContainer className=''>
      <h3 className="text-lg font-medium mb-2">Room: {roomId}</h3>

      </CardContainer>

    </div>
  );
};

export default AddRoomPricePolicyForm;
import useAppSelector from '../../../hooks/useAppSelector';
import AddPricePolicy from './AddPricePolicy';
import AddRoomPricePolicy from './addRoomPricePolicy/AddRoomPricePolicy';

const AddPricePolicyContainer = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div className='flex flex-col gap-6'>
     <AddPricePolicy hotelId = {user?.hotelId}/>
     <AddRoomPricePolicy hotelId = {user?.hotelId}/>
    </div>
  );
};

export default AddPricePolicyContainer;
import { FC, useState } from 'react';
import CardContainer from '../../../../public/CardContainer';
import AddRoomPricePolicyFoodForm from './AddRoomPricePolicyFoodForm';
import AddRoomPricePolicyRoomForm from './AddRoomPricePolicyRoom';
import useAppSelector from '../../../../../hooks/useAppSelector';
import { HotelAgeAssignment, HotelFood, HotelRoom } from '../../../../../types';
import AddRoomPricePolicyArrivalDepartureForm from './AddRoomPricePolicyArrivalDepartureForm';
import AddRoomPricePolicyAdditionalServicesForm from './AddRoomPricePolicyAdditionalServicesForm';

interface IAddRoomPricePolicyFormProps {
  room: HotelRoom;
  hotelFoods?: HotelFood[];
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[];
}

const AddRoomPricePolicyForm: FC<IAddRoomPricePolicyFormProps> = ({
  room,
  hotelFoods,
  hotelAvailabilityAgeAssessments,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  // ---------- ОБЩИЙ СТЕЙТ ----------
  const [foodPrices, setFoodPrices] = useState([]);
  const [roomPrice, setRoomPrice] = useState(null);
  const [arrivalPolicies, setArrivalPolicies] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);

  // ---------- ОДИН САБМИТ ----------
  const handleSubmitAll = () => {
    const payload = {
      hotelAvailabilityId: user?.hotelId, // или room.availabilityId если нужно
      foodPrices,
      roomPrice,
      arrivalPolicies,
      additionalServices,
    };

    console.log("FINAL DATA TO SEND:", payload);

    // тут делаешь 1 запрос
    // await fetch("/api/price-policy", { method: "POST", body: JSON.stringify(payload) })
  };

  return (
    <div>
      <CardContainer className='flex flex-col gap-4 mb-6'>
        <h3 className="text-lg font-medium mb-2">Room: {room.id}</h3>

        <AddRoomPricePolicyFoodForm
          hotelAvailabilityId={user?.hotelId}
          hotelFoods={hotelFoods}
          hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
          onChange={setFoodPrices}
        />

        <AddRoomPricePolicyRoomForm
          room={room}
          onChange={setRoomPrice}
        />

        <AddRoomPricePolicyArrivalDepartureForm
          onChange={setArrivalPolicies}
        />
        <AddRoomPricePolicyAdditionalServicesForm
          onChange={setAdditionalServices}
        />


        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmitAll}
        >
          Сохранить всё
        </button>
      </CardContainer>
    </div>
  );
};

export default AddRoomPricePolicyForm;

import { FC, useState, useEffect } from 'react';
import CardContainer from '../../../../public/CardContainer';
import AddRoomPricePolicyFoodForm from './AddRoomPricePolicyFoodForm';
import AddRoomPricePolicyRoomForm from './AddRoomPricePolicyRoom';
import useAppSelector from '../../../../../hooks/useAppSelector';
import { HotelAgeAssignment, HotelFood, HotelRoom } from '../../../../../types';
import AddRoomPricePolicyArrivalDepartureForm from './AddRoomPricePolicyArrivalDepartureForm';
import AddRoomPricePolicyAdditionalServicesForm from './AddRoomPricePolicyAdditionalServicesForm';
import { 
  CreateHotelFoodPriceDto, 
  CreateHotelRoomPriceDto, 
  CreateHotelAdditionalServiceDto,
  CreateOtherServiceDto,
  CreateRoomPricePolicyDto 
} from '../../../../../types/pricePolicyDto';
import { 
  useCreateRoomPricePolicyMutation,
  useGetRoomPricePolicyQuery 
} from '../../../../../services/pricePolicy/pricePolicy.service';
import appToast from '../../../../../helpers/appToast';

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
  const hotelAvailabilityId = Number(user?.hotelId) || 0;
  const hotelRoomId = Number(room.id);

  const [createRoomPricePolicy, { isLoading }] = useCreateRoomPricePolicyMutation();
  
  const { data: existingData } = useGetRoomPricePolicyQuery(
    { hotelAvailabilityId, roomId: hotelRoomId },
    { skip: !hotelAvailabilityId || !hotelRoomId }
  );

  // ---------- ОБЩИЙ СТЕЙТ ----------
  const [foodPrices, setFoodPrices] = useState<CreateHotelFoodPriceDto[]>([]);
  const [roomPrice, setRoomPrice] = useState<Omit<CreateHotelRoomPriceDto, 'hotelAvailabilityId'> | null>(null);
  const [arrivalDeparturePolicies, setArrivalDeparturePolicies] = useState<Omit<CreateHotelAdditionalServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[]>([]);
  const [otherServices, setOtherServices] = useState<Omit<CreateOtherServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[]>([]);

  useEffect(() => {
    
    if (existingData?.data) {
      const data = existingData.data;
      
      if (data.foodPrices?.length > 0) {
        setFoodPrices(data.foodPrices);
      }
      
      if (data.roomPrice) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, createdAt, updatedAt, hotelAvailabilityId, ...roomPriceData } = data.roomPrice;
        setRoomPrice(roomPriceData);
      }
      
      if (data.arrivalDepartureServices?.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const services = data.arrivalDepartureServices.map(({ id, createdAt, updatedAt, hotelAvailabilityId, hotelRoomId, ...rest }) => rest);
        setArrivalDeparturePolicies(services);
      }
      
      if (data.otherServices?.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const services = data.otherServices.map(({ id, createdAt, updatedAt, hotelAvailabilityId, hotelRoomId, ...rest }) => rest);
        setOtherServices(services);
      }
    }
  }, [existingData]);

  // ---------- ОДИН САБМИТ ----------
  const handleSubmitAll = async () => {
    try {
      const arrivalDepartureServices: CreateHotelAdditionalServiceDto[] = arrivalDeparturePolicies.map(service => ({
        ...service,
        hotelAvailabilityId,
        hotelRoomId,
      }));

      const additionalServices: CreateOtherServiceDto[] = otherServices.map(service => ({
        ...service,
        hotelAvailabilityId,
        hotelRoomId,
      }));

      const roomPriceDto: CreateHotelRoomPriceDto | null = roomPrice ? {
        ...roomPrice,
        hotelAvailabilityId,
      } : null;

      if (!roomPriceDto) {
        await appToast('error', 'Пожалуйста, введите цену на комнату');
        return;
      }

      const payload: CreateRoomPricePolicyDto = {
        hotelAvailabilityId,
        foodPrices,
        roomPrice: roomPriceDto,
        arrivalDepartureServices,
        otherServices: additionalServices,
      };

      console.log("FINAL DATA TO SEND:", payload);

      await createRoomPricePolicy(payload).unwrap();
      
      await appToast('success', 'Ценовая политика успешно сохранена!');
      
    } catch (error: any) {
      console.error('Error creating price policy:', error);
      await appToast('error', error?.data?.message || 'Ошибка при сохранении ценовой политики');
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-4 mb-6'>
        <AddRoomPricePolicyFoodForm
          hotelAvailabilityId={hotelAvailabilityId}
          hotelFoods={hotelFoods}
          hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
          onChange={setFoodPrices}
          initialData={existingData?.data?.foodPrices}
        />

        <AddRoomPricePolicyRoomForm
          room={room}
          hotelAvailabilityId={hotelAvailabilityId}
          onChange={setRoomPrice}
          initialData={existingData?.data?.roomPrice ? {
            hotelRoomId: existingData.data.roomPrice.hotelRoomId,
            price: Number(existingData.data.roomPrice.price)
          } : undefined}
        />

        <AddRoomPricePolicyArrivalDepartureForm
          hotelAvailabilityId={hotelAvailabilityId}
          hotelRoomId={hotelRoomId}
          onChange={setArrivalDeparturePolicies}
          initialData={existingData?.data?.arrivalDepartureServices}
        />
        
        <AddRoomPricePolicyAdditionalServicesForm
          onChange={setOtherServices}
          initialData={existingData?.data?.otherServices}
        />


        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleSubmitAll}
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить всё'}
        </button>
      </div>
    </div>
  );
};

export default AddRoomPricePolicyForm;

import { FC, useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../../../components/shared/Button';
import appToast from '../../../../../helpers/appToast';
import AddRoomPricePolicyAdditionalServicesForm from './AddRoomPricePolicyAdditionalServicesForm';
import AddRoomPricePolicyAgeAssignmentForm from './AddRoomPricePolicyAgeAssignmentForm';
// import AddRoomPricePolicyArrivalDepartureForm from './AddRoomPricePolicyArrivalDepartureForm';
import AddRoomPricePolicyFoodForm from './AddRoomPricePolicyFoodForm';
import AddRoomPricePolicyRoomForm from './AddRoomPricePolicyRoom';
import { useTranslation } from '../../../../../hooks/useTranslation';
import {
  useCreateRoomPricePolicyMutation,
  useGetRoomPricePolicyQuery
} from '../../../../../services/pricePolicy/pricePolicy.service';
import { HotelAgeAssignment, HotelFood, HotelRoom } from '../../../../../types';
import {
  CreateHotelAdditionalServiceDto,
  CreateHotelAgeAssignmentPriceDto,
  CreateHotelFoodPriceDto,
  CreateHotelRoomPriceDto,
  CreateOtherServiceDto,
  CreateRoomPricePolicyDto
} from '../../../../../types/pricePolicyDto';

interface IAddRoomPricePolicyFormProps {
  room: HotelRoom;
  hotelFoods?: HotelFood[];
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[];
  setIsOpen: (isOpen: boolean) => void;
}

const AddRoomPricePolicyForm: FC<IAddRoomPricePolicyFormProps> = ({
  room,
  hotelFoods,
  hotelAvailabilityAgeAssessments,
  setIsOpen
}) => {
  const { hotelAvailabilityId } = useParams<{ hotelAvailabilityId: string }>();

  const hotelRoomId = Number(room.id);
  const availabilityId = Number(hotelAvailabilityId);
  const { t } = useTranslation();
  const [createRoomPricePolicy, { isLoading }] = useCreateRoomPricePolicyMutation();

  const { data: existingData } = useGetRoomPricePolicyQuery(
    { hotelAvailabilityId: availabilityId, roomId: hotelRoomId },
    { skip: !availabilityId || !hotelRoomId }
  );

  const [foodPrices, setFoodPrices] = useState<CreateHotelFoodPriceDto[]>([]);
  const [roomPrices, setRoomPrices] = useState<Omit<CreateHotelRoomPriceDto, 'hotelAvailabilityId'>[]>([]);
  const [ageAssignmentPrices, setAgeAssignmentPrices] = useState<CreateHotelAgeAssignmentPriceDto[]>([]);
  const [arrivalDeparturePolicies, setArrivalDeparturePolicies] = useState<Omit<CreateHotelAdditionalServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[]>([]);
  const [otherServices, setOtherServices] = useState<Omit<CreateOtherServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[]>([]);

  useEffect(() => {

    if (existingData?.data) {
      const data = existingData.data;

      if (data.foodPrices?.length > 0) {
        setFoodPrices(data.foodPrices);
      }

      if (data.roomPrices && data.roomPrices.length > 0) {
        const roomPricesData = data.roomPrices.map(({ id, createdAt, updatedAt, hotelAvailabilityId, ...rest }) => rest);
        setRoomPrices(roomPricesData);
      }

      if (data.ageAssignmentPrices?.length > 0) {
        setAgeAssignmentPrices(data.ageAssignmentPrices);
      }

      if (data.arrivalDepartureServices?.length > 0) {
         
        const services = data.arrivalDepartureServices.map(({ id, createdAt, updatedAt, hotelAvailabilityId, hotelRoomId, ...rest }) => rest);
        setArrivalDeparturePolicies(services);
      }

      if (data.otherServices?.length > 0) {
         
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
        hotelAvailabilityId: availabilityId,
        hotelRoomId,
      }));

      const additionalServices: CreateOtherServiceDto[] = otherServices.map(service => ({
        ...service,
        hotelAvailabilityId: availabilityId,
        hotelRoomId,
      }));

      const roomPricesDto: CreateHotelRoomPriceDto[] = roomPrices.map(rp => ({
        ...rp,
        hotelAvailabilityId: availabilityId,
      }));

      const foodPricesDto: CreateHotelFoodPriceDto[] = foodPrices.map(service => ({
        ...service,
        hotelAvailabilityId: availabilityId,
        hotelRoomId,
      }));


      if (!roomPricesDto || roomPricesDto.length === 0) {
        await appToast('error', t('price_policy.please_enter_room_price'));
        return;
      }
      
      const payload: CreateRoomPricePolicyDto = {
        hotelAvailabilityId: availabilityId,
        foodPrices: foodPricesDto,
        roomPrices: roomPricesDto,
        arrivalDepartureServices,
        otherServices: additionalServices,
        hotelAgeAssignmentPrices: ageAssignmentPrices,
      };


      await createRoomPricePolicy(payload).unwrap();

      await appToast('success', t('price_policy.price_policy_saved_success'));

      setIsOpen(false);
    } catch (error: any) {
      await appToast('error', error?.data?.message || t('price_policy.error_saving_price_policy'));
    }
  };
 
  return (
    <div>
      <div className='flex flex-col gap-4 mb-6'>
        <AddRoomPricePolicyFoodForm
          hotelAvailabilityId={availabilityId}
          hotelFoods={hotelFoods}
          hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
          onChange={setFoodPrices}
          initialData={existingData?.data?.foodPrices}
        />

        <AddRoomPricePolicyRoomForm
          room={room}
          hotelAvailabilityId={availabilityId}
          onChange={setRoomPrices}
          initialData={existingData?.data?.roomPrices}
        />

        <AddRoomPricePolicyAgeAssignmentForm
          hotelRoomId={hotelRoomId}
          hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
          onChange={setAgeAssignmentPrices}
          initialData={existingData?.data?.ageAssignmentPrices}
        />

        {/* <AddRoomPricePolicyArrivalDepartureForm
          hotelAvailabilityId={hotelAvailabilityId}
          hotelRoomId={hotelRoomId}
          onChange={setArrivalDeparturePolicies}
          initialData={existingData?.data?.arrivalDepartureServices}
        /> */}

        <AddRoomPricePolicyAdditionalServicesForm
          onChange={setOtherServices}
          initialData={existingData?.data?.otherServices}
          hotelAvailabilityId={Number(hotelAvailabilityId)}
        />
        <div className='flex w-full justify-end gap-2 mt-4'>
        
          <Button variant='text' onClick={() => setIsOpen(false)}>
            {t("buttons.cancel")}
          </Button>
          <Button onClick={handleSubmitAll} isLoading={isLoading}>
            {t("buttons.save")}
          </Button>
        </div>


      </div>
    </div>
  );
};

export default AddRoomPricePolicyForm;

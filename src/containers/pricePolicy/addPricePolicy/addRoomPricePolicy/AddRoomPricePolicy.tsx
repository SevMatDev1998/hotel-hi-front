import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import BlockContainer from '../../../public/BlockContainer';
import AddRoomPricePolicyCard from './AddRoomPricePolicyCard';
import { useGetHotelFoodsByHotelIdQuery } from '../../../../services/foods';
import { useGetHotelAgeAssessmentByHotelAvailabilityIdQuery } from '../../../../services/hotelAvailability/hotelAvailability.service';
import { useGetHotelRoomsByHotelIdQuery } from '../../../../services/rooms';


interface IAddRoomPricePolicyProps {
  hotelId?: string;
  hotelAvailabilityId: string;
}

const AddRoomPricePolicy: FC<IAddRoomPricePolicyProps> = ({ hotelId, hotelAvailabilityId }) => {
  const { t } = useTranslation()

  const { data: roomsData } = useGetHotelRoomsByHotelIdQuery({ hotelId: hotelId! }, { skip: !hotelId });

  const { data: hotelFoods } = useGetHotelFoodsByHotelIdQuery({ hotelId: hotelId || '' }, { skip: !hotelId });
  const { data: hotelAvailabilityAgeAssessments } = useGetHotelAgeAssessmentByHotelAvailabilityIdQuery({ hotelAvailabilityId }, { skip: !hotelAvailabilityId });


  return (
    <BlockContainer shadow={false}>
      <h3>{t("price_policy.room_value_settings")}</h3>
      <div className='flex flex-col gap-3'>
        {
          roomsData?.map(room => (
            <div key={room.id} >
              <AddRoomPricePolicyCard
                room={room}
                hotelFoods={hotelFoods}
                hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
              />
            </div>

          ))
        }
      </div>

    </BlockContainer>
  );
};

export default AddRoomPricePolicy;
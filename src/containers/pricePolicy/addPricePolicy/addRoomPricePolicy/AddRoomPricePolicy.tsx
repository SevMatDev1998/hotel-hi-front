import { FC } from 'react';
import { useGetHotelRoomsByHotelIdQuery } from '../../../../services/rooms';
import BlockContainer from '../../../public/BlockContainer';
import { useTranslation } from 'react-i18next';
import AddRoomPricePolicyCard from './AddRoomPricePolicyCard';
import { useGetHotelFoodsByHotelIdQuery } from '../../../../services/foods';
import { useGetHotelAgeAssessmentByHotelAvailabilityIdQuery } from '../../../../services/hotelAvailability/hotelAvailability.service';


interface IAddRoomPricePolicyProps {
  hotelId?: string;
}

const AddRoomPricePolicy: FC<IAddRoomPricePolicyProps> = ({ hotelId }) => {
  const { t } = useTranslation()

  const { data: roomsData } = useGetHotelRoomsByHotelIdQuery({ hotelId: hotelId! }, { skip: !hotelId });

  const { data: hotelFoods } = useGetHotelFoodsByHotelIdQuery({ hotelId: hotelId || '' }, { skip: !hotelId });
  const { data: hotelAvailabilityAgeAssessments } = useGetHotelAgeAssessmentByHotelAvailabilityIdQuery({ hotelAvailabilityId: '7' }, { skip: !hotelId });


  

  return (
    <BlockContainer shadow={false}>
      <h3>{t("price_policy.room_value_settings")}</h3>

      {
        roomsData?.map(room => (
          <div key={room.id}>

            <AddRoomPricePolicyCard
              room={room}
              hotelFoods={hotelFoods}
              hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
            />
          </div>

        ))
      }
    </BlockContainer>
  );
};

export default AddRoomPricePolicy;
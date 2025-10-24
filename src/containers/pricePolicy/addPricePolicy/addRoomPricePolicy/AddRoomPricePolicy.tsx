import { FC } from 'react';
import { useGetHotelRoomsByHotelIdQuery } from '../../../../services/rooms';
import BlockContainer from '../../../public/BlockContainer';
import { useTranslation } from 'react-i18next';
import AddRoomPricePolicyCard from './AddRoomPricePolicyCard';


interface IAddRoomPricePolicyProps {
  hotelId?: string;
}

const AddRoomPricePolicy:FC<IAddRoomPricePolicyProps> = ({ hotelId }) => {
  const { t } = useTranslation()
  
  const { data: roomsData } = useGetHotelRoomsByHotelIdQuery({ hotelId: hotelId! },{ skip: !hotelId });

  console.log(hotelId,roomsData);
  
  return (
      <BlockContainer shadow={false}>
          <h3>{t("price_policy.room_value_settings")}</h3>

      {
        roomsData?.map(room => (
          <div key={room.id}>
            <AddRoomPricePolicyCard room={room} />

          </div>

        ))
      }
      </BlockContainer>
  );
};

export default AddRoomPricePolicy;
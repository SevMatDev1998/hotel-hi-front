import React from 'react';
import InfoBlock from '../../components/shared/InfoBlock';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/shared/Button';
import { useGetSystemServiceGroupsQuery } from '../../services/hotelService';
import HotelSericeGroups from './HotelSericeGroups';

const HotelServicesContainer = () => {
    const { t } = useTranslation();
    const {data: serviceGroups} =  useGetSystemServiceGroupsQuery();  
    console.log(serviceGroups);
    
  return (
 <div>
      <div className="flex flex-col gap-6">
        <h2>{t("rooms.rooms_types")}</h2>
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <div className="grid grid-cols-2 mobile:grid-cols-1">
          <div>
            <p>{t("rooms.type_of_rooms_in_the_hotel")}- {4}</p>
            <p>{t("rooms.total_number_of_rooms")}-{4}</p>
          </div>
          <div className="grid justify-items-end mobile:justify-items-start">
            <Button>{t("rooms.approved_hotel_number_of_rooms")} </Button>
          </div>
        </div>
        <HotelSericeGroups serviceGroups={serviceGroups} />
        {/* {
          mainFoods?.map((food, index) => {
            return <FoodContainerCard key={index} mainFood={food} hotelFood={foodData?.find(item => item.foodType === food.type)} />
          })
        } */}
      </div>
    </div>
  );
};

export default HotelServicesContainer;
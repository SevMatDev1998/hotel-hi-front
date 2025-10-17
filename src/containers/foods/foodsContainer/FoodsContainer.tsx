import { useTranslation } from 'react-i18next';
import InfoBlock from '../../../components/shared/InfoBlock';
import { Button } from '../../../components/shared/Button';
import { useGetHotelFoodsByHotelIdQuery } from '../../../services/foods';
import useAppSelector from '../../../hooks/useAppSelector';
import FoodContainerCard from './FoodContainerCard';

const FoodsContainer = () => {
  const { t } = useTranslation();
  
  const { user } = useAppSelector(state => state.auth);
  const { data: foodData } = useGetHotelFoodsByHotelIdQuery({ hotelId: user?.hotelId }, { skip: !user?.hotelId });

  const mainFoods = [{
    id: 1,
    type: 'Breakfast',
  },
  {
    id: 2,
    type: 'Lunch',
  },
  {
    id: 3,
    type: 'Supper',
  }
  ]
  console.log(foodData, 'foodData');
  

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
        {
          mainFoods?.map((food, index) => {
            return <FoodContainerCard key={index} mainFood={food} hotelFood={foodData?.find(item => item.foodType === food.type)} />
          })
        }
      </div>
    </div>
  );
};

export default FoodsContainer;
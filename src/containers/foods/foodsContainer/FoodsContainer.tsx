import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/shared/Button';
import InfoBlock from '../../../components/shared/InfoBlock';
import FoodContainerCard from './FoodContainerCard';
import useAppSelector from '../../../hooks/useAppSelector';
import { useSetNavigationAccessStepMutation } from '../../../services/auth';
import { useGetHotelFoodsByHotelIdQuery } from '../../../services/foods';
import { RouteEnum } from '../../../enums/route.enum';

const FoodsContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { data: foodData } = useGetHotelFoodsByHotelIdQuery({ hotelId: user?.hotelId }, { skip: !user?.hotelId });
  const [setNavigationAccessStep] = useSetNavigationAccessStepMutation()

  const mainFoods = [
    { id: 1, type: 'Breakfast' },
    { id: 2, type: 'Lunch', },
    { id: 3, type: 'Supper', }
  ]

  const handleSetNavigationAccessStep = () => {
    setNavigationAccessStep({ hotelId: user?.hotelId, stepNumber: 4 }).unwrap()
    navigate(RouteEnum.HOTEL_SERVICES);
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h2>{t("foods.food")}</h2>
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-2">
          <div>
            <p>{t("foods.hotel_meals")}</p>
          </div>
          <div className="grid justify-items-end mobile:justify-items-start">
            <Button onClick={handleSetNavigationAccessStep}>
              {t("foods.approved_hotel_food")}
            </Button>
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
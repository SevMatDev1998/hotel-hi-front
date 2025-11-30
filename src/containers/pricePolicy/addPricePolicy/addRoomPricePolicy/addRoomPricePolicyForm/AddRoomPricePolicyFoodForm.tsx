import React, { useEffect,useMemo, useState } from 'react';
import CheckBox from '../../../../../components/shared/CheckBox';
import CardContainer from '../../../../public/CardContainer';
import { useTranslation } from '../../../../../hooks/useTranslation';
import { HotelAgeAssignment, HotelFood } from '../../../../../types';
import { CreateHotelFoodPriceDto } from '../../../../../types/pricePolicyDto';

interface IAddRoomPricePolicyFoodProps {
  hotelFoods?: HotelFood[];
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[];
  hotelAvailabilityId: number;
  onChange: (data: CreateHotelFoodPriceDto[]) => void;
  initialData?: CreateHotelFoodPriceDto[];
}

const AddRoomPricePolicyFood: React.FC<IAddRoomPricePolicyFoodProps> = ({
  hotelFoods = [],
  hotelAvailabilityAgeAssessments = [],
  hotelAvailabilityId,
  onChange,
  initialData,
}) => {
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const { t } = useTranslation();
  // ✅ Загрузить initialData при первом рендере
  useEffect(() => {
    if (initialData && initialData.length > 0 && !isInitialized) {
      const includedFoodIds = new Set<number>();
      const pricesMap: Record<string, number> = {};
      initialData.forEach(item => {
        if (item.includedInPrice && item.hotelAgeAssignmentId === null) {
          includedFoodIds.add(item.hotelFoodId);
        } else if (!item.includedInPrice && item.hotelAgeAssignmentId) {
          const key = `${item.hotelFoodId}-${item.hotelAgeAssignmentId}`;
          pricesMap[key] = typeof item.price === 'string' ? Number(item.price) : item.price;
        }
      });
      setSelectedFoods(Array.from(includedFoodIds));
      setPrices(pricesMap);
      setIsInitialized(true);
    }
  }, [initialData, isInitialized]);

  // Фильтруем только те виды питания, которые НЕ включены в стоимость
  const visibleFoods = useMemo(
    () => hotelFoods.filter((f) => !selectedFoods.includes(f.id)),
    [hotelFoods, selectedFoods]
  );

  // Когда состояние меняется → формируем DTO и отправляем наверх
  useEffect(() => {
    const result: CreateHotelFoodPriceDto[] = [];

    // включенные в стоимость
    selectedFoods.forEach((foodId) => {
      result.push({
        hotelAvailabilityId,
        hotelFoodId: foodId,
        price: 0,
        includedInPrice: true,
      });
    });

    // не включённые → с возрастными категориями
    visibleFoods.forEach((food) => {
      hotelAvailabilityAgeAssessments.forEach((age) => {
        const key = `${food.id}-${age.id}`;
        result.push({
          hotelAvailabilityId,
          hotelFoodId: food.id,
          hotelAgeAssignmentId: age.id,
          price: prices[key] ?? 0,
          includedInPrice: false,
        });
      });
    });

    onChange(result); // ✅ отдаём вверх
  }, [selectedFoods, prices, hotelAvailabilityId, hotelAvailabilityAgeAssessments, visibleFoods, onChange]);

  const toggleFood = (foodId: number) => {
    setSelectedFoods((prev) =>
      prev.includes(foodId)
        ? prev.filter((id) => id !== foodId)
        : [...prev, foodId]
    );
  };

  const handlePriceChange = (foodId: number, ageId: number, value: string) => {
    const key = `${foodId}-${ageId}`;
    setPrices((prev) => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  return (
    <CardContainer className='rounded-md p-4'>
      <p >{t('price_policy.included_food_in_room_price')}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        {hotelFoods.map((food) => (
          <CheckBox
            key={food.id}
            options={{ id: food.id, name: t(`foods.${food.foodType}`) }}
            isChecked={selectedFoods.includes(food.id)}
            toggleValue={() => toggleFood(food.id)}
          />
        ))}
      </div>

      {visibleFoods.length > 0 && (
        <table className="min-w-full border text-center">
          <thead>
            <tr>
              <th className="border px-3 py-2">{t('price_policy.food_types')}</th>
              {hotelAvailabilityAgeAssessments.map((age) => (
                <th key={age.id} className="border px-3 py-2">
                  {age.fromAge}-{age.toAge}{t('price_policy.annual')  }
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleFoods.map((food) => (
              <tr key={food.id}>
                <td className="border px-3 py-2">{t(`foods.${food.foodType}`)}</td>
                {hotelAvailabilityAgeAssessments.map((age) => {
                  const key = `${food.id}-${age.id}`;
                  return (
                    <td key={key} className="border px-3 py-2">
                      <input
                        type="number"
                        className="w-full text-center "
                        value={prices[key] ?? ''}
                        onChange={(e) =>
                          handlePriceChange(food.id, age.id, e.target.value)
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </CardContainer>
  );
};

export default AddRoomPricePolicyFood;

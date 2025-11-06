import React, { useState, useMemo, useEffect } from 'react';
import { HotelAgeAssignment, HotelFood } from '../../../../../types';
import CardContainer from '../../../../public/CardContainer';

interface IAddRoomPricePolicyFoodProps {
  hotelFoods?: HotelFood[];
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[];
  hotelAvailabilityId: number;
  onChange: (data: CreateHotelFoodPriceDto[]) => void; // ✅ добавили
}

interface CreateHotelFoodPriceDto {
  hotelAvailabilityId: number;
  hotelAgeAssignmentId?: number;
  hotelFoodId: number;
  price: number;
  includedInPrice?: boolean;
}

const AddRoomPricePolicyFood: React.FC<IAddRoomPricePolicyFoodProps> = ({
  hotelFoods = [],
  hotelAvailabilityAgeAssessments = [],
  hotelAvailabilityId,
  onChange,
}) => {
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

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
    <CardContainer className=''>
      <h3 className="font-semibold text-lg mb-2">Выберите тип питания</h3>

      <div className="flex flex-wrap gap-4 mb-4">
        {hotelFoods.map((food) => (
          <label key={food.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedFoods.includes(food.id)}
              onChange={() => toggleFood(food.id)}
            />
            {food.foodType}
          </label>
        ))}
      </div>

      {visibleFoods.length > 0 && (
        <table className="min-w-full border text-center">
          <thead>
            <tr>
              <th className="border px-3 py-2">Тип питания</th>
              {hotelAvailabilityAgeAssessments.map((age) => (
                <th key={age.id} className="border px-3 py-2">
                  {age.fromAge}-{age.toAge}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleFoods.map((food) => (
              <tr key={food.id}>
                <td className="border px-3 py-2">{food.foodType}</td>
                {hotelAvailabilityAgeAssessments.map((age) => {
                  const key = `${food.id}-${age.id}`;
                  return (
                    <td key={key} className="border px-3 py-2">
                      <input
                        type="number"
                        className="w-20 text-center border rounded"
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

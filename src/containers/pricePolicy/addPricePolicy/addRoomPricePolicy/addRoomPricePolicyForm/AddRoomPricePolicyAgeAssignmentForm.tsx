import React, { useState, useEffect } from 'react';
import { HotelAgeAssignment } from '../../../../../types';
import { CreateHotelAgeAssignmentPriceDto } from '../../../../../types/pricePolicyDto';
import CardContainer from '../../../../public/CardContainer';
import { useTranslation } from '../../../../../hooks/useTranslation';

interface IAddRoomPricePolicyAgeAssignmentProps {
  hotelRoomId: number;
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[];
  onChange: (data: CreateHotelAgeAssignmentPriceDto[]) => void;
  initialData?: CreateHotelAgeAssignmentPriceDto[];
}

const AddRoomPricePolicyAgeAssignment: React.FC<IAddRoomPricePolicyAgeAssignmentProps> = ({
  hotelRoomId,
  hotelAvailabilityAgeAssessments = [],
  onChange,
  initialData,
}) => {
  const [prices, setPrices] = useState<Record<number, number>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData && initialData.length > 0 && !isInitialized) {
      const pricesMap: Record<number, number> = {};
      initialData.forEach(item => {
        pricesMap[item.hotelAgeAssignmentId] = typeof item.price === 'string' ? Number(item.price) : item.price;
      });
      setPrices(pricesMap);
      setIsInitialized(true);
    }
  }, [initialData, isInitialized]);

  useEffect(() => {
    const result: CreateHotelAgeAssignmentPriceDto[] = [];

    hotelAvailabilityAgeAssessments.forEach((age) => {
      if (prices[age.id] !== undefined && prices[age.id] > 0) {
        result.push({
          hotelRoomId,
          hotelAgeAssignmentId: age.id,
          price: prices[age.id],
        });
      }
    });

    onChange(result);
  }, [prices, hotelRoomId, hotelAvailabilityAgeAssessments, onChange]);

  const handlePriceChange = (ageId: number, value: string) => {
    const numValue = parseFloat(value);
    setPrices((prev) => ({
      ...prev,
      [ageId]: isNaN(numValue) ? 0 : numValue,
    }));
  };

  if (hotelAvailabilityAgeAssessments.length === 0) {
    return null;
  }

  return (
    <CardContainer className='rounded-md p-4'>
      <p className="mb-4 font-medium">{t('price_policy.age_assignment_prices')}</p>
      <table className="min-w-full border text-center">
        <thead>
          <tr>
            {hotelAvailabilityAgeAssessments.map((age) => (
              <th key={age.id} className="border px-3 py-2">
                {age.fromAge}-{age.toAge}{t('price_policy.annual')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {hotelAvailabilityAgeAssessments.map((age) => (
              <td key={age.id} className="border px-3 py-2">
                <input
                  type="number"
                  className="w-full text-center"
                  value={prices[age.id] ?? ''}
                  onChange={(e) => handlePriceChange(age.id, e.target.value)}
                  placeholder="0"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </CardContainer>
  );
};

export default AddRoomPricePolicyAgeAssignment;

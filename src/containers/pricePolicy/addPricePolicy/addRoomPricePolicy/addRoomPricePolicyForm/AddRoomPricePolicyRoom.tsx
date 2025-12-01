import React, { useEffect,useState } from 'react';
import CardContainer from '../../../../public/CardContainer';
import { useTranslation } from '../../../../../hooks/useTranslation';
import { HotelRoom } from '../../../../../types';
import { CreateHotelRoomPriceDto } from '../../../../../types/pricePolicyDto';

interface IAddRoomPricePolicyRoomProps {
  room: HotelRoom;
  hotelAvailabilityId: number;
  onChange: (data: Omit<CreateHotelRoomPriceDto, 'hotelAvailabilityId'>) => void;
  initialData?: { hotelRoomId: number; price: number };
}

const AddRoomPricePolicyRoom: React.FC<IAddRoomPricePolicyRoomProps> = ({ 
  room, 
  onChange,
  initialData
}) => {
  const [price, setPrice] = useState<string>(initialData?.price?.toString() || "");
  const { t } = useTranslation();  
  useEffect(() => {
    if (initialData?.price) {
      setPrice(initialData.price.toString());
    }
  }, [initialData]);

  const handleChange = (value: string) => {
    setPrice(value);
    
    const updatedData = {
      hotelRoomId: Number(room.id),
      price: Number(value) || 0,
    };

    onChange(updatedData);
  };

  return (
    <CardContainer className='rounded-md p-4'>
      <table className="min-w-full border text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">{t('price_policy.number_of_guests_in_room')}</th>
            <th className="border px-4 py-2">{t('price_policy.price')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{room.mainGuestQuantity}</td>
            <td className="border px-4 py-2">
              <input
                type="number"
                className="w-full"
                value={price}
                onChange={(e) => handleChange(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </CardContainer>
  );
};

export default AddRoomPricePolicyRoom;

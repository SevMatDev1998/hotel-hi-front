import React, { useState, useEffect } from 'react';
import { HotelRoom } from '../../../../../types';
import { CreateHotelRoomPriceDto } from '../../../../../types/pricePolicyDto';
import CardContainer from '../../../../public/CardContainer';

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

  // ✅ Загрузить initialData при изменении
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
    <CardContainer className=''>
      <h3 className="text-lg font-semibold mb-3">Ціна на номер</h3>

      <table className="min-w-full border text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">Кількість основних гостей</th>
            <th className="border px-4 py-2">Ціна</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{room.mainGuestQuantity}</td>
            <td className="border px-4 py-2">
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={price}
                placeholder="Введіть ціну"
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

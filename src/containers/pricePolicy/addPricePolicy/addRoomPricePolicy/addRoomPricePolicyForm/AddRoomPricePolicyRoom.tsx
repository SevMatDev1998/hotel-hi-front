import React, { useState } from 'react';
import { HotelRoom } from '../../../../../types';
import CardContainer from '../../../../public/CardContainer';

interface IAddRoomPricePolicyRoomProps {
  room: HotelRoom;
  onChange: (data: { roomId: number; price: number }) => void; // ✅ добавили
}

const AddRoomPricePolicyRoom: React.FC<IAddRoomPricePolicyRoomProps> = ({ room, onChange }) => {
  const [price, setPrice] = useState<string>("");

  const handlePriceChange = (value: string) => {
    setPrice(value);
    onChange({ roomId: room.id, price: Number(value) || 0 }); // ✅ отправляем вверх
  };

  return (
    <CardContainer className=''>
      <table className="min-w-full border text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">senyakum hyureri qanaky</th>
            <th className="border px-4 py-2">arjeqy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{room.mainGuestQuantity}</td>
            <td className="border px-4 py-2">
              <input
                type="number"
                className="w-20 text-center border rounded"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </CardContainer>
  );
};

export default AddRoomPricePolicyRoom;

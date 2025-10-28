import React from 'react';
import { HotelRoom } from '../../../../../types';
import CardContainer from '../../../../public/CardContainer';


interface IAddRoomPricePolicyRoomProps {
  room: HotelRoom;
}
const AddRoomPricePolicyRoom: React.FC<IAddRoomPricePolicyRoomProps> = ({ room }) => {

  return (
    <CardContainer className=''>
          <table className="min-w-full border text-center">
      <thead>
        <tr>
          <th className="border px-4 py-2">senyakum hyureri qanaky </th>
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
              // value={}
              // onChange={}
            />
          </td>
        </tr>
      </tbody>
    </table>
    </CardContainer>

  );
};

export default AddRoomPricePolicyRoom;
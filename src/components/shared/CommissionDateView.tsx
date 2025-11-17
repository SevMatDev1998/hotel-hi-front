import React, { FC } from 'react';
import { HotelAvailabilityDateCommission } from '../../types/hotelAvailabilityDateCommission';

interface ICommissionDateViewProps {
  dateCommissions: HotelAvailabilityDateCommission[]

}

const CommissionDateView:FC<ICommissionDateViewProps> = ({ dateCommissions }) => {
  console.log(dateCommissions);
  
  return (
    <div>
      {dateCommissions.map((dateCommission) => (
        <div key={dateCommission.id} className="">
          <div className='text-red-300'>{dateCommission.date}</div>
        </div>
      ))}
    </div>
  );
};

export default CommissionDateView;
import React from 'react';
import { SystemServiceGroup } from '../../types';

interface HotelSericeGroupsProps {
  serviceGroups?: SystemServiceGroup[];
}
const HotelSericeGroups = ({ serviceGroups }: HotelSericeGroupsProps) => {
  return (
    <div>
      {serviceGroups?.map((group: SystemServiceGroup) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
};

export default HotelSericeGroups;
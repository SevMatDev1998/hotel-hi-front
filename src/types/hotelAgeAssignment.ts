import { BedType } from './enums';

export interface HotelAgeAssignment {
  id: number;
  hotelAvailabilityId: number;
  name: string;
  fromAge: number;
  toAge?: number;
  bedType: BedType;
  isAdditional: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

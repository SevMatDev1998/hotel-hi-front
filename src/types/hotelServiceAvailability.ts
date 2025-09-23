import { ServiceTypeAvailabilityBy, HotelServiceHourlyAvailabilityType, ServicePayMethod } from './enums';

export interface HotelServiceAvailability {
  id: number;
  hotelServiceId: number;
  availabilityTypeId: ServiceTypeAvailabilityBy;
  hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType;
  payMethodId: ServicePayMethod;
  startTime?: Date;
  endTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

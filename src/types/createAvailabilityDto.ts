import { HotelServiceHourlyAvailabilityType } from './enums';

export interface CreateAvailabilityPeriodDto {
  startMonth: string;
  endMonth: string;
  hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType;
  startHour?: string | null;
  endHour?: string | null;
}

export interface CreateAvailabilityDto {
  isPaid?: boolean;
  isActive?: boolean;
  periods: CreateAvailabilityPeriodDto[];
}

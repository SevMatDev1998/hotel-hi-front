import { HotelServiceHourlyAvailabilityType } from "../../types";

export interface Period {
  startMonth: string;
  endMonth: string;
  hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType;
  startHour?: string | null;
  endHour?: string | null;
}

export interface AvailabilityGroup {
  isPaid?: boolean;
  isActive?: boolean;
  periods: Period[];
}

export interface FormValues {
  availabilities: [AvailabilityGroup, AvailabilityGroup];
}

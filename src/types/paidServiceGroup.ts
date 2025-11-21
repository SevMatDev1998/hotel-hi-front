export interface PaidServiceItem {
  hotelServiceAvailabilityId: number;
  hotelServiceId: number;
  systemServiceName: string;
  isPaid: boolean;
  startMonth: string | null;
  endMonth: string | null;
  hourlyAvailabilityType: string;
  startHour: string | null;
  endHour: string | null;
  currentPrice: {
    id: number;
    price: string;
    dateFrom: string;
    dateTo: string;
  } | null;
}

export interface PaidServiceType {
  typeId: number;
  typeName: string;
  services: PaidServiceItem[];
}

export interface PaidServiceGroup {
  groupId: number;
  groupName: string;
  types: PaidServiceType[];
}

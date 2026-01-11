export interface CreateHotelFoodPriceDto {
  hotelAvailabilityId: number;
  hotelFoodId: number;
  hotelAgeAssignmentId?: number;
  price: number;
  includedInPrice: boolean;
}

export interface CreateHotelRoomPriceDto {
  hotelRoomId: number;
  hotelAvailabilityId: number;
  guestCount: number;
  price: number;
  isActive?: boolean;
}

export interface CreateHotelAdditionalServiceDto {
  systemServiceId: number;
  hotelAvailabilityId: number;
  hotelRoomId?: number;
  isTimeLimited: boolean;
  startTime: string; // ISO DateTime string
  percentage: number;
  serviceName: string;
  price?: number;
  notConstantValue?: boolean;
}

export interface CreateOtherServiceDto {
  systemServiceId: number;
  hotelAvailabilityId: number;
  hotelRoomId?: number;
  price: number | null;
  notConstantValue: boolean;
  serviceName: string;
  isTimeLimited: boolean;
}

export interface CreateHotelAgeAssignmentPriceDto {
  hotelRoomId: number;
  hotelAgeAssignmentId: number;
  price: number;
}

export interface CreateRoomPricePolicyDto {
  hotelAvailabilityId: number;
  foodPrices: CreateHotelFoodPriceDto[];
  roomPrices: CreateHotelRoomPriceDto[];
  arrivalDepartureServices: CreateHotelAdditionalServiceDto[];
  otherServices: CreateOtherServiceDto[];
  hotelAgeAssignmentPrices: CreateHotelAgeAssignmentPriceDto[];
}

export interface GetRoomPricePolicyResponse {
  success: boolean;
  data: {
    hotelAvailabilityId: number;
    hotelRoomId: number;
    foodPrices: (CreateHotelFoodPriceDto & { id: number; createdAt: string; updatedAt: string })[];
    roomPrices: (CreateHotelRoomPriceDto & { id: number; createdAt: string; updatedAt: string })[];
    ageAssignmentPrices: (CreateHotelAgeAssignmentPriceDto & { id: number; createdAt: string; updatedAt: string })[];
    arrivalDepartureServices: (CreateHotelAdditionalServiceDto & { id: number; createdAt: string; updatedAt: string })[];
    otherServices: (CreateOtherServiceDto & { id: number; createdAt: string; updatedAt: string })[];
  };
}

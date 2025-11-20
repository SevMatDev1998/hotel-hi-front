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
  price: number;
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
  roomPrice: CreateHotelRoomPriceDto;
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
    roomPrice: (CreateHotelRoomPriceDto & { id: number; createdAt: string; updatedAt: string }) | null;
    ageAssignmentPrices: (CreateHotelAgeAssignmentPriceDto & { id: number; createdAt: string; updatedAt: string })[];
    arrivalDepartureServices: (CreateHotelAdditionalServiceDto & { id: number; createdAt: string; updatedAt: string })[];
    otherServices: (CreateOtherServiceDto & { id: number; createdAt: string; updatedAt: string })[];
  };
}

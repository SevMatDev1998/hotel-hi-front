// Export all enums
export * from './enums';

// Export core entity types explicitly to avoid conflicts
export type { 
  Country, 
  CountryWithRelations, 
  CreateCountryData, 
  UpdateCountryData 
} from './country';

export type { 
  Currency, 
  CurrencyWithRelations, 
  CreateCurrencyData, 
  UpdateCurrencyData 
} from './currency';

export type { 
  Language, 
  LanguageWithRelations, 
  CreateLanguageData, 
  UpdateLanguageData 
} from './language';

export type { 
  User, 
  UserWithRelations, 
  CreateUserData, 
  UpdateUserData,
  UserAuthData,
  UserRegistrationData,
  UserLoginResponse
} from './user';

export type { 
  UserHotel, 
  UserHotelWithRelations, 
  CreateUserHotelData, 
  UpdateUserHotelData 
} from './user-hotel';

export type { 
  Partner, 
  PartnerWithRelations, 
  CreatePartnerData, 
  UpdatePartnerData 
} from './partner';

export type { 
  Hotel,
  HotelWithRelations,
  CreateHotelData,
  UpdateHotelData,
  HotelPartner,
  HotelPartnerWithRelations,
  HotelRoom,
  HotelRoomWithRelations,
  RoomClass,
  RoomView,
  HotelRoomPart,
  HotelRoomPartWithRelations,
  RoomPart,
  HotelRoomPartBed,
  HotelRoomPartBedWithRelations,
  RoomBedType,
  RoomBedSize,
  HotelRoomNumber,
  HotelRoomPrice,
  HotelRoomPriceWithRelations,
  HotelService,
  HotelServiceWithRelations,
  SystemService,
  SystemServiceWithRelations,
  SystemServiceGroup,
  SystemServiceType,
  HotelServiceAvailability,
  HotelServicePrice,
  HotelServicePriceWithRelations,
  HotelServiceOffer,
  HotelFood,
  HotelFoodWithRelations,
  Cuisine,
  FoodOfferType,
  HotelFoodCuisine,
  HotelFoodCuisineWithRelations,
  HotelFoodOfferType,
  HotelFoodOfferTypeWithRelations,
  HotelFoodPrice,
  HotelFoodPriceWithRelations,
  HotelAvailability,
  HotelAvailabilityWithRelations,
  HotelAgeAssignment
} from './hotel';

export type { 
  Order,
  OrderWithRelations,
  CreateOrderData,
  UpdateOrderData,
  PaymentMethod,
  Invoice,
  OrderCheckinDate,
  OrderCheckinDateWithRelations,
  OrderContactPerson,
  OrderContactPersonWithRelations,
  OrderGuest,
  OrderGuestWithRelations,
  OrderHotelRoom,
  OrderHotelRoomWithRelations,
  OrderHotelService,
  OrderHotelServiceWithRelations
} from './order';

export type { 
  EmailStatus,
  EmailStatusWithRelations,
  PriceNotificationSchedule,
  PriceNotificationScheduleWithRelations,
  LocalizationResource,
  LocalizationResourceWithRelations,
  CreateEmailStatusData,
  CreatePriceNotificationScheduleData,
  CreateLocalizationResourceData,
  UpdateEmailStatusData,
  UpdatePriceNotificationScheduleData,
  UpdateLocalizationResourceData
} from './notification';

export type { 
  HotelState,
  SystemStateSetting,
  CreateHotelStateData,
  CreateSystemStateSettingData,
  UpdateHotelStateData,
  UpdateSystemStateSettingData
} from './system';

// Common types used across the application
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Common request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  userName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  defaultLanguageId: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

// Import types for re-export
import { User } from './user';

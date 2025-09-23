// Forward declarations to avoid circular imports
interface Country {
  id: number;
  name: string;
  code: string;
}

interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

interface UserHotel {
  id: number;
  userId: number;
  hotelId: number;
}
import { 
  HotelRoomStatus, 
  CompletenessStatus, 
  ServiceOffer, 
  ServiceOfferStatus,
  FoodType,
  BedType,
  ServicePayMethod,
  ServiceTypeAvailabilityBy,
  HotelServiceHourlyAvailabilityType
} from './enums';

// Base Hotel interface
export interface Hotel {
  id: number;
  name: string;
  contactPerson: string;
  phoneCode: number;
  phoneNumber: string;
  logoUrl?: string;
  websiteUrl?: string;
  countryId: number;
  state: string;
  city: string;
  registerCountryId?: number;
  registerState?: string;
  registerCity?: string;
  tinNumber: string;
  director: string;
  bankName: string;
  bankAccountNumber: string;
  bankPhoneCode: number;
  bankPhoneNumber: string;
  isActive: boolean;
  currencyId: number;
  extractUrl?: string;
  bookingIntegration: boolean;
  legalPerson?: string;
  priceSendEmail?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Hotel with relations
export interface HotelWithRelations extends Hotel {
  country: Country;
  registerCountry?: Country;
  currency: Currency;
  hotelPartners: HotelPartner[];
  userHotels: UserHotel[];
  hotelServiceOffers: HotelServiceOffer[];
  hotelRooms: HotelRoom[];
  hotelServices: HotelService[];
  hotelFoods: HotelFood[];
  orders: Order[];
  hotelAvailabilities: HotelAvailability[];
  priceNotificationSchedules: PriceNotificationSchedule[];
}

// Hotel creation data
export interface CreateHotelData {
  name: string;
  contactPerson: string;
  phoneCode: number;
  phoneNumber: string;
  logoUrl?: string;
  websiteUrl?: string;
  countryId: number;
  state: string;
  city: string;
  registerCountryId?: number;
  registerState?: string;
  registerCity?: string;
  tinNumber: string;
  director: string;
  bankName: string;
  bankAccountNumber: string;
  bankPhoneCode: number;
  bankPhoneNumber: string;
  currencyId: number;
  extractUrl?: string;
  bookingIntegration?: boolean;
  legalPerson?: string;
  priceSendEmail?: string;
}

// Hotel update data
export interface UpdateHotelData {
  name?: string;
  contactPerson?: string;
  phoneCode?: number;
  phoneNumber?: string;
  logoUrl?: string;
  websiteUrl?: string;
  countryId?: number;
  state?: string;
  city?: string;
  registerCountryId?: number;
  registerState?: string;
  registerCity?: string;
  tinNumber?: string;
  director?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankPhoneCode?: number;
  bankPhoneNumber?: string;
  isActive?: boolean;
  currencyId?: number;
  extractUrl?: string;
  bookingIntegration?: boolean;
  legalPerson?: string;
  priceSendEmail?: string;
}

// Hotel Partner
export interface HotelPartner {
  id: number;
  hotelId: number;
  partnerId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelPartnerWithRelations extends HotelPartner {
  hotel: Hotel;
  partner: Partner;
}

// Hotel Room
export interface HotelRoom {
  id: number;
  name: string;
  hotelId: number;
  roomClassId: number;
  roomViewId?: number;
  numbers: string;
  area: string;
  mainGuestQuantity: number;
  additionalGuestQuantity: number;
  status: HotelRoomStatus;
  roomNumberQuantity: number;
  completeness: CompletenessStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface HotelRoomWithRelations extends HotelRoom {
  hotel: Hotel;
  roomClass: RoomClass;
  roomView?: RoomView;
  hotelRoomParts: HotelRoomPart[];
  hotelRoomNumbers: HotelRoomNumber[];
  hotelRoomPrices: HotelRoomPrice[];
  orderHotelRooms: OrderHotelRoom[];
}

// Room Class
export interface RoomClass {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Room View
export interface RoomView {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Hotel Room Part
export interface HotelRoomPart {
  id: number;
  hotelRoomId: number;
  roomPartId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelRoomPartWithRelations extends HotelRoomPart {
  hotelRoom: HotelRoom;
  roomPart: RoomPart;
  hotelRoomPartBeds: HotelRoomPartBed[];
}

// Room Part
export interface RoomPart {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Hotel Room Part Bed
export interface HotelRoomPartBed {
  id: number;
  hotelRoomPartId: number;
  bedType: BedType;
  roomBedSizeId: number;
  roomBedTypeId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelRoomPartBedWithRelations extends HotelRoomPartBed {
  hotelRoomPart: HotelRoomPart;
  roomBedSize: RoomBedSize;
  roomBedType: RoomBedType;
}

// Room Bed Type
export interface RoomBedType {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Room Bed Size
export interface RoomBedSize {
  id: number;
  size: string;
  createdAt: Date;
  updatedAt: Date;
}

// Hotel Room Number
export interface HotelRoomNumber {
  id: number;
  hotelRoomId: number;
  roomNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

// Hotel Room Price
export interface HotelRoomPrice {
  id: number;
  hotelRoomId: number;
  hotelAvailabilityId?: number;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelRoomPriceWithRelations extends HotelRoomPrice {
  hotelRoom: HotelRoom;
  hotelAvailability?: HotelAvailability;
}

// Hotel Service
export interface HotelService {
  id: number;
  hotelId: number;
  serviceId: number;
  description?: string;
  statusId: CompletenessStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface HotelServiceWithRelations extends HotelService {
  service: SystemService;
  hotel: Hotel;
  hotelServiceAvailabilities: HotelServiceAvailability[];
  hotelServicePrices: HotelServicePrice[];
  orderHotelServices: OrderHotelService[];
}

// System Service
export interface SystemService {
  id: number;
  systemServiceGroupId: number;
  systemServiceTypeId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemServiceWithRelations extends SystemService {
  systemServiceGroup: SystemServiceGroup;
  systemServiceType: SystemServiceType;
  hotelServices: HotelService[];
}

// System Service Group
export interface SystemServiceGroup {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// System Service Type
export interface SystemServiceType {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Hotel Service Availability
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

// Hotel Service Price
export interface HotelServicePrice {
  id: number;
  hotelServiceId: number;
  hotelAvailabilityId?: number;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelServicePriceWithRelations extends HotelServicePrice {
  hotelService: HotelService;
  hotelAvailability?: HotelAvailability;
}

// Hotel Service Offer
export interface HotelServiceOffer {
  id: number;
  hotelId: number;
  serviceOfferId: ServiceOffer;
  serviceOfferStatus: ServiceOfferStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Hotel Food
export interface HotelFood {
  id: number;
  hotelId: number;
  name: string;
  description?: string;
  foodType: FoodType;
  statusId: CompletenessStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface HotelFoodWithRelations extends HotelFood {
  hotel: Hotel;
  hotelFoodCuisines: HotelFoodCuisine[];
  hotelFoodOfferTypes: HotelFoodOfferType[];
  hotelFoodPrices: HotelFoodPrice[];
}

// Cuisine
export interface Cuisine {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Food Offer Type
export interface FoodOfferType {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Hotel Food Cuisine
export interface HotelFoodCuisine {
  id: number;
  hotelFoodId: number;
  cuisineId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelFoodCuisineWithRelations extends HotelFoodCuisine {
  hotelFood: HotelFood;
  cuisine: Cuisine;
}

// Hotel Food Offer Type
export interface HotelFoodOfferType {
  id: number;
  hotelFoodId: number;
  offerTypeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelFoodOfferTypeWithRelations extends HotelFoodOfferType {
  hotelFood: HotelFood;
  offerType: FoodOfferType;
}

// Hotel Food Price
export interface HotelFoodPrice {
  id: number;
  hotelFoodId: number;
  hotelAvailabilityId?: number;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelFoodPriceWithRelations extends HotelFoodPrice {
  hotelFood: HotelFood;
  hotelAvailability?: HotelAvailability;
}

// Hotel Availability
export interface HotelAvailability {
  id: number;
  hotelId: number;
  dateFrom: Date;
  dateTo: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelAvailabilityWithRelations extends HotelAvailability {
  hotel: Hotel;
  priceNotificationSchedules: PriceNotificationSchedule[];
  hotelAgeAssignments: HotelAgeAssignment[];
  hotelRoomPrices: HotelRoomPrice[];
  hotelServicePrices: HotelServicePrice[];
  hotelFoodPrices: HotelFoodPrice[];
}

// Hotel Age Assignment
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

// Forward declarations to avoid circular imports
interface Partner {
  id: number;
  email: string;
  tin: string;
  name: string;
}

interface Order {
  id: number;
  hotelId: number;
  orderNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderHotelRoom {
  id: number;
  orderId: number;
  hotelRoomId: number;
  quantity: number;
}

interface OrderHotelService {
  id: number;
  orderId: number;
  hotelServiceId: number;
  quantity: number;
}

interface PriceNotificationSchedule {
  id: number;
  partnerId: number;
  availabilityId: number;
  hotelId: number;
  languageId: number;
}

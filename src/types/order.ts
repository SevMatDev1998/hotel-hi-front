import { OrderStatus, OrderCheckinType, OrderSource } from './enums';

// Forward declarations to avoid circular imports
interface Hotel {
  id: number;
  name: string;
}

interface Partner {
  id: number;
  name: string;
}

// Base Order interface
export interface Order {
  id: number;
  hotelId: number;
  statusId: OrderStatus;
  invoiceId?: number;
  orderNumber: string;
  paymentMethodId?: number;
  orderCheckinTypeId: OrderCheckinType;
  hotelPartnerId?: number;
  sourceId: OrderSource;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Order with relations
export interface OrderWithRelations extends Order {
  hotel: Hotel;
  hotelPartner?: Partner;
  paymentMethod?: PaymentMethod;
  invoice?: Invoice;
  orderCheckinDates: OrderCheckinDate[];
  orderHotelServices: OrderHotelService[];
  orderContactPersons: OrderContactPerson[];
  orderGuests: OrderGuest[];
  orderHotelRooms: OrderHotelRoom[];
}

// Order creation data
export interface CreateOrderData {
  hotelId: number;
  statusId: OrderStatus;
  invoiceId?: number;
  orderNumber: string;
  paymentMethodId?: number;
  orderCheckinTypeId: OrderCheckinType;
  hotelPartnerId?: number;
  sourceId: OrderSource;
}

// Order update data
export interface UpdateOrderData {
  statusId?: OrderStatus;
  invoiceId?: number;
  orderNumber?: string;
  paymentMethodId?: number;
  orderCheckinTypeId?: OrderCheckinType;
  hotelPartnerId?: number;
  sourceId?: OrderSource;
}

// Payment Method
export interface PaymentMethod {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Invoice
export interface Invoice {
  id: number;
  number: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Order Checkin Date
export interface OrderCheckinDate {
  id: number;
  orderId: number;
  checkinDate: Date;
  checkoutDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCheckinDateWithRelations extends OrderCheckinDate {
  order: Order;
}

// Order Contact Person
export interface OrderContactPerson {
  id: number;
  orderId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: number;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderContactPersonWithRelations extends OrderContactPerson {
  order: Order;
}

// Order Guest
export interface OrderGuest {
  id: number;
  orderId: number;
  firstName: string;
  lastName: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderGuestWithRelations extends OrderGuest {
  order: Order;
}

// Order Hotel Room
export interface OrderHotelRoom {
  id: number;
  orderId: number;
  hotelRoomId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderHotelRoomWithRelations extends OrderHotelRoom {
  order: Order;
  hotelRoom: HotelRoom;
}

// Order Hotel Service
export interface OrderHotelService {
  id: number;
  orderId: number;
  hotelServiceId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderHotelServiceWithRelations extends OrderHotelService {
  order: Order;
  hotelService: HotelService;
}

// Forward declarations
interface HotelRoom {
  id: number;
  name: string;
  hotelId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface HotelService {
  id: number;
  hotelId: number;
  serviceId: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

import { EmailSentStatus, PriceNotificationStatus } from './enums';

// Forward declarations to avoid circular imports
interface Partner {
  id: number;
  email: string;
  name: string;
}

interface HotelAvailability {
  id: number;
  hotelId: number;
  dateFrom: Date;
  dateTo: Date;
}

interface Hotel {
  id: number;
  name: string;
}

interface Language {
  id: number;
  name: string;
  code: string;
}

// Email Status
export interface EmailStatus {
  id: number;
  messageId: string;
  status: EmailSentStatus;
  partnerId?: number;
  availabilityId?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface EmailStatusWithRelations extends EmailStatus {
  partner?: Partner;
}

// Price Notification Schedule
export interface PriceNotificationSchedule {
  id: number;
  partnerId: number;
  availabilityId: number;
  hotelId: number;
  languageId: number;
  status: PriceNotificationStatus;
  sentDate?: Date;
  createdAt: Date;
}

export interface PriceNotificationScheduleWithRelations extends PriceNotificationSchedule {
  partner: Partner;
  hotelAvailability: HotelAvailability;
  hotel: Hotel;
  language: Language;
}

// Localization Resource
export interface LocalizationResource {
  id: number;
  key: string;
  value: string;
  languageId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalizationResourceWithRelations extends LocalizationResource {
  language: Language;
}

// Create types
export interface CreateEmailStatusData {
  messageId: string;
  status: EmailSentStatus;
  partnerId?: number;
  availabilityId?: number;
}

export interface CreatePriceNotificationScheduleData {
  partnerId: number;
  availabilityId: number;
  hotelId: number;
  languageId: number;
  status: PriceNotificationStatus;
  sentDate?: Date;
}

export interface CreateLocalizationResourceData {
  key: string;
  value: string;
  languageId: number;
}

// Update types
export interface UpdateEmailStatusData {
  messageId?: string;
  status?: EmailSentStatus;
  partnerId?: number;
  availabilityId?: number;
}

export interface UpdatePriceNotificationScheduleData {
  status?: PriceNotificationStatus;
  sentDate?: Date;
}

export interface UpdateLocalizationResourceData {
  key?: string;
  value?: string;
  languageId?: number;
}

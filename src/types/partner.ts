import { PartnerStatus, LegalEntityType } from './enums';

// Forward declarations to avoid circular imports
interface Country {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

interface HotelPartner {
  id: number;
  hotelId: number;
  partnerId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Order {
  id: number;
  hotelId: number;
  orderNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EmailStatus {
  id: number;
  messageId: string;
  partnerId?: number;
  createdAt: Date;
}

interface PriceNotificationSchedule {
  id: number;
  partnerId: number;
  availabilityId: number;
  hotelId: number;
  languageId: number;
}

// Base Partner interface
export interface Partner {
  id: number;
  email: string;
  tin: string;
  name: string;
  ltd: string;
  accountNumber: string;
  director: string;
  phone: string;
  status: PartnerStatus;
  countryId: number;
  legalEntityTypeId: LegalEntityType;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Partner with relations
export interface PartnerWithRelations extends Partner {
  country: Country;
  hotelPartners: HotelPartner[];
  orders: Order[];
  emailStatuses: EmailStatus[];
  priceNotificationSchedules: PriceNotificationSchedule[];
}

// Partner creation data
export interface CreatePartnerData {
  email: string;
  tin: string;
  name: string;
  ltd: string;
  accountNumber: string;
  director: string;
  phone: string;
  status: PartnerStatus;
  countryId: number;
  legalEntityTypeId: LegalEntityType;
  isSystem?: boolean;
}

// Partner update data
export interface UpdatePartnerData {
  email?: string;
  tin?: string;
  name?: string;
  ltd?: string;
  accountNumber?: string;
  director?: string;
  phone?: string;
  status?: PartnerStatus;
  countryId?: number;
  legalEntityTypeId?: LegalEntityType;
  isSystem?: boolean;
}

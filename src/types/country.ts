// Base Country interface
export interface Country {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

// Country with relations
export interface CountryWithRelations extends Country {
  hotels: Hotel[];
  registerHotels: Hotel[];
  partners: Partner[];
}

// Country creation data
export interface CreateCountryData {
  name: string;
  code: string;
}

// Country update data
export interface UpdateCountryData {
  name?: string;
  code?: string;
}

// Forward declarations to avoid circular imports
interface Hotel {
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

interface Partner {
  id: number;
  email: string;
  tin: string;
  name: string;
  ltd: string;
  accountNumber: string;
  director: string;
  phone: string;
  countryId: number;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

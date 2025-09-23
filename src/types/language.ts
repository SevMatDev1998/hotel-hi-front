// Base Language interface
export interface Language {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

// Language with relations
export interface LanguageWithRelations extends Language {
  localizationResources: LocalizationResource[];
  priceNotificationSchedules: PriceNotificationSchedule[];
  users: User[];
}

// Language creation data
export interface CreateLanguageData {
  name: string;
  code: string;
}

// Language update data
export interface UpdateLanguageData {
  name?: string;
  code?: string;
}

// Forward declarations
interface LocalizationResource {
  id: number;
  key: string;
  value: string;
  languageId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface PriceNotificationSchedule {
  id: number;
  partnerId: number;
  availabilityId: number;
  hotelId: number;
  languageId: number;
  sentDate?: Date;
  createdAt: Date;
}

interface User {
  id: number;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  defaultLanguageId: number;
  createdAt: Date;
  updatedAt: Date;
}

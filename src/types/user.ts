// Forward declarations to avoid circular imports
interface Language {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserHotel {
  id: number;
  userId: number;
  hotelId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Base User interface
export interface User {
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

// User with relations
export interface UserWithRelations extends User {
  defaultLanguage: Language;
  userHotels: UserHotel[];
}

// User creation data
export interface CreateUserData {
  userName?: string;
  email?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnabled?: boolean;
  defaultLanguageId: number;
}

// User update data
export interface UpdateUserData {
  userName?: string;
  email?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: Date;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  defaultLanguageId?: number;
}

// User authentication data
export interface UserAuthData {
  email: string;
  password: string;
}

// User registration data
export interface UserRegistrationData {
  userName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  defaultLanguageId: number;
}

// User login response
export interface UserLoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Forward declarations to avoid circular imports
interface User {
  id: number;
  userName?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Hotel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Base UserHotel interface
export interface UserHotel {
  id: number;
  userId: number;
  hotelId: number;
  createdAt: Date;
  updatedAt: Date;
}

// UserHotel with relations
export interface UserHotelWithRelations extends UserHotel {
  user: User;
  hotel: Hotel;
}

// UserHotel creation data
export interface CreateUserHotelData {
  userId: number;
  hotelId: number;
}

// UserHotel update data
export interface UpdateUserHotelData {
  userId?: number;
  hotelId?: number;
}

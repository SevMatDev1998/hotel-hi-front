# Types Directory

This directory contains TypeScript type definitions for all entities in the hotel management system, based on the Prisma schema.

## Structure

### Core Entity Types

- **`enums.ts`** - All enums used throughout the application
- **`user.ts`** - User-related types and authentication
- **`hotel.ts`** - Hotel, rooms, services, and food-related types
- **`partner.ts`** - Partner and hotel-partner relationship types
- **`order.ts`** - Order processing and booking types
- **`country.ts`** - Country and location types
- **`currency.ts`** - Currency types
- **`language.ts`** - Language and localization types
- **`notification.ts`** - Email and notification types
- **`system.ts`** - System settings and configuration types
- **`user-hotel.ts`** - User-hotel relationship types

## Type Conventions

### Base Interfaces
Each entity has a base interface that matches the Prisma model exactly:
```typescript
export interface Hotel {
  id: number;
  name: string;
  // ... other fields
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
```

### Relations
Extended interfaces include related entities:
```typescript
export interface HotelWithRelations extends Hotel {
  country: Country;
  currency: Currency;
  hotelRooms: HotelRoom[];
  // ... other relations
}
```

### CRUD Operations
Create and update data types for API operations:
```typescript
export interface CreateHotelData {
  name: string;
  contactPerson: string;
  // ... required fields for creation
}

export interface UpdateHotelData {
  name?: string;
  contactPerson?: string;
  // ... optional fields for updates
}
```

## Available Enums

### Order Management
- `OrderStatus` - Reserved, Pending, Approved, Arrived, Completed, Canceled
- `OrderCheckinType` - DefinitiveDates, VariableDates
- `OrderSource` - Web, InternalTools

### Hotel Management
- `HotelRoomStatus` - Active, Incomplete, Inactive, Deleted
- `CompletenessStatus` - Draft, Completed
- `ServicePayMethod` - Once, Hour, Day
- `ServiceTypeAvailabilityBy` - Shared, Room
- `ServiceOffer` - PetsAllowed, AccessGuestsNotStayingInRoom, FoodFromOutside
- `ServiceOfferStatus` - Allowed, Requested, NotAllowed

### Food & Dining
- `FoodType` - Breakfast, Lunch, Supper

### Room Management
- `BedType` - Main, Cradle, Additional
- `HotelServiceHourlyAvailabilityType` - AllDay, Hours

### Partners & Business
- `PartnerStatus` - Draft, Pending, Waiting, Approved
- `LegalEntityType` - LLC, PE, CJSC, OJSC, NGO

### Notifications
- `EmailSentStatus` - Scheduled, Delivered, NotDelivered
- `PriceNotificationStatus` - Scheduled, Sent, Failed, WaitingForPartnerConfirmation

### System
- `PhoneCodesEnum` - AM (+374), USA (+1), RUS (+7)
- `MenuItem` - Hotel, Room, Food, Service, Price, Partners, Notification

## Usage Examples

### Importing Types
```typescript
import { 
  User, 
  Hotel, 
  HotelWithRelations,
  CreateHotelData,
  OrderStatus 
} from '@/types';
```

### Using with API Responses
```typescript
import { ApiResponse, PaginatedResponse } from '@/types';

// Single entity response
const hotelResponse: ApiResponse<Hotel> = await fetchHotel(id);

// Paginated response
const hotelsResponse: PaginatedResponse<Hotel> = await fetchHotels(params);
```

### Form Data Types
```typescript
import { CreateUserData, UpdateHotelData } from '@/types';

const handleCreateUser = (userData: CreateUserData) => {
  // Handle user creation
};

const handleUpdateHotel = (hotelId: number, updates: UpdateHotelData) => {
  // Handle hotel updates
};
```

## Common API Types

The index file also exports common types used across the application:

- `ApiResponse<T>` - Standard API response wrapper
- `PaginatedResponse<T>` - Paginated data response
- `PaginationParams` - Query parameters for pagination
- `FilterParams` - Common filter parameters
- `LoginRequest/Response` - Authentication types
- `RegisterRequest` - User registration
- `RefreshTokenRequest/Response` - Token refresh

## Best Practices

1. **Use explicit imports** - Import specific types rather than using `import *`
2. **Prefer WithRelations types** - Use relation types when you need associated data
3. **Use Create/Update types** - Use specific data types for API operations
4. **Type your API responses** - Always wrap API responses with `ApiResponse<T>`
5. **Handle optional fields** - Remember that update types have optional fields

## Circular Import Prevention

To prevent circular import issues, the types use forward declarations instead of cross-imports. This allows the type system to work correctly while avoiding dependency cycles.

// Base Currency interface
export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
}

// Currency with relations
export interface CurrencyWithRelations extends Currency {
  hotels: Hotel[];
}

// Forward declaration
interface Hotel {
  id: number;
  name: string;
  currencyId: number;
  createdAt: Date;
  updatedAt: Date;
}

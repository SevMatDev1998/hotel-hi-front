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

// Currency creation data
export interface CreateCurrencyData {
  name: string;
  code: string;
  symbol: string;
}

// Currency update data
export interface UpdateCurrencyData {
  name?: string;
  code?: string;
  symbol?: string;
}

// Forward declaration
interface Hotel {
  id: number;
  name: string;
  currencyId: number;
  createdAt: Date;
  updatedAt: Date;
}

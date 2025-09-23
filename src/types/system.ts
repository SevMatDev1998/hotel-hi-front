// Hotel State
export interface HotelState {
  id: number;
  name: string;
  countryId: number;
  createdAt: Date;
  updatedAt: Date;
}

// System State Setting
export interface SystemStateSetting {
  id: number;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create types
export interface CreateHotelStateData {
  name: string;
  countryId: number;
}

export interface CreateSystemStateSettingData {
  key: string;
  value: string;
}

// Update types
export interface UpdateHotelStateData {
  name?: string;
  countryId?: number;
}

export interface UpdateSystemStateSettingData {
  key?: string;
  value?: string;
}

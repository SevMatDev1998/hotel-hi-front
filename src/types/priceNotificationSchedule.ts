import { PriceNotificationStatus } from './enums';

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

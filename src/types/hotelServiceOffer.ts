import { ServiceOffer, ServiceOfferStatus } from './enums';

export interface HotelServiceOffer {
  id: number;
  hotelId: number;
  serviceOfferId: ServiceOffer;
  serviceOfferStatus: ServiceOfferStatus;
  createdAt: Date;
  updatedAt: Date;
}

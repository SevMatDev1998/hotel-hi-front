import { LegalEntityType,PartnerStatus } from './enums';

export interface Partner {
  id: string;
  email: string;
  tin: string;
  name: string;
  ltd: string;
  accountNumber: string;
  director: string;
  phone: string;
  status: PartnerStatus;
  countryId: number;
  legalEntityTypeId: LegalEntityType;
  isPartnerCommissionAccept: boolean;
  lastNotificationSentAt?: Date | null;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

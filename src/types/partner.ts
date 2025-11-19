import { PartnerStatus, LegalEntityType } from './enums';

export interface Partner {
  id: string;
  email: string;
  tin: string;
  name: string;
  ltd: string;
  accountNumber: string;
  director: string;
  phone: number;
  status: PartnerStatus;
  countryId: number;
  legalEntityTypeId: LegalEntityType;
  isPartnerCommissionAccept: boolean;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

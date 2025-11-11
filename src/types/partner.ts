import { PartnerStatus, LegalEntityType } from './enums';

export interface Partner {
  id: number;
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
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

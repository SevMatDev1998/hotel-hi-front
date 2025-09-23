import { EmailSentStatus } from './enums';

export interface EmailStatus {
  id: number;
  messageId: string;
  status: EmailSentStatus;
  partnerId?: number;
  availabilityId?: number;
  createdAt: Date;
  updatedAt?: Date;
}

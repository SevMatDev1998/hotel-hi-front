import { User } from '../../types/user';

export interface LoginResponse {
  user: Partial<User>;
  token: string;
  refreshToken: string;
}
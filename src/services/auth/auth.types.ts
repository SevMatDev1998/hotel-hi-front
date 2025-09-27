import { User } from '../../types/user';


export interface LoginDTO {
  email: string;
  password: string;
}

export interface SignUpDTO {
  hotelName: string;
  email: string;
  password: string;
}


export interface LoginResponse {
  user: Partial<User>;
  token: string;
  refreshToken: string;
}
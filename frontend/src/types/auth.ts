export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}


export interface AuthResponse {
  token: string;
  user: User;
}

import type { AuthResponse } from '../types';

//const API_URL = 'http://localhost:5001/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data: AuthResponse = await response.json();
  
  // Save the token so the Middle Tier can verify future requests
  localStorage.setItem('token', data.token);
  return data;
};

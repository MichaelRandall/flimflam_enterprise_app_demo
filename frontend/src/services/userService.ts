import type { User } from '../types';

//const API_URL = 'http://localhost:5001/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Send the JWT in the Authorization header
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Session expired. Please login again.');
    throw new Error('Failed to fetch users from Postgres');
  }

  return response.json();
};

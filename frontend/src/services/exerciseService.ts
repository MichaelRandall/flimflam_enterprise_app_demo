import type { Exercise } from '../types';

const API_URL = 'http://localhost:5001/api'; // Use 5001 for Mac

export const getExercises = async (): Promise<Exercise[]> => {
  // 1. Get the token we saved during login
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/exercises`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 2. Attach the token in the 'Bearer' format
      'Authorization': `Bearer ${token}` 
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized: Please log in again');
    throw new Error('Failed to fetch exercises');
  }

  return response.json();
};

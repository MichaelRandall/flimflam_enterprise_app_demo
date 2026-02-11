import { useFetch } from '../hooks/useFetch';
import { getUsers } from '../services/userService';
import type { User } from '../types';

export function UsersPage() {
  const { data: users, loading, error } = useFetch<User[]>(getUsers, []);

  if (loading) return <p>Loading Users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

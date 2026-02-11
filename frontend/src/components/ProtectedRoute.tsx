import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');
  
  // If no token exists, send them to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the child routes (MainLayout/Pages)
  return <Outlet />;
}

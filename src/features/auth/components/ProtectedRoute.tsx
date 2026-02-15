import { Navigate, Outlet } from 'react-router';

// Define the roles explicitly so you don't make typos later
export type UserRole = 'Admin' | 'Manager' | 'Employee' | 'Auditor' | 'External';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // TODO: Get this from your AuthContext or Redux store
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole') as UserRole;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; // You need to create this page
  }

  return <Outlet />;
};
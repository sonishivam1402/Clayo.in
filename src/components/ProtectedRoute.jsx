// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, requiredRole }) => {
  const userData = JSON.parse(localStorage.getItem('user'));

  if (!userData || !userData.token) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (requiredRole && userData.roleId !== requiredRole) {
    // Logged in but not an admin
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoutes;

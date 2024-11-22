import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');

  // If the user's role is not allowed, redirect to '/'
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  // Render the allowed component
  return element;
};

export default ProtectedRoute;

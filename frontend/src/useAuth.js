// src/hooks/useAuth.js

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return { isAuthenticated, userRole };
};

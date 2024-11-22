import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const ProtectedRoute = ({ requiredRole }) => {
    const { role } = useAuth();

    if (!role) {
        return <Navigate to="/" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

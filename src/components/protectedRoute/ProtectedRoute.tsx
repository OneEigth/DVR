import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();

    return isAuthenticated ? element : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;

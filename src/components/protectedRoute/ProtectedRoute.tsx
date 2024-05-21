import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, component: Component }) => {
    console.log('ProtectedRoute: isAuthenticated:', isAuthenticated); // Добавим лог
    return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

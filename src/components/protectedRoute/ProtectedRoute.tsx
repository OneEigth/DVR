import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuthStore} from "../../store/auth/auth";


interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;

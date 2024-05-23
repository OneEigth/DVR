import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuthStore} from "../../store/auth/auth";

interface PublicRouteProps {
    element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/main" replace />;
    }

    return element;
};

export default PublicRoute;
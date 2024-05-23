// App.tsx
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/auth/Auth';
import Main from './pages/main/main';
import Device from './pages/device/Device';
import AllCams from './pages/allCams/AllCams';
import Settings from './pages/settings/Settings';
import 'leaflet/dist/leaflet.css';
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import PublicRoute from "./components/publicRoute/publicRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute element={<LoginPage/>}/>,
    },
    {
        path: '/main',
        element: <ProtectedRoute element={<Main />} />,
    },
    {
        path: '/device/:id',
        element: <ProtectedRoute element={<Device />} />,
    },
    {
        path: '/allcams',
        element: <ProtectedRoute element={<AllCams />} />,
    },
    {
        path: '/settings',
        element: <ProtectedRoute element={<Settings />} />,
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

function App() {

    return <RouterProvider router={router} />;
}

export default App;

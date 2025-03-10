// App.tsx
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/auth/Auth';
import Main from './pages/main/main';
import Device from './pages/device/Device';
import AllCams from './pages/allCams/AllCams';
import Settings from './pages/settings/Settings';
import 'leaflet/dist/leaflet.css';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PublicRoute from './components/publicRoute/publicRoute';
import Layouts from './pages/layouts/Layouts';
import Users from './pages/users/users';
import Reports from './pages/reports/Reports';
import Archive from './pages/archive/Archive';
import Map from './pages/map/Map';
import LayoutOne from './pages/layouts/Layout/layout';
import EditLayout from './pages/layouts/editLayout/EditLayout';
import PttDispatcher from './components/pttDispatcher/PttDispatcher';
import AdminPage from './components/pttDispatcher/adminPanelPttDispatch/AdminPage';
import LayoutsV2 from './pages/pagesV2/layouts/LayoutsV2';
import 'utils/app/styles/root.css';
import 'utils/app/styles/antd.css';
import 'utils/app/styles/Text/Text.css';
import 'utils/app/styles/Buttons/Button.css';
import 'utils/app/styles/Tags/Tag.css';

import LayoutV2 from './pages/pagesV2/layouts/pages/layout/LayoutV2';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute element={<LoginPage />} />,
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
        path: '/layouts',
        element: <ProtectedRoute element={<LayoutsV2 />} />,
    },
    {
        path: '/layout/:id',
        element: <ProtectedRoute element={<LayoutV2 />} />,
    },
    {
        path: '/editLayout/:id',
        element: <ProtectedRoute element={<EditLayout />} />,
    },
    {
        path: '/map',
        element: <ProtectedRoute element={<Map />} />,
    },
    {
        path: '/archive',
        element: <ProtectedRoute element={<Archive />} />,
    },
    {
        path: '/users',
        element: <ProtectedRoute element={<Users />} />,
    },
    {
        path: '/reports',
        element: <ProtectedRoute element={<Reports />} />,
    },
    {
        path: '/settings',
        element: <ProtectedRoute element={<Settings />} />,
    },
    {
        path: '/pttDispatch',
        element: <ProtectedRoute element={<PttDispatcher />} />,
    },
    {
        path: '/adminPtt',
        element: <ProtectedRoute element={<AdminPage />} />,
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

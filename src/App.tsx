/*
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/auth/Auth';
import Main from './pages/main/main';
import 'leaflet/dist/leaflet.css';
import { useAuthStore } from './store/auth/auth';

import Device from "./pages/device/Device";
import AllCams from "./pages/allCams/AllCams";
import Settings from "./pages/settings/Settings";


function App() {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/main" element={<Main/>} />
                            <Route path="/device/:id" element={<Device/>} />
                            <Route path="/allcams" element={<AllCams/>} />
                            <Route path="/settings" element={<Settings/>} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/" replace />} />
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
*/

// App.tsx
import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {useAuthStore} from './store/auth/auth';
import LoginPage from './pages/auth/auth/Auth';
import Main from './pages/main/main';
import Device from './pages/device/Device';
import AllCams from './pages/allCams/AllCams';
import Settings from './pages/settings/Settings';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import 'leaflet/dist/leaflet.css';
import MainMenu from "./components/menu/Menu";

function App() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
        checkAuth();
        console.log('App: isAuthenticated:', isAuthenticated);
    }, [checkAuth, isAuthenticated]);


    console.log('App: isAuthenticated2:', isAuthenticated);

    return (
        <BrowserRouter>
            <Routes>

                        <Route path="/main" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={Main}  />} />
                        <Route path="/device/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={Device} />} />
                        <Route path="/allcams" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={AllCams} />} />
                        <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated} component={Settings} />} />
                        <Route path="*" element={<Navigate to="/main" replace />} />

            </Routes>
        </BrowserRouter>
        );
    }
export default App;
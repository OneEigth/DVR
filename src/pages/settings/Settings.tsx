import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import LocationMap from "../../components/locationMap/LocationMap";
import {useSelectedDevice} from "../../store/devices/SelectedDevice";


const Settings: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('main');
    const{selectedDevice}=useSelectedDevice();

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <div className="main-container">
            <div className="menu">
                <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem} />
            </div>
            <LocationMap device={selectedDevice}/>


        </div>
    );
};

export default Settings;

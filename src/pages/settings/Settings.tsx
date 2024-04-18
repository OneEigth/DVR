import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'


const Settings: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('main');

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <div className="main-container">
            <div className="menu">
                <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem} />
            </div>


        </div>
    );
};

export default Settings;

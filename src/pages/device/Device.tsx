import React, {useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import DeviceOne from "../../components/deviceOne/DeviceOne";

const Device: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('allCams');
    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <div className="device-container">
            <div className="menu">
                <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
            </div>
            <div className="deviceOne">
                <div className="table">
                    <DeviceOne/>
                </div>
            </div>

        </div>
    );
};

export default Device;

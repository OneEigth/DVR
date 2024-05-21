import React, {useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import DeviceOne from "../../components/deviceOne/DeviceOne";
import {Col, Row} from "antd";

interface DeviceProps {
    selectedUID?: string;
}
const Device: React.FC<DeviceProps> = ({selectedUID}) => {
    const [currentMenuItem, setCurrentMenuItem] = useState('device');
    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <Row>
            <Col span={24}>
                <div className="device-container">
                    <div className="menu">
                         <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
                    </div>
                     <div className="deviceOne">
                         <DeviceOne selectedOnlineUID={selectedUID ?? ''}/>
                     </div>
                </div>
            </Col>
        </Row>
    );
};

export default Device;

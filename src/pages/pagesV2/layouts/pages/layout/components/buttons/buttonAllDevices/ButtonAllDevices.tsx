import { Button } from 'antd';
import React from 'react';
import './styleAllDevices.css'
import IconLeftMenuAllDevice from "../../../../../../../../components/icons/iconLeftMenu/IconLeftMenuAllDevice";

interface ButtonAllDevicesProps {
    onClick: () => void;
}

const ButtonAllDevices: React.FC<ButtonAllDevicesProps> = ({ onClick }) => (
    <Button className="ButtonAllDevices" onClick={onClick} icon={<IconLeftMenuAllDevice />}>Все устройства</Button>
);

export default ButtonAllDevices;
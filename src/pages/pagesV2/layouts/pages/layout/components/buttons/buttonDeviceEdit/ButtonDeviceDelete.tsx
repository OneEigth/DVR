import { Button } from 'antd';
import React from 'react';
import './styleDeviceDelete.css'
import {CloseOutlined} from  '@ant-design/icons'

interface ButtonDeviceDeleteProps {
    onClick: () => void;
}

const ButtonDeviceDelete: React.FC<ButtonDeviceDeleteProps> = ({ onClick }) => (
    <Button className="ButtonDeviceDelete" onClick={onClick}>Удалить</Button>
);

export default ButtonDeviceDelete;
import { Button } from 'antd';
import React from 'react';
import './styleDeviceToLayout.css'
import {EditOutlined} from  '@ant-design/icons'

interface ButtonDeviceAddToLayoutProps {
    onClick: () => void;
}

const ButtonDeviceAddToLayout: React.FC<ButtonDeviceAddToLayoutProps> = ({ onClick }) => (
    <Button className="ButtonDeviceAddToLayout" onClick={onClick} >Добавить в раскладку</Button>
);

export default ButtonDeviceAddToLayout;
import { Button } from 'antd';
import React from 'react';
import './styleDeviceSave.css'
import {EditOutlined} from  '@ant-design/icons'

interface ButtonDeviceSaveProps {
    onClick: () => void;
}

const ButtonDeviceSave: React.FC<ButtonDeviceSaveProps> = ({ onClick }) => (
    <Button className="ButtonDeviceSave" onClick={onClick} >Сохранить</Button>
);

export default ButtonDeviceSave;
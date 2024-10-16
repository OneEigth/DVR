import { Button } from 'antd';
import React from 'react';
import './styleLayoutDelete.css'
import {CloseOutlined} from  '@ant-design/icons'

interface ButtonLayoutDeleteProps {
    onClick: () => void;
}

const ButtonLayoutDelete: React.FC<ButtonLayoutDeleteProps> = ({ onClick }) => (
    <Button className="ButtonLayoutDelete" onClick={onClick}>Удалить</Button>
);

export default ButtonLayoutDelete;
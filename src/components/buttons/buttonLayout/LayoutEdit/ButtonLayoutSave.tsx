import { Button } from 'antd';
import React from 'react';
import './styleLayoutSave.css'


interface ButtonLayoutSaveProps {
    onClick: () => void;
}

const ButtonLayoutSave: React.FC<ButtonLayoutSaveProps> = ({ onClick }) => (
    <Button className="ButtonLayoutSave" onClick={onClick} >Сохранить</Button>
);

export default ButtonLayoutSave;
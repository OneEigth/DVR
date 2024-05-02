import { Button } from 'antd';
import React from 'react';
import './style.css'

interface ButtonAddToLayoutProps {
    onClick: () => void;
}

const ButtonAddToLayout: React.FC<ButtonAddToLayoutProps> = ({ onClick }) => (
    <Button className="buttonAddToLayout" onClick={onClick}>Добавить в раскладку</Button>
);

export default ButtonAddToLayout;
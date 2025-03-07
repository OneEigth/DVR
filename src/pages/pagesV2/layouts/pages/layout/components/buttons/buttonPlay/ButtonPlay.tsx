import { Button } from 'antd';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

interface ButtonPlayProps {
    onClick: () => void; // Определение свойства onClick
}

const ButtonPlay: React.FC<ButtonPlayProps> = ({ onClick }) => (
    <Button icon={<CaretRightOutlined />} style={{ backgroundColor: '#4D4E65', color: '#FFFFFF' }} onClick={onClick} />
);

export default ButtonPlay;

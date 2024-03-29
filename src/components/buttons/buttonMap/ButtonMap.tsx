import { Button } from 'antd';
import React from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';

interface ButtonMap {
    onClick: () => void; // Определение свойства onClick
}

const ButtonMap: React.FC<ButtonMap> = ({ onClick }) => (
    <Button icon={<EnvironmentOutlined />} style={{ backgroundColor: '#4D4E65', color: '#FFFFFF' }} onClick={onClick} />
);

export default ButtonMap;

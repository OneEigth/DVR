import { Button } from 'antd';
import React from 'react';
import './styleLayoutEdit.css'
import {EditOutlined} from  '@ant-design/icons'

interface ButtonLayoutEditProps {
    onClick: () => void;
}

const ButtonLayoutEdit: React.FC<ButtonLayoutEditProps> = ({ onClick }) => (
    <Button className="ButtonLayoutEdit" onClick={onClick} >Редактировать</Button>
);

export default ButtonLayoutEdit;
import { Button } from 'antd';
import React from 'react';
import './styleShowMap.css'
import {PictureOutlined} from '@ant-design/icons'

interface ButtonShowMapProps {
    onClick: () => void;
    isMapVisible:boolean;
}

const ButtonShowMap: React.FC<ButtonShowMapProps> = ({ onClick,isMapVisible }) => (
    <Button className="buttonShowMap" onClick={onClick} icon={<PictureOutlined className="PictureOutlined" />}> {isMapVisible ? "Скрыть карту" : "Показать карту"}</Button>
);

export default ButtonShowMap;
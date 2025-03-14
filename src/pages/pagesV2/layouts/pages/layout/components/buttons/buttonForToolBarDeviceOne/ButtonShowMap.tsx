import { Button } from 'antd';
import React from 'react';
import './styleShowMap.css';
import { PictureOutlined } from '@ant-design/icons';
import { ReactComponent as MapImg } from 'utils/app/assets/icons/Map.svg';

interface ButtonShowMapProps {
    onClick: () => void;
    isMapVisible: boolean;
}

const ButtonShowMap: React.FC<ButtonShowMapProps> = ({ onClick, isMapVisible }) => (
    <Button
        className={'body medium-bold button-base button-type-secondary button-size-medium'}
        onClick={onClick}
    >
        <MapImg style={{ position: 'relative', top: -1 }} />
        Показать карту
    </Button>
    // <Button className="buttonShowMap" onClick={onClick} icon={<PictureOutlined className="PictureOutlined" />}> {isMapVisible ? "Скрыть карту" : "Показать карту"}</Button>
);

export default ButtonShowMap;

import { Button } from 'antd';
import React from 'react';
import './styleShowMap.css'
import {PictureOutlined} from '@ant-design/icons'

interface ButtonShowMapProps {
    onClick: () => void;
}

const ButtonShowMap: React.FC<ButtonShowMapProps> = ({ onClick }) => (
    <Button className="buttonShowMap" onClick={onClick} icon={<PictureOutlined className="PictureOutlined" />}>Показать карту</Button>
);

export default ButtonShowMap;
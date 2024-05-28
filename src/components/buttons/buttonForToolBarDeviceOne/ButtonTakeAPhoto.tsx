import { Button } from 'antd';
import React from 'react';
import './styleTakeAPhoto.css'
import {PictureOutlined} from '@ant-design/icons'

interface ButtonTakeAPhotoProps {
    onClick: () => void;
}

const ButtonTakeAPhoto: React.FC<ButtonTakeAPhotoProps> = ({ onClick }) => (
    <Button className="buttonTakeAPhoto" onClick={onClick} icon={<PictureOutlined />}>Сделать фото</Button>
);

export default ButtonTakeAPhoto;
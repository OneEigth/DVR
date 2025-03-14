import { Button } from 'antd';
import React from 'react';
import './styleTakeAPhoto.css';
import { PictureOutlined } from '@ant-design/icons';
import { ReactComponent as PhotoImg } from 'utils/app/assets/icons/Photo.svg';

interface ButtonTakeAPhotoProps {
    onClick: () => void;
}

const ButtonTakeAPhoto: React.FC<ButtonTakeAPhotoProps> = ({ onClick }) => (
    <Button
        className={'body medium-bold button-base button-type-secondary button-size-medium'}
        onClick={onClick}
    >
        <PhotoImg style={{ position: 'relative', top: -1 }} />
        Сделать фото
    </Button>
    // <Button className="buttonTakeAPhoto" onClick={onClick} icon={<PictureOutlined className="PictureOutlined" />}>Сделать фото</Button>
);

export default ButtonTakeAPhoto;

import { Button } from 'antd';
import React from 'react';
import './styleRecordVideo.css';
// import IconRecordVideo from '../../../../../../../../components/icons/iconRecordVideo/IconRecordVideo';
import { ReactComponent as VideoImg } from 'utils/app/assets/icons/Video.svg';

interface ButtonRecordVideoProps {
    onClick: () => void;
    disabled?: boolean;
}

const ButtonRecordVideo: React.FC<ButtonRecordVideoProps> = ({ onClick, disabled }) => (
    <Button
        className={'body medium-bold button-base button-type-secondary button-size-medium'}
        onClick={onClick}
        disabled={disabled}
    >
        <VideoImg style={{ position: 'relative', top: -1 }} />
        Запись видео
    </Button>
    // <Button className="ButtonRecordVideo" onClick={onClick} icon={<IconRecordVideo/>}>Запись видео</Button>
);

export default ButtonRecordVideo;

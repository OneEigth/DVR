import { Button } from 'antd';
import React from 'react';
import './styleRecordVideo.css'
import IconRecordVideo from "../../../../../../../../components/icons/iconRecordVideo/IconRecordVideo";


interface ButtonRecordVideoProps {
    onClick: () => void;
}

const ButtonRecordVideo: React.FC<ButtonRecordVideoProps> = ({ onClick }) => (
    <Button className="ButtonRecordVideo" onClick={onClick} icon={<IconRecordVideo/>}>Запись видео</Button>
);

export default ButtonRecordVideo;
import { Button } from 'antd';
import React from 'react';
import './styleRecordAudio.css'
import IconRecordAudio from "../../icons/iconRecordAudio/IconRecordAudio";


interface ButtonRecordAudioProps {
    onClick: () => void;
}

const ButtonRecordAudio: React.FC<ButtonRecordAudioProps> = ({ onClick }) => (
    <Button className="ButtonRecordVideo" onClick={onClick} icon={<IconRecordAudio/>}>Запись аудио</Button>
);

export default ButtonRecordAudio;
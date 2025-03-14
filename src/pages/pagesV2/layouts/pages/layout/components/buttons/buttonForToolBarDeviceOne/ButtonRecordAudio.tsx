import { Button } from 'antd';
import React from 'react';
import './styleRecordAudio.css';
// import IconRecordAudio from '../../../../../../../../components/icons/iconRecordAudio/IconRecordAudio';
import { ReactComponent as AudioImg } from 'utils/app/assets/icons/Audio.svg';

interface ButtonRecordAudioProps {
    onClick: () => void;
}

const ButtonRecordAudio: React.FC<ButtonRecordAudioProps> = ({ onClick }) => (
    <Button
        className={'body medium-bold button-base button-type-secondary button-size-medium'}
        onClick={onClick}
    >
        <AudioImg style={{ position: 'relative', top: -1 }} />
        Запись аудио
    </Button>
    // <Button className="ButtonRecordVideo" onClick={onClick} icon={<IconRecordAudio/>}>Запись аудио</Button>
);

export default ButtonRecordAudio;

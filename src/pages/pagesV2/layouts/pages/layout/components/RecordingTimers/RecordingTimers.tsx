import useRecordingStore, { Recording } from '../../api/recording/recordingStore';
import { formatTime } from '../../../../../../../utils/format';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReactComponent as SvgClose } from 'utils/app/assets/icons/Close.svg';

import './styles.css';

interface RecordingTimersProps {
    setIsStopModalVisible: (open: boolean) => void;
    setStopType: (type: 'audio' | 'video') => void;
    setCurrentRecording: (recording: Recording) => void;
}

export const RecordingTimers = ({
    setIsStopModalVisible,
    setStopType,
    setCurrentRecording,
}: RecordingTimersProps) => {
    const recordings = useRecordingStore((state) => state.recordings);

    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handlerStopClick = (recording: Recording) => {
        setStopType(recording.type);
        setCurrentRecording(recording);
        setIsStopModalVisible(true);
    };

    // const uniqueRecordings = recordings.filter(
    //     (rec, index, self) => index === self.findIndex((r) => r.id === rec.id),
    // );

    return (
        <div className="recording-timers">
            {recordings.map((recording, index) => {
                const date = new Date(recording.startTime);
                const timezoneOffset = +5;
                const duration = currentTime - recording.startTime;
                const hours = Math.floor(duration / (1000 * 60 * 60));
                const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((duration % (1000 * 60)) / 1000);
                date.setUTCHours(date.getUTCHours() + timezoneOffset);
                const formattedTime = date.toISOString().split('T')[1].slice(0, 8);
                return (
                    <div key={recording.id} className="recording-timer">
                        <div className={'recording-timer-container'}>
                            <span
                                className={'headline medium'}
                                style={{ color: 'var(--gray-white)' }}
                            >
                                {/*{new Date(recording.startTime) }*/}
                                {formattedTime} : {String(hours).padStart(2, '0')}:
                                {String(minutes).padStart(2, '0')}:
                                {String(seconds).padStart(2, '0')}
                            </span>
                            <span className={'body medium'} style={{ color: 'var(--gray-white)' }}>
                                {recording.type === 'audio' ? 'Запись аудио' : 'Запись видео'} (
                                {recording.devices?.length})
                            </span>
                        </div>
                        {/*<div className="recording-timer-container">*/}
                        {/*    <span className="headline medium">*/}
                        {/*        {recording.label} • {formatTime(Date.now() - recording.startTime)}*/}
                        {/*    </span>*/}
                        {/*    <span className="body medium">*/}
                        {/*        Камеры: {recording.devices.map((d) => d.name).join(', ')}*/}
                        {/*    </span>*/}
                        {/*</div>*/}
                        <Button
                            className={
                                'button-base button-type-primary button-size-large button-state-danger'
                            }
                            onClick={() => handlerStopClick(recording)}
                        >
                            <SvgClose
                                style={{ fill: 'var(--gray-white)', position: 'relative', top: -1 }}
                            />
                            Закончить
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};

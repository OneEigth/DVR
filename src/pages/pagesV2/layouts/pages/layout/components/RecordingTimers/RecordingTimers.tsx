import useRecordingStore, { Recording } from '../../api/recording/recordingStore';
import { formatTime } from '../../../../../../../utils/format';
import { Button } from 'antd';
import React from 'react';
import './styles.css';

interface RecordingTimersProps {
    setIsStopModalVisible: (open: boolean) => void;
}

export const RecordingTimers = ({ setIsStopModalVisible }: RecordingTimersProps) => {
    const recordings = useRecordingStore((state) => state.recordings);

    return (
        <div className="recording-timers">
            {recordings.map((recording, index) => (
                <div key={index} className="recording-timer">
                    <span>
                        {recording.type === 'audio' ? 'Запись аудио' : 'Запись видео'}:{' '}
                        {formatTime(Date.now() - recording.startTime)}
                    </span>
                    <Button onClick={() => setIsStopModalVisible(true)}>Остановить</Button>
                </div>
            ))}
        </div>
    );
};

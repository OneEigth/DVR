import useRecordingStore, { Recording } from '../../api/recording/recordingStore';
import { formatTime } from '../../../../../../../utils/format';
import { Button } from 'antd';
import React from 'react';
import { ReactComponent as SvgClose } from 'utils/app/assets/icons/Close.svg';

import './styles.css';

interface RecordingTimersProps {
    setIsStopModalVisible: (open: boolean) => void;
    setStopType: (type: 'audio' | 'video') => void;
}

export const RecordingTimers = ({ setIsStopModalVisible, setStopType }: RecordingTimersProps) => {
    const recordings = useRecordingStore((state) => state.recordings);
    // const setStopType = useRecordingStore((state) => state.setStopType);

    return (
        <div className="recording-timers">
            {recordings.map((recording, index) => (
                <div key={index} className="recording-timer">
                    <div className={'recording-timer-container'}>
                        <span className={'headline medium'} style={{ color: 'var(--gray-white)' }}>
                            {formatTime(Date.now() - recording.startTime)}
                        </span>
                        <span className={'body medium'} style={{ color: 'var(--gray-white)' }}>
                            {recording.type === 'audio' ? 'Запись аудио' : 'Запись видео'}
                        </span>
                    </div>

                    <Button
                        className={
                            'button-base button-type-primary button-size-large button-state-danger'
                        }
                        onClick={() => (setIsStopModalVisible(true), setStopType(recording.type))}
                    >
                        <SvgClose
                            style={{ fill: 'var(--gray-white)', position: 'relative', top: -1 }}
                        />
                        Закончить
                    </Button>
                </div>
            ))}
        </div>
    );
};

import React from 'react';
import './ProgressStyle.css'
interface TimeScaleProps {
    videoDuration: number;
    currentProgress: number;
}

const TimeScale: React.FC<TimeScaleProps> = ({ videoDuration, currentProgress }) => {
    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const currentTime = formatTime((videoDuration * currentProgress) / 100);

    return (
        <div className="vp-time-scale">
            <span className="vp-time-scale__current">{currentTime}</span>
            <span className="vp-time-scale__total">{formatTime(videoDuration)}</span>
        </div>
    );
};

export default TimeScale;

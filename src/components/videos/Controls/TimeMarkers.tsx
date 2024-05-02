import React from 'react';

interface TimeMarkersProps {
    videoDuration: number;
}

const TimeMarkers: React.FC<TimeMarkersProps> = ({ videoDuration }) => {
    const generateTimeMarkers = (videoDuration: number): JSX.Element[] => {
        const markers: JSX.Element[] = [];
        const intervalCount = 17; // Количество интервалов

        const interval = Math.floor(videoDuration / intervalCount);

        for (let i = 0; i <= intervalCount; i++) {
            const markerTime = interval * i;
            const minutes = Math.floor(markerTime / 60);
            const seconds = Math.floor(markerTime % 60);
            const formattedTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            markers.push(
                <div key={i} className="time-marker" style={{ left: `${(i / intervalCount) * 100}%` }}>
                    <div className="ruler-marker"></div>
                    <div className="formattedTime">
                        {formattedTime}
                    </div>
                </div>
            );
        }

        return markers;
    };

    return <div className="time-markers-container">{generateTimeMarkers(videoDuration)}</div>;
};

export default TimeMarkers;

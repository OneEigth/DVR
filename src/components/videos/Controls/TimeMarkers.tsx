import React from 'react';

const TimeMarkers: React.FC = () => {
    const generateTimeMarkers = (): JSX.Element[] => {
        const markers: JSX.Element[] = [];
        const intervalCount = 24; // Количество интервалов на 24 часа
        const intervalMinutes = 60; // Длительность интервала в минутах

        for (let i = 0; i <= intervalCount; i++) {
            const hours = Math.floor(i); // Часы
            const minutes = (i % 1) * intervalMinutes; // Минуты
            const formattedHours = hours < 10 ? '0' + hours : hours;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes}`;
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

    return <div className="time-markers-container">{generateTimeMarkers()}</div>;
};

export default TimeMarkers;

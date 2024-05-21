import React, {memo, useEffect, useRef, useState} from 'react';
import './style/style.css'
import {useFilesStore} from "../../store/devices/fileDevicesFromDB";
import {useSelectedFilesStore} from "../../store/devices/SelectedFilesState";



interface NavigationTimeLineProps {
    selectedDate: Date | null;
    deviceUID:string
}

const NavigationTimeLine: React.FC<NavigationTimeLineProps> = ({
                                                                   selectedDate,
                                                                   deviceUID
                                                               }) => {
    const { setSelectedFiles } = useSelectedFilesStore();
    const { files, fetchFiles } = useFilesStore();
    const [startDateTime, setStartDateTime] = useState<Date | null>(null);
    const [endDateTime, setEndDateTime] = useState<Date | null>(null);


        // отправляем запрос - поулчаем файлы
    useEffect(() => {
        if (selectedDate) {


            // Корректировка на локальный часовой пояс
            const localDate = new Date(selectedDate);
            const adjustedDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

            // Устанавливаем начало выбранного дня
            const start = new Date(adjustedDate);
            start.setHours(-19, 0, 0, 0);

            // Устанавливаем конец выбранного дня
            const end = new Date(adjustedDate);
            end.setHours(4, 59, 59, 999);

            // Форматируем даты для запроса
            const formattedStart = start.toISOString().split('.')[0] + '+05:00';
            const formattedEnd = end.toISOString().split('.')[0] + '+05:00';

            setStartDateTime(start);

            setEndDateTime(end);


            fetchFiles(deviceUID, formattedStart, formattedEnd);
        }
    }, [selectedDate, fetchFiles]);

    // разметка временной 24-часовой шкалы
    const generateTimeMarkers = (): JSX.Element[] => {
        const markers: JSX.Element[] = [];
        const intervalCount = 24; // Количество интервалов на 24 часа
        const intervalMinutes = 120; // Длительность интервала в минутах

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

    const renderFilesOnTimeline = (startDateTime: Date | null, endDateTime: Date | null): JSX.Element[] => {
        if (!startDateTime || !endDateTime || !files.length) return [];

        const mp4Files = files.filter(file => file.fileType === 'mp4');


        return mp4Files.map((file, index) => {
            const fileStart = new Date(file.start).getTime();
            const fileEnd = new Date(file.end).getTime();
            const totalDuration = endDateTime.getTime() - startDateTime.getTime();
            const leftPercent = ((fileStart - startDateTime.getTime()) / totalDuration) * 100;
            const widthPercent = ((fileEnd - fileStart) / totalDuration*100)*100;

            return (
                <div
                    key={index}
                    className="file-on-timeline"
                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    onClick={() => handleFileSelection([file])} // Передаем выбранный файл в обработчик клика
                ></div>
            );
        });
    };

    const handleFileSelection = (selectedFiles: any[]) => {
        // Обновляем выбранные файлы в хранилище
        setSelectedFiles(selectedFiles);
        console.log(selectedFiles)
    };


    return (
        <div className="nav_controle">
            <div className="Nav-progress">
                <div className="Nav-progress__range">
                    <div className="time-markers-container">{generateTimeMarkers()}</div>

                    <div className="Nav-progress__range--background"/>
                    <div className="files-container">{renderFilesOnTimeline(startDateTime, endDateTime)}</div>


                    {/*<input className="Nav-progress__range--seek" type="range" step="any"/>*/}
                </div>
            </div>
        </div>
    );
};

export default memo(NavigationTimeLine);

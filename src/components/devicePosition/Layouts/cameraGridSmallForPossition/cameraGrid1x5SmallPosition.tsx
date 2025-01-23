import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSelectedLayout} from "../../../../store/useSelectedLayout";
import {Device} from "../../../../types/Device";
import {notification} from "antd";


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 210px 210px 210px; /* Ширина колонок */
    grid-template-rows: 120px 120px 120px; /* Высота строк */
    gap: 5px; /* Отступ между элементами */
    padding: 5px;
`;

const CameraTile = styled.div<{ isSelected: boolean }>`
    background-color: #333;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* Для абсолютного позиционирования нумерации */
    font-size: 24px;
    height: 100%;
    cursor: pointer;
    border: ${({ isSelected }) => (isSelected ? "4px solid yellow" : "none")}; /* Желтая рамка для выбранных */
    box-shadow: ${({ isSelected }) =>
            isSelected ? "0 0 10px 2px yellow" : "none"}; /* Подсветка для выбранных */
`;

const Circle = styled.div`
    width: 20px;
    height: 20px;
    background-color: white;
    color: black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    margin-right: 8px;
    margin-left: 4px;
    margin-top: 6px;
`;
const CameraHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #4d4e6540; /* Полупрозрачный фон */
    padding: 0;
    border-radius: 0;
    width: 100%;
`;

const DeviceName = styled.span`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    text-align: left;
    color: white; /* Цвет текста */
    margin-top: 6px;
`;



interface CameraGridProps {
    menuType: "layout" | "edit";
    onDeviceClick: (UID: string | null) => void; // Обновляем тип
    selectedDevices: string[]; // Список выбранных устройств
}

const CameraGrid1x5SmallPosition: React.FC<CameraGridProps> = ({
                                                           menuType,
                                                           onDeviceClick,
                                                           selectedDevices,
                                                       }) => {

    const { selectedLayout } = useSelectedLayout();
    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);
    const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

    // Загрузка устройств при обновлении выбранной раскладки
    useEffect(() => {
        if (selectedLayout?.devices) {
            setDevices([...selectedLayout.devices]);
        }
    }, [selectedLayout]);

    const handleTileClick = (device: Device | null) => {
        if (device && device.UID) {
            setSelectedPosition(device.UID);
            onDeviceClick(device.UID); // Передаем UID устройства
        } else {
            setSelectedPosition(null);
            onDeviceClick(null); // Передаем null для сброса
        }
    };


    return (
        <>

            <GridContainer>
                {Array.from({ length: 6 }).map((_, idx) => {
                    const device = devices[idx] || null; // Получаем устройство
                    const isSelected = device ? selectedPosition === device.UID : false;

                    return (
                        <CameraTile
                            key={device?.UID || idx} // Уникальный ключ для каждого тайла
                            style={
                                idx === 0
                                    ? { gridColumn: "1 / 3", gridRow: "1 / 3" } // Специальный размер для первой камеры
                                    : idx === 1
                                        ? { gridColumn: "3", gridRow: "1 / 2" } // Камера 2
                                        : idx === 2
                                            ? { gridColumn: "3", gridRow: "2 / 3" } // Камера 3
                                            : idx === 3
                                                ? { gridColumn: "1 / 2", gridRow: "3" } // Камера 4
                                                : idx === 4
                                                    ? { gridColumn: "2 / 3", gridRow: "3" } // Камера 5
                                                    : { gridColumn: "3", gridRow: "3" } // Камера 6
                            }
                            isSelected={isSelected}
                            onClick={() => handleTileClick(device)} // Обработчик клика
                        >
                            <CameraHeader>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Circle>{idx + 1}</Circle>
                                    {device && (
                                        <DeviceName style={{ marginLeft: 8 }}>
                                            {device.name || "Нет устройства"}
                                        </DeviceName>
                                    )}
                                </div>
                            </CameraHeader>

                            {idx + 1}

                        </CameraTile>
                    );
                })}
            </GridContainer>
        </>
    );
};

export default CameraGrid1x5SmallPosition;

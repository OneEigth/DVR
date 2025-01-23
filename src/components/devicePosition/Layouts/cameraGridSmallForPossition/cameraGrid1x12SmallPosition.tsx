import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelectedLayout } from "../../../../store/useSelectedLayout";
import { Device } from "../../../../types/Device";
import { notification } from "antd";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 150px); /* 4 колонки по 150px */
    grid-template-rows: repeat(4, 80px); /* 4 строки по 80px */
    gap: 10px; /* Отступ между элементами */
    padding: 10px;
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
    font-size: 14px;
    font-weight: 500;
    margin: 4px;
    z-index: 10;
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


interface CameraGridProps {
    menuType: "layout" | "edit";
    onDeviceClick: (UID: string | null) => void; // Обновляем тип
    selectedDevices: string[]; // Список выбранных устройств
}

const CameraGrid1x12SmallPosition: React.FC<CameraGridProps> = ({
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
                {Array.from({ length: 13 }).map((_, idx) => {
                    const device = devices[idx] || null;
                    const isSelected = device ? selectedPosition === device.UID : false;


                    // Логика стилей для каждой камеры
                    const gridStyle =
                        idx === 0
                            ? { gridColumn: "1 / 3", gridRow: "1 / 3" }
                            : idx === 1
                                ? { gridColumn: "1", gridRow: "3" }
                                : idx === 2
                                    ? { gridColumn: "2", gridRow: "3" }
                                    : idx === 3
                                        ? { gridColumn: "1", gridRow: "4" }
                                        : idx === 4
                                            ? { gridColumn: "2", gridRow: "4" }
                                            : idx === 5
                                                ? { gridColumn: "3", gridRow: "1 / 2" }
                                                : idx === 6
                                                    ? { gridColumn: "4", gridRow: "1 / 2" }
                                                    : idx === 7
                                                        ? { gridColumn: "3", gridRow: "2 / 3" }
                                                        : idx === 8
                                                            ? { gridColumn: "4", gridRow: "2" }
                                                            : idx === 9
                                                                ? { gridColumn: "3", gridRow: "3" }
                                                                : idx === 10
                                                                    ? { gridColumn: "4", gridRow: "3" }
                                                                    : idx === 11
                                                                        ? { gridColumn: "3", gridRow: "4" }
                                                                        : { gridColumn: "4", gridRow: "4" }; // Камера 13

                    return (
                        <CameraTile
                            key={device?.UID || idx}
                            isSelected={isSelected}

                            style={gridStyle}
                            onClick={() => handleTileClick(device)}
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

export default CameraGrid1x12SmallPosition;

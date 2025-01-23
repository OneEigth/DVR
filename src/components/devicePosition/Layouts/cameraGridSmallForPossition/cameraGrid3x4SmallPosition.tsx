import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Device} from "../../../../types/Device";
import {notification} from "antd";
import {useSelectedLayout} from "../../../../store/useSelectedLayout";


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 160px 160px 160px 160px; /* Ширина колонок */
    grid-template-rows: 80px 80px 80px 80px;    /* Высота строк */
    gap: 10px; /* Отступ между элементами */
    
`;


/*const CameraTile = styled.div<{ isSelected: boolean; isDisabled: boolean; gridColumn: string; gridRow: string }>`
    grid-column: ${({ gridColumn }) => gridColumn};
    grid-row: ${({ gridRow }) => gridRow};
    background-color: ${({ isDisabled }) => (isDisabled ? "#555" : "#333")};
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 24px;
    height: 100%;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    border: ${({ isSelected }) => (isSelected ? "4px solid yellow" : "none")};
    box-shadow: ${({ isSelected }) =>
            isSelected ? "0 0 10px 2px yellow" : "none"};
    pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
    opacity: ${({ isDisabled }) => (isDisabled ? "0.5" : "1")};
`;*/

const CameraTile = styled.div<{ isSelected: boolean; gridColumn: string; gridRow: string }>`
    grid-column: ${({ gridColumn }) => gridColumn};
    grid-row: ${({ gridRow }) => gridRow};
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

const CameraGrid3x4SmallPosition: React.FC<CameraGridProps> = ({menuType, onDeviceClick, selectedDevices}) => {
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

    const gridMapping = [
        { gridColumn: "1 / 3", gridRow: "1 / 3" }, // Камера 1
        { gridColumn: "3 / 5", gridRow: "1 / 3" }, // Камера 2
        { gridColumn: "1 / 3", gridRow: "3 / 5" }, // Камера 3
        { gridColumn: "3 / 4", gridRow: "3 / 4" },         // Камера 4
        { gridColumn: "4 / 5", gridRow: "3 / 4" },         // Камера 5
        { gridColumn: "3 / 4", gridRow: "4 / 4" },         // Камера 6
        { gridColumn: "4 / 5", gridRow: "4 / 4" },         // Камера 7

    ];

    return (
        <>

            <GridContainer>
                {gridMapping.map(({ gridColumn, gridRow }, idx) => {
                    const device = devices[idx] || null;
                    const isSelected = device ? selectedPosition === device.UID : false;


                    return (
                        <CameraTile
                            key={device?.UID || idx}
                            gridColumn={gridColumn}
                            gridRow={gridRow}
                            isSelected={isSelected}

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

export default CameraGrid3x4SmallPosition;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Device } from "../../types/Device";
import { useSelectedLayout } from "../../store/useSelectedLayout";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 160px); /* Четыре колонки фиксированной ширины */
    grid-template-rows: repeat(4, 80px); /* Четыре строки фиксированной высоты */
    gap: 5px; /* Отступ между элементами */
    padding: 5px;
`;

const CameraTile = styled.div<{ isSelected: boolean; isDisabled: boolean }>`
    background-color: ${({ isDisabled }) => (isDisabled ? "#555" : "#333")}; /* Серый фон для отключенных */
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 100%;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    border: ${({ isSelected }) => (isSelected ? "4px solid yellow" : "none")};
    box-shadow: ${({ isSelected }) =>
    isSelected ? "0 0 10px 2px yellow" : "none"}; /* Подсветка для выбранных */
    pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
    opacity: ${({ isDisabled }) => (isDisabled ? "0.5" : "1")};
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

interface CameraGridProps {
    menuType: "layout" | "edit";
    onDeviceClick: (UID: string) => void;
    selectedDevices: string[];
}

const CameraGrid2x8Small: React.FC<CameraGridProps> = ({
                                                           menuType,
                                                           onDeviceClick,
                                                           selectedDevices,
                                                       }) => {
    const { selectedLayout } = useSelectedLayout();
    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);

    useEffect(() => {
        if (selectedLayout?.devices) {
            setDevices([...selectedLayout.devices]);
        }
    }, [selectedLayout]);

    const handleTileClick = (device: Device | null) => {
        if (device && device.online) {
            onDeviceClick(device.UID);
        }
    };

    return (
        <GridContainer>
            {Array.from({ length: 10 }).map((_, idx) => {
                const device = devices[idx] || null;
                const isSelected = device ? selectedDevices.includes(device.UID) : false;
                const isDisabled = !device || !device.online;

                // Определение стилей расположения тайла в сетке
                const gridStyle =
                    idx === 0
                        ? { gridColumn: "1 / 3", gridRow: "1 / 3" } // Камера 1
                        : idx === 5
                            ? { gridColumn: "3 / 5", gridRow: "1 / 3" } // Камера 6
                            : idx >= 1 && idx <= 4
                                ? { gridColumn: ((idx - 1) % 2) + 1, gridRow: Math.floor((idx - 1) / 2) + 3 } // Камеры 2–5
                                : { gridColumn: ((idx - 6) % 2) + 3, gridRow: Math.floor((idx - 6) / 2) + 3 }; // Камеры 7–10


                return (
                    <CameraTile
                        key={device?.UID || idx}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        style={gridStyle}
                        onClick={() => handleTileClick(device)}
                    >
                        <Circle>{idx + 1}</Circle>

                    </CameraTile>
                );
            })}
        </GridContainer>
    );
};

export default CameraGrid2x8Small;
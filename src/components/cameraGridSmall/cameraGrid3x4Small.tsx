import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Device} from "../../types/Device";
import {notification} from "antd";
import {useSelectedLayout} from "../../store/useSelectedLayout";


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 160px 160px 160px 160px; /* Ширина колонок */
    grid-template-rows: 80px 80px 80px 80px;    /* Высота строк */
    gap: 10px; /* Отступ между элементами */
    
`;


const CameraTile = styled.div<{ isSelected: boolean; isDisabled: boolean; gridColumn: string; gridRow: string }>`
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
interface CameraGridProps {
    menuType: "layout" | "edit";
    onDeviceClick: (UID: string) => void;
    selectedDevices: string[];
}

const CameraGrid3x4Small: React.FC<CameraGridProps> = ({menuType, onDeviceClick, selectedDevices}) => {
    const { selectedLayout } = useSelectedLayout();
    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);
    const [api, contextHolder] = notification.useNotification();

    // Загрузка устройств при обновлении выбранной раскладки
    useEffect(() => {
        if (selectedLayout?.devices) {
            setDevices([...selectedLayout.devices]);
        }
    }, [selectedLayout]);

    const handleTileClick = (device: Device | null) => {
        if (!device) {
            api.warning({ message: "Нет устройства для выбора." });
            return;
        }
        if (!device.online) {
            api.warning({ message: `Устройство "${device.name}" оффлайн и недоступно.` });
            return;
        }
        if (device && device.UID) {
            onDeviceClick(device.UID);
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
            {contextHolder}
            <GridContainer>
                {gridMapping.map(({ gridColumn, gridRow }, idx) => {
                    const device = devices[idx] || null;
                    const isSelected = device ? selectedDevices.includes(device.UID) : false;
                    const isDisabled = !device || !device.online;

                    return (
                        <CameraTile
                            key={device?.UID || idx}
                            gridColumn={gridColumn}
                            gridRow={gridRow}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                            onClick={() => handleTileClick(device)}
                        >
                            <Circle>{idx + 1}</Circle>

                        </CameraTile>
                    );
                })}
            </GridContainer>
        </>
    );
};

export default CameraGrid3x4Small;

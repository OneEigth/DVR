import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { notification } from "antd";
import {useSelectedLayout} from "../../api/layout/useSelectedLayout";
import {Device} from "../../../../../../../types/Device";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 150px); /* 4 колонки по 150px */
    grid-template-rows: repeat(4, 80px); /* 4 строки по 80px */
    gap: 10px; /* Отступ между элементами */
    padding: 10px;
`;

const CameraTile = styled.div<{ isSelected: boolean; isDisabled: boolean }>`
    background-color: ${({ isDisabled }) => (isDisabled ? "#555" : "#333")};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 100%;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    border: ${({ isSelected }) => (isSelected ? "4px solid yellow" : "none")};
    box-shadow: ${({ isSelected }) =>
    isSelected ? "0 0 10px 2px yellow" : "none"};
    pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
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

const CameraGrid1x12Small: React.FC<CameraGridProps> = ({
                                                            menuType,
                                                            onDeviceClick,
                                                            selectedDevices,
                                                        }) => {
    const { selectedLayout } = useSelectedLayout();
    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);
    const [api, contextHolder] = notification.useNotification();

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

    return (
        <>
            {contextHolder}
            <GridContainer>
                {Array.from({ length: 13 }).map((_, idx) => {
                    const device = devices[idx] || null;
                    const isSelected = device ? selectedDevices.includes(device.UID) : false;
                    const isDisabled = !device || !device.online;

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
                            isDisabled={isDisabled}
                            style={gridStyle}
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

export default CameraGrid1x12Small;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelectedLayout } from "../../../store/useSelectedLayout";
import { Device } from "../../../types/Device";
import { notification } from "antd";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 315px 315px; /* Ширина колонок */
    grid-template-rows: 190px 190px; /* Высота строк */
    gap: 10px; /* Отступ между элементами */
    padding: 5px;
`;

const CameraTile = styled.div<{ isSelected: boolean; isDisabled: boolean }>`
    background-color: ${({ isDisabled }) => (isDisabled ? "#555" : "#333")}; /* Серый фон для отключенных */
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* Для абсолютного позиционирования нумерации */
    font-size: 24px;
    height: 100%;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")}; /* Запрет на выбор отключенных */
    border: ${({ isSelected }) => (isSelected ? "4px solid yellow" : "none")}; /* Желтая рамка для выбранных */
    box-shadow: ${({ isSelected }) =>
            isSelected ? "0 0 10px 2px yellow" : "none"}; /* Подсветка для выбранных */
    pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")}; /* Отключение кликов */
    opacity: ${({ isDisabled }) => (isDisabled ? "0.5" : "1")}; /* Прозрачность для недоступных */
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
    line-height: 20px;
    letter-spacing: 0.1px;
    text-align: left;
    margin-right: 8px; /* Отступ справа от круга */
    margin-left: 4px;
    margin-top: 6px;
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

const AddButton = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background-color: #4d90fe; /* Цвет кнопки */
    cursor: pointer;
    &:hover {
        background-color: #357ae8;
    }
`;

interface CameraGridProps {
    menuType: "layout" | "edit";
    onDeviceClick: (UID: string) => void;
    selectedDevices: string[];
}

const CameraGrid2x2Small: React.FC<CameraGridProps> = ({ menuType, onDeviceClick, selectedDevices }) => {
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

    return (
        <>
            {contextHolder}
            <GridContainer>
                {Array.from({ length: 4 }).map((_, idx) => {
                    const device = devices[idx] || null;
                    const isSelected = device ? selectedDevices.includes(device.UID) : false;
                    const isDisabled = !device || !device.online;

                    return (
                        <CameraTile
                            key={device?.UID || idx}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
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
                            {device ? (
                                device.online ? (
                                    <div>Устройство доступно</div>
                                ) : (
                                    <div>Устройство оффлайн</div>
                                )
                            ) : (
                                <AddButton>+</AddButton>
                            )}
                        </CameraTile>
                    );
                })}
            </GridContainer>
        </>
    );
};

export default CameraGrid2x2Small;
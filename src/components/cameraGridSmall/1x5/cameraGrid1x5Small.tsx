import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSelectedLayout} from "../../../store/useSelectedLayout";
import {Device} from "../../../types/Device";
import {notification} from "antd";
import './style1x5.css'

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 210px 210px 210px; /* Ширина колонок */
    grid-template-rows: 120px 120px 120px; /* Высота строк */
    gap: 5px; /* Отступ между элементами */
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



interface CameraGridProps {
    menuType: "layout" | "edit";
    onDeviceClick: (UID: string) => void;
    selectedDevices: string[];
}

const CameraGrid1x5Small: React.FC<CameraGridProps> = ({
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
                {Array.from({ length: 6 }).map((_, idx) => {
                    const device = devices[idx] || null; // Получаем устройство
                    const isSelected = device ? selectedDevices.includes(device.UID) : false; // Проверяем, выбрано ли устройство
                    const isDisabled = !device || !device.online; // Проверяем, доступно ли устройство

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
                            isDisabled={isDisabled}
                            onClick={() => handleTileClick(device)} // Обработчик клика
                        >
                            <Circle>{idx + 1}</Circle>

                        </CameraTile>
                    );
                })}
            </GridContainer>
        </>
    );
};

export default CameraGrid1x5Small;

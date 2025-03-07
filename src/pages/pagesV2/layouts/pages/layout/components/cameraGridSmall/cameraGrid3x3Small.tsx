import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSelectedLayout} from "../../api/layout/useSelectedLayout";
import {Device} from "../../../../../../../types/Device";



const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 220px); /* Три колонки фиксированной ширины */
    grid-template-rows: repeat(3, 120px); /* Три строки фиксированной высоты */
    gap: 5px; /* Отступ между элементами */
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


const CameraGrid3x3Small: React.FC<CameraGridProps> = ({
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
            {Array.from({ length: 9 }).map((_, idx) => {
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
                        <Circle>{idx + 1}</Circle>

                    </CameraTile>
                );
            })}
        </GridContainer>
    );
};

export default CameraGrid3x3Small;
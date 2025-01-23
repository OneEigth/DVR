import React, {useState} from 'react';
import { Modal, InputNumber } from "antd";
import "../style.css"
import CameraGrid2x2SmallPosition from "../Layouts/cameraGridSmallForPossition/cameraGrid2x2SmallPosition";

interface DevicePositionModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    currentPosition: number | null;
    onPositionChange: (value: number) => void; // Функция изменения позиции
    selectedDevices: string[]; // Список UID выбранных устройств
}


const DevicePositionModal: React.FC<DevicePositionModalProps> = ({
                                                                     visible,
                                                                     onOk,
                                                                     onCancel,
                                                                     currentPosition,
                                                                     onPositionChange,
                                                                     selectedDevices,
                                                                 }) => {
    const [selectedPosition, setSelectedPosition] = useState<number | null>(currentPosition);

    const handleDeviceClick = (UID: string | null) => {
        if (UID) {
            const position = selectedDevices.indexOf(UID) + 1; // Индекс устройства + 1 для позиции
            setSelectedPosition(position);
            onPositionChange(position); // Передаем позицию в родительский компонент
        } else {
            // Если UID отсутствует (null), сбрасываем позицию
            setSelectedPosition(null);
            onPositionChange(0); // Или другое значение для сброса
        }
    };

    return (
        <Modal
            className="devicePosition"
            title="Выберите новую позицию устройства"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Подтвердить"
            cancelText="Отмена"
        >
            {/* Компонент CameraGrid2x2SmallPosition */}
            <CameraGrid2x2SmallPosition
                menuType="layout"
                onDeviceClick={handleDeviceClick}
                selectedDevices={selectedDevices}
            />
        </Modal>
    );
};

export default DevicePositionModal;
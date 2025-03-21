import React, { useState } from 'react';
import { Modal, InputNumber } from 'antd';
import './styles.css';
import { Device } from '../../../../../../../types/Device';
import CameraGrid from '../CameraTile/CameraTile';
import CameraGrid2x2SmallPosition from '../../../../../../../components/devicePosition/Layouts/cameraGridSmallForPossition/cameraGrid2x2SmallPosition';

interface DevicePositionModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    currentPosition: number | null;
    onPositionChange: (oldPosition: number, newPosition: number) => void; // Функция изменения позиции
    selectedDevices: string[]; // Список UID выбранных устройств
    devices: Device[];
    currentDevice: Device | null;
    layoutViewType: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4' | '1х7';
    setIsModalVisible: (visible: boolean) => void;
}

const DevicePositionModal: React.FC<DevicePositionModalProps> = ({
    visible,
    onOk,
    onCancel,
    currentPosition,
    onPositionChange,
    selectedDevices,
    devices,
    currentDevice,
    layoutViewType,
    setIsModalVisible,
}) => {
    const [selectedPosition, setSelectedPosition] = useState<number | null>(currentPosition);

    const handleDeviceClick = (UID: string | null) => {
        if (UID) {
            const position = selectedDevices.indexOf(UID) + 1; // Индекс устройства + 1 для позиции
            setSelectedPosition(position);
            // onPositionChange(position); // Передаем позицию в родительский компонент
        } else {
            // Если UID отсутствует (null), сбрасываем позицию
            setSelectedPosition(null);
            // onPositionChange(0); // Или другое значение для сброса
        }
    };

    // const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

    const handleTileClick = (position: number) => {
        setSelectedPosition(position);
    };

    const handleOk = () => {
        if (selectedPosition !== null && currentDevice) {
            const oldPosition = devices.findIndex((d) => d.UID === currentDevice.UID);
            onPositionChange(oldPosition, selectedPosition); // Передаем старую и новую позицию
        }
        setIsModalVisible(false);
        onOk();
    };

    return (
        <Modal
            className="devicePosition"
            title="Выберите новую позицию устройства"
            visible={visible}
            onOk={handleOk}
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
            {/*<div className="preview-grid">*/}
            {/*    <CameraGrid*/}
            {/*        viewType={layoutViewType}*/}
            {/*        devices={devices}*/}
            {/*        menuType="edit"*/}
            {/*        isMapVisible={false}*/}
            {/*        onTileClick={handleTileClick}*/}
            {/*        selectedPosition={selectedPosition}*/}
            {/*        setIsModalVisible={setIsModalVisible}*/}
            {/*        currentDeviceId={currentDevice?.UID}*/}
            {/*        isPreview*/}
            {/*    />*/}
            {/*</div>*/}
        </Modal>
    );
};

export default DevicePositionModal;

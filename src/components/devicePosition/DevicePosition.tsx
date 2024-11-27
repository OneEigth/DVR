import React from 'react';
import { Modal, InputNumber } from "antd";
import "./style.css"

interface DevicePositionModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    currentPosition: number | null;
    maxPosition: number;
    onPositionChange: (value: number) => void;
}


const DevicePositionModal: React.FC<DevicePositionModalProps> = ({
                                                                     visible,
                                                                     onOk,
                                                                     onCancel,
                                                                     currentPosition,
                                                                     maxPosition,
                                                                     onPositionChange,
                                                                 }) => {
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
            <InputNumber
                min={1}
                max={maxPosition}
                value={currentPosition ?? undefined}
                onChange={(value) => onPositionChange(value as number)}
            />
        </Modal>
    );
};

export default DevicePositionModal;

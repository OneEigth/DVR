import React, { useState } from 'react';
import { Modal, Button, Switch, Grid, notification } from 'antd';

import CameraGrid2x2Small from "../../../cameraGridSmall/2x2/cameraGrid2x2Small";
import CameraGrid1x5Small from "../../../cameraGridSmall/1x5/cameraGrid1x5Small";
import CameraGrid3x4Small from "../../../cameraGridSmall/cameraGrid3x4Small";
import CameraGrid3x3Small from "../../../cameraGridSmall/cameraGrid3x3Small";
import CameraGrid2x8Small from "../../../cameraGridSmall/cameraGrid2x8Small";
import CameraGrid1x12Small from "../../../cameraGridSmall/cameraGrid1x12Small";
import CameraGrid4x4Small from "../../../cameraGridSmall/cameraGrid4x4Small";

import { useAuthStore } from "../../../../store/auth/auth";
import {AudioRecStartArray} from "../../../../api/audioRec/audioRecArray/AudioRecStartArray";
import {AudioRecStopArray} from "../../../../api/audioRec/audioRecArray/AudioRecStopArray";

const { useBreakpoint } = Grid;

interface ModalSelectDeviceProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    layoutViewType: string;
}

const ModalSelectDeviceAudio: React.FC<ModalSelectDeviceProps> = ({ visible, onOk, onCancel, layoutViewType }) => {
    const { SmartDVRToken, user } = useAuthStore();
    const [isSelectDevices, setIsSelectDevices] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const handleDeviceSwitch = () => setIsSelectDevices(!isSelectDevices);

    const handleDeviceClick = (UID: string) => {
        setSelectedDevices((prev) =>
            prev.includes(UID) ? prev.filter((id) => id !== UID) : [...prev, UID]
        );
    };

    const handleStartRecordingAudio = async () => {

        if (!selectedDevices.length) {
            api.warning({ message: "Не выбраны устройства для записи." });
            return;
        }
        setLoading(true);
        try {
            const userLogin = user?.login || "";
            const response = await AudioRecStartArray(SmartDVRToken, userLogin, { UID: selectedDevices });
            if (response) {
                api.success({ message: "Запись начата для выбранных устройств." });
            }
        } catch (error: any) {
            api.error({ message: "Ошибка при запуске записи.", description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleStopRecordingAudio = async () => {
        if (!selectedDevices.length) {
            api.warning({ message: "Не выбраны устройства для остановки записи." });
            return;
        }
        setLoading(true);
        try {
            const userLogin = user?.login || "";
            const response = await AudioRecStopArray(SmartDVRToken, userLogin, { UID: selectedDevices });
            if (response) {
                api.success({ message: "Запись завершена для выбранных устройств." });
            }
        } catch (error: any) {
            api.error({ message: "Ошибка при завершении записи.", description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const renderGrid = () => {
        const gridProps = {
            menuType: "layout" as "layout" | "edit", // Приведение типа
            onDeviceClick: handleDeviceClick,
            selectedDevices,
        };

        switch (layoutViewType) {
            case "2x2":
                return <CameraGrid2x2Small {...gridProps} />;
            case "1х5":
                return <CameraGrid1x5Small {...gridProps} />;
            case "3х4":
                return <CameraGrid3x4Small {...gridProps} />;
            case "3х3":
                return <CameraGrid3x3Small {...gridProps} />;
            case "2х8":
                return <CameraGrid2x8Small {...gridProps} />;
            case "1х12":
                return <CameraGrid1x12Small {...gridProps} />;
            case "4х4":
                return <CameraGrid4x4Small {...gridProps} />;
            default:
                return null;
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                visible={visible}
                onCancel={onCancel}
                footer={null}
                title="С каких устройств осуществить запись?"
                className="custom-modal"
                width={720}
                bodyStyle={{
                    height: 486,
                    opacity: 0.9,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
                centered
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Выберите устройства:</span>
                    <Switch
                        checkedChildren="Со всех"
                        unCheckedChildren="Выбрать с каких"
                        onChange={handleDeviceSwitch}
                        checked={isSelectDevices}
                    />
                </div>
                <div className="device-grid">{renderGrid()}</div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <Button
                        type="primary"
                        onClick={handleStartRecordingAudio}
                        loading={loading}
                        disabled={!selectedDevices.length}
                        title="Начать запись выбранных устройств"
                    >
                        Начать запись
                    </Button>
                    <Button
                        type="default"
                        onClick={handleStopRecordingAudio}
                        loading={loading}
                        disabled={!selectedDevices.length}
                        title="Остановить запись выбранных устройств"
                    >
                        Остановить запись
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalSelectDeviceAudio;
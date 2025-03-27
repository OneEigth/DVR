import { useEffect, useState } from 'react';
import { RecordModalProps } from '../RecordModal/RecordModal';
import { Device } from '../../../../../../../../types/Device';
import { Button, message, Modal } from 'antd';
import useRecordingStore, { Recording } from '../../../api/recording/recordingStore';
import { ReactComponent as SvgClose } from 'utils/app/assets/icons/Close.svg';
import { ModalCameraGrid } from '../../ModalCameraGrid/ModalCameraGrid';

interface StopRecordingModalProps extends RecordModalProps {
    recording: Recording; // Добавляем текущую запись для остановки
}

export const StopRecordingModal: React.FC<StopRecordingModalProps> = ({
    visible,
    onOk,
    onCancel,
    devices,
    layoutViewType,
    title,
    type,
    setIsModalVisible,
    recording,
}) => {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const { stopRecording } = useRecordingStore();

    // Инициализируем выбранные устройства при открытии
    useEffect(() => {
        if (visible) {
            setSelectedDevices([...recording.devices]);
        }
    }, [visible, recording]);

    const handleOk = () => {
        // Проверяем, что выбранные устройства действительно есть в текущей записи
        // const validDevices = selectedDevices.filter((device) =>
        //     recording.devices.some((d) => d.UID === device.UID),
        // );
        //
        // if (validDevices.length === 0) {
        //     message.error('Выберите хотя бы одну камеру из текущей записи');
        //     return;
        // }

        const devicesToStop = selectedDevices.filter((device) =>
            recording.devices.some((d) => d.UID === device.UID),
        );

        if (devicesToStop.length === 0) {
            message.error('Выберите хотя бы одну камеру из текущей записи');
            return;
        }

        // if (selectedDevices.length === 0) {
        //     message.error('Выберите хотя бы одну камеру');
        //     return;
        // }
        //
        // stopRecording(recording.id, selectedDevices);
        // setIsModalVisible(false);

        stopRecording(type, devicesToStop);
        setIsModalVisible(false);
    };

    return (
        <Modal
            title={
                <div className="modal_header headline small">
                    <span className="modal-title">{title}</span>
                    {<SvgClose className="custom-close-icon" onClick={onCancel} />}
                </div>
            }
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            // okText="Остановить запись"
            // cancelText="Отмена"
            footer={[
                <Button
                    key="ok"
                    className="button-base button-type-primary button-size-medium "
                    onClick={handleOk}
                >
                    Остановить запись
                </Button>,
            ]}
        >
            {/*<div style={{ marginBottom: 16 }}>*/}
            {/*    <span className="body medium">*/}
            {/*        Выберите камеры для остановки записи или оставьте все выбранными*/}
            {/*    </span>*/}
            {/*</div>*/}

            <ModalCameraGrid
                devices={recording?.devices}
                selectedDevices={selectedDevices}
                onTileClick={(device) => {
                    const isSelected = selectedDevices.some((d) => d.UID === device.UID);
                    setSelectedDevices(
                        isSelected
                            ? selectedDevices.filter((d) => d.UID !== device.UID)
                            : [...selectedDevices, device],
                    );
                }}
                getTileStatus={() => ({
                    highlight: type,
                    tooltip: `Идет запись ${type}`,
                })}
            />
        </Modal>
    );
};

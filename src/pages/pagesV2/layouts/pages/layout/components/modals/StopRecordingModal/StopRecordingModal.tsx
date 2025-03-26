import { useState } from 'react';
import { RecordModalProps } from '../RecordModal/RecordModal';
import { Device } from '../../../../../../../../types/Device';
import { Button, message, Modal } from 'antd';
import CameraGrid from '../../CameraTile/CameraTile';
import useRecordingStore from '../../../api/recording/recordingStore';
import { ReactComponent as SvgClose } from 'utils/app/assets/icons/Close.svg';
import { ModalCameraGrid } from '../../ModalCameraGrid/ModalCameraGrid';

export const StopRecordingModal: React.FC<RecordModalProps> = ({
    visible,
    onOk,
    onCancel,
    devices,
    layoutViewType,
    title,
    setIsModalVisible,
}) => {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const { stopRecording, stopType, getDevicesWithRecording } = useRecordingStore();

    // Получаем устройства с активной записью нужного типа
    const devicesWithRecording = getDevicesWithRecording(stopType).filter((d) =>
        devices.some((device) => device.UID === d.UID),
    );

    const handleOk = () => {
        // Останавливаем только выбранные устройства или все, если ничего не выбрано
        // const devicesToStop = selectedDevices.length > 0 ? selectedDevices : devicesWithRecording;
        // stopRecording(stopType, devicesToStop);
        if (selectedDevices.length === 0) {
            message.error('Выберите хотя бы одну камеру');
            return;
        }
        stopRecording(stopType, selectedDevices);
        onCancel();
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
                devices={devicesWithRecording}
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
                    highlight: stopType,
                    tooltip: `Идет запись ${stopType}`,
                })}
            />
            {/*<CameraGrid*/}
            {/*    viewType={layoutViewType}*/}
            {/*    devices={devicesWithRecording}*/}
            {/*    menuType="layout"*/}
            {/*    isMapVisible={false}*/}
            {/*    onTileClick={(index) => {*/}
            {/*        const device = devicesWithRecording[index];*/}
            {/*        const isSelected = selectedDevices.some((d) => d.UID === device.UID);*/}
            {/*        setSelectedDevices(*/}
            {/*            isSelected*/}
            {/*                ? selectedDevices.filter((d) => d.UID !== device.UID)*/}
            {/*                : [...selectedDevices, device],*/}
            {/*        );*/}
            {/*    }}*/}
            {/*    setIsModalVisible={setIsModalVisible}*/}
            {/*    selectedPosition={null}*/}
            {/*    currentDeviceId={null}*/}
            {/*    isPreview={false}*/}
            {/*    selectedDevices={selectedDevices}*/}
            {/*    disableEmptySlots*/}
            {/*    getTileStatus={() => ({*/}
            {/*        highlight: stopType, // Подсвечиваем в зависимости от типа записи*/}
            {/*    })}*/}
            {/*/>*/}
            {/*<CameraGrid*/}
            {/*    viewType={layoutViewType}*/}
            {/*    devices={devices}*/}
            {/*    menuType="layout"*/}
            {/*    isMapVisible={false}*/}
            {/*    onTileClick={(index) => handleTileClick(devices[index])}*/}
            {/*    selectedPosition={null}*/}
            {/*    setIsModalVisible={setIsModalVisible}*/}
            {/*    currentDeviceId={null}*/}
            {/*    isPreview={false}*/}
            {/*    selectedDevices={selectedDevices}*/}
            {/*    disableEmptySlots*/}
            {/*/>*/}
        </Modal>
    );
};

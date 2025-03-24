import { useState } from 'react';
import { RecordModalProps } from '../RecordModal/RecordModal';
import { Device } from '../../../../../../../../types/Device';
import { Modal } from 'antd';
import CameraGrid from '../../CameraTile/CameraTile';
import useRecordingStore from '../../../api/recording/recordingStore';

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
    const stopRecording = useRecordingStore((state) => state.stopRecording);
    const recordings = useRecordingStore((state) => state.recordings);

    const handleTileClick = (device: Device) => {
        const isSelected = selectedDevices.some((d) => d.UID === device.UID);
        if (isSelected) {
            setSelectedDevices(selectedDevices.filter((d) => d.UID !== device.UID));
        } else {
            setSelectedDevices([...selectedDevices, device]);
        }
    };

    const handleOk = () => {
        recordings.map((recording) => {
            stopRecording(recording.type, selectedDevices);
        });
        onOk(selectedDevices);
    };

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Остановить запись"
            cancelText="Отмена"
        >
            <CameraGrid
                viewType={layoutViewType}
                devices={devices}
                menuType="layout"
                isMapVisible={false}
                onTileClick={(index) => handleTileClick(devices[index])}
                selectedPosition={null}
                setIsModalVisible={setIsModalVisible}
                currentDeviceId={null}
                isPreview
                selectedDevices={selectedDevices}
            />
        </Modal>
    );
};

import { useState } from 'react';
import { RecordModalProps } from '../RecordModal/RecordModal';
import { Device } from '../../../../../../../../types/Device';
import { Button, Modal } from 'antd';
import CameraGrid from '../../CameraTile/CameraTile';
import useRecordingStore from '../../../api/recording/recordingStore';
import { ReactComponent as SvgClose } from 'utils/app/assets/icons/Close.svg';

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
            <CameraGrid
                viewType={layoutViewType}
                devices={devices}
                menuType="layout"
                isMapVisible={false}
                onTileClick={(index) => handleTileClick(devices[index])}
                selectedPosition={null}
                setIsModalVisible={setIsModalVisible}
                currentDeviceId={null}
                isPreview={false}
                selectedDevices={selectedDevices}
                disableEmptySlots
            />
        </Modal>
    );
};

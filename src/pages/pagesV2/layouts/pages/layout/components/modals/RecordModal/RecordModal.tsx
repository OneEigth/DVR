import { useState } from 'react';
import { Device } from '../../../../../../../../types/Device';
import SelectChecker from '../../../../../../../../utils/shared/components/Select/SelectChecker/SelectChecker';
import { message, Modal } from 'antd';
import CameraGrid from '../../CameraTile/CameraTile';
import useRecordingStore from '../../../api/recording/recordingStore';

export interface RecordModalProps {
    visible: boolean;
    onOk: (selectedDevices: Device[]) => void;
    onCancel: () => void;
    devices: Device[];
    layoutViewType: string;
    title: string;
    type: 'audio' | 'video';
    setIsModalVisible: (visible: boolean) => void;
}

export const RecordModal: React.FC<RecordModalProps> = ({
    visible,
    onCancel,
    devices,
    layoutViewType,
    title,
    type, // 'audio' | 'video'
    setIsModalVisible,
}) => {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const [selectionMode, setSelectionMode] = useState<'all' | 'select'>('all');
    const startRecording = useRecordingStore((state) => state.startRecording);
    const setIsAudioModalVisible = useRecordingStore((state) => state.setIsAudioModalVisible);
    const setIsVideoModalVisible = useRecordingStore((state) => state.setIsVideoModalVisible);

    const handleTileClick = (device: Device) => {
        if (selectionMode === 'select') {
            const isSelected = selectedDevices.some((d) => d.UID === device.UID);
            if (isSelected) {
                setSelectedDevices(selectedDevices.filter((d) => d.UID !== device.UID));
            } else {
                setSelectedDevices([...selectedDevices, device]);
            }
        }
    };

    const handleOk = () => {
        if (selectionMode === 'select' && selectedDevices.length === 0) {
            message.error('Выберите хотя бы одну камеру');
            return;
        }

        if (selectionMode === 'all') {
            startRecording(type, devices);
        } else {
            startRecording(type, selectedDevices);
        }

        if (type === 'audio') {
            setIsAudioModalVisible(false);
        } else {
            setIsVideoModalVisible(false);
        }
    };

    const handleSelectionModeChange = (value: 'all' | 'select') => {
        setSelectionMode(value);
        if (value === 'all') {
            setSelectedDevices([]); // Сбрасываем выбранные устройства, если выбрано "со всех"
        }
    };

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Начать запись"
            cancelText="Отмена"
        >
            <SelectChecker
                value={selectionMode}
                onChange={(e) => handleSelectionModeChange(e.target.value)}
                options={[
                    { label: 'Со всех', value: 'all' },
                    { label: 'Выбрать с каких', value: 'select' },
                ]}
            />
            <CameraGrid
                viewType={layoutViewType}
                devices={devices}
                menuType="layout"
                isMapVisible={false}
                onTileClick={(index) => handleTileClick(devices[index])}
                setIsModalVisible={setIsModalVisible}
                selectedPosition={null}
                currentDeviceId={null}
                isPreview
                selectedDevices={selectedDevices}
            />
        </Modal>
    );
};

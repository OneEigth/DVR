import { useState } from 'react';
import { Device } from '../../../../../../../../types/Device';
import SelectChecker from '../../../../../../../../utils/shared/components/Select/SelectChecker/SelectChecker';
import { Button, message, Modal } from 'antd';
import CameraGrid from '../../CameraTile/CameraTile';
import useRecordingStore from '../../../api/recording/recordingStore';
import { ReactComponent as SvgClose } from 'utils/app/assets/icons/Close.svg';

import './styles.css';
import { ModalCameraGrid } from '../../ModalCameraGrid/ModalCameraGrid';

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
    const { startRecording, canStartRecording, getDeviceRecordingType } = useRecordingStore();

    const availableDevices = devices.filter((device) => {
        const recordingType = getDeviceRecordingType(device.UID);
        if (type === 'video') {
            // Для видео: доступны камеры без записи или с записью аудио
            return !recordingType || recordingType === 'audio';
        }
        // Для аудио: только камеры без записи
        return !recordingType;
    });

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
        const targetDevices = selectionMode === 'all' ? availableDevices : selectedDevices;

        // if (!canStartRecording(type, targetDevices)) {
        //     message.error('Невозможно начать запись для выбранных устройств');
        //     return;
        // }

        console.log(targetDevices, selectedDevices);

        if (
            (selectionMode === 'select' && targetDevices.length === 0) ||
            (selectionMode === 'select' && selectedDevices.length === 0)
        ) {
            message.error('Выберите хотя бы одну камеру');
            return;
        }

        if (selectionMode === 'select' && selectedDevices.length === 0) {
            message.error('Выберите хотя бы одну камеру');
            return;
        }

        startRecording(type, targetDevices);
        setSelectedDevices([]);
        onCancel();
    };

    const handleSelectionModeChange = (value: 'all' | 'select') => {
        setSelectionMode(value);
        if (value === 'all') {
            // При выборе "со всех" автоматически выбираем все доступные
            setSelectedDevices([...availableDevices]);
        } else {
            // При ручном выборе сбрасываем выбор
            setSelectedDevices([]);
        }
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
            destroyOnClose
            onCancel={onCancel}
            footer={[
                <Button
                    key="ok"
                    className="button-base button-type-primary button-size-medium "
                    onClick={handleOk}
                >
                    Начать запись
                </Button>,
            ]}
        >
            <SelectChecker
                label={'Выберите уст-ва:'}
                value={selectionMode}
                overlayClassName={'record-modal-select-checker-overlay'}
                labelClassName={'record-modal-select-checker-label title medium'}
                onChange={(e) => handleSelectionModeChange(e.target.value)}
                options={[
                    { label: 'со всех', value: 'all' },
                    { label: 'выбрать с каких', value: 'select' },
                ]}
            />
            {/*<CameraGrid*/}
            {/*    viewType={layoutViewType}*/}
            {/*    devices={devices}*/}
            {/*    menuType="layout"*/}
            {/*    isMapVisible={false}*/}
            {/*    onTileClick={(index) => handleTileClick(availableDevices[index])}*/}
            {/*    setIsModalVisible={setIsModalVisible}*/}
            {/*    selectedPosition={null}*/}
            {/*    currentDeviceId={null}*/}
            {/*    isPreview*/}
            {/*    selectedDevices={selectionMode === 'select' ? selectedDevices : []}*/}
            {/*    disableEmptySlots*/}
            {/*    getTileStatus={(device) => {*/}
            {/*        if (!device) return {};*/}
            {/*        const recordingType = getDeviceRecordingType(device.UID);*/}
            {/*        return {*/}
            {/*            // isDisabled: recordingType === 'video',*/}
            {/*            isDisabled: false, // Все устройства в списке уже доступны*/}
            {/*            tooltip: recordingType ? `Текущая запись: ${recordingType}` : undefined,*/}
            {/*            highlight: recordingType ?? undefined,*/}
            {/*            // tooltip: recordingType ? `Идет запись ${recordingType}` : undefined,*/}
            {/*            // highlight: recordingType ? recordingType : undefined,*/}
            {/*        };*/}
            {/*    }}*/}
            {/*/>*/}

            <ModalCameraGrid
                devices={availableDevices}
                selectedDevices={selectionMode === 'all' ? availableDevices : selectedDevices}
                onTileClick={(device) => {
                    if (selectionMode === 'select') {
                        const isSelected = selectedDevices.some((d) => d.UID === device.UID);
                        setSelectedDevices(
                            isSelected
                                ? selectedDevices.filter((d) => d.UID !== device.UID)
                                : [...selectedDevices, device],
                        );
                    }
                }}
                getTileStatus={(device) => {
                    const recordingType = getDeviceRecordingType(device.UID);
                    return {
                        isDisabled: false, // Все устройства в списке уже доступны
                        tooltip: recordingType ? `Текущая запись: ${recordingType}` : undefined,
                        highlight: recordingType ?? undefined,
                    };
                }}
            />

            {/*<CameraGrid*/}
            {/*    viewType={layoutViewType}*/}
            {/*    devices={devices}*/}
            {/*    menuType="layout"*/}
            {/*    isMapVisible={false}*/}
            {/*    onTileClick={(index) => handleTileClick(devices[index])}*/}
            {/*    setIsModalVisible={setIsModalVisible}*/}
            {/*    selectedPosition={null}*/}
            {/*    currentDeviceId={null}*/}
            {/*    isPreview*/}
            {/*    selectedDevices={selectedDevices}*/}
            {/*    disableEmptySlots*/}
            {/*/>*/}
        </Modal>
    );
};

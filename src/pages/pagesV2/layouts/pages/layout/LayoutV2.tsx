import React, { FC, useEffect, useState } from 'react';

import './styles.css';
import { useAuthStore } from '../../../../../store/auth/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Radio } from 'antd';

import { DeleteLayouts } from '../../../../../api/layout/DeleteLayout';
import MainMenu from '../../../../../components/menu/Menu';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { Header } from 'antd/lib/layout/layout';

import ButtonRecordVideo from './components/buttons/buttonForToolBarDeviceOne/ButtonRecordVideo';
import ButtonTakeAPhoto from './components/buttons/buttonForToolBarDeviceOne/ButtonTakeAPhoto';
import ButtonRecordAudio from './components/buttons/buttonForToolBarDeviceOne/ButtonRecordAudio';
import ButtonShowMap from './components/buttons/buttonForToolBarDeviceOne/ButtonShowMap';
import { useLayoutsStore } from './api/layout/useLayoutsStore';
import { useStateNameDevice } from './api/layout/useStateNameDevice';
import { useIsLayoutFormChanged } from './api/layout/useIsLayoutFormChanged';
import CameraGrid from './components/CameraTile/CameraTile';
import LocationMap2 from '../../../../../components/locationMap2/LocationMap2';
import { useSelectedLayout } from '../../../../../store/useSelectedLayout';
import ButtonLayoutViewStyle from './components/buttons/buttonLayout/buttonLayoutViewStyle';
import styled from 'styled-components';
import { UpdateLayouts } from '../../../../../api/layout/UpdateLayout';
import { Device } from '../../../../../types/Device';
import SelectChecker from '../../../../../utils/shared/components/Select/SelectChecker/SelectChecker';
import DevicePositionModal from './components/DevicePosition/DevicePosition';
import useRecordingStore from './api/recording/recordingStore';
import { RecordModal } from './components/modals/RecordModal/RecordModal';
import { RecordingTimers } from './components/RecordingTimers/RecordingTimers';
import { StopRecordingModal } from './components/modals/StopRecordingModal/StopRecordingModal';

interface LayoutV2Props {}

export const showHideOptions = [
    { label: 'Показать', value: '1' },
    { label: 'Скрыть', value: '2' },
];

const LayoutV2: FC<LayoutV2Props> = (props) => {
    const { SmartDVRToken, user } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [isEdit, setIsEdit] = useState(false);
    const { allLayouts, fetchLayouts } = useLayoutsStore();
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();
    const [isMapVisible, setIsMapVisible] = useState(false);
    const { isShowNameDevice, setIsShowNameDevice } = useStateNameDevice();
    const [showModalSelectDevicePhoto, setShowModalSelectDevicePhoto] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [showHide, setShowHide] = useState<'1' | '2'>('1');

    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);

    const { layoutViewType, setLayoutViewType } = useIsLayoutFormChanged();

    const [swapPosition, setSwapPosition] = useState<{
        device: Device;
        index: number;
    } | null>(null);

    const handlePositionChange = (oldIndex: number, newIndex: number) => {
        if (!selectedLayout) return;

        const newDevices = [...selectedLayout.devices];
        // Меняем местами устройства
        [newDevices[oldIndex], newDevices[newIndex]] = [newDevices[newIndex], newDevices[oldIndex]];

        // Обновляем состояние раскладки
        setSelectedLayout({
            ...selectedLayout,
            devices: newDevices,
        });

        // Обновляем локальное состояние devices
        setDevices(newDevices);
    };

    useEffect(() => {
        if (selectedLayout) {
            formLeft.setFieldsValue({ name: selectedLayout.name });
            formRight.setFieldsValue({ description: selectedLayout.description });
        }
    }, [selectedLayout, formLeft, formRight]);

    useEffect(() => {
        if (!selectedLayout) {
            // Fetch or set default layout if necessary
            fetchLayouts(); // or any relevant function to initialize selectedLayout
        }
    }, [selectedLayout, fetchLayouts]);

    useEffect(() => {
        if (!selectedLayout && allLayouts.length > 0) {
            setSelectedLayout(allLayouts[0]);
        }
    }, [allLayouts, selectedLayout, setSelectedLayout]);

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const handleShowMap = async () => {
        setIsMapVisible(!isMapVisible);
    };

    const handleDeleteLayout = async () => {
        if (!selectedLayout?.uid) {
            console.error('No layout selected for deletion.');
            return;
        }

        try {
            if (!SmartDVRToken || !user) {
                console.error('Missing authentication data.');
                return;
            }

            const deleteData = { uid: selectedLayout.uid };

            const response = await DeleteLayouts(SmartDVRToken, user.login, deleteData);

            if (response) {
                console.log('Layout deleted successfully:', response);
                // Обновляем список раскладок
                fetchLayouts();
                localStorage.removeItem('selectedLayout');
                // Сбрасываем выбранную раскладку
                setSelectedLayout(null);
                navigate('/layouts');
            } else {
                console.error('Failed to delete layout.');
            }
        } catch (error) {
            console.error('Error during layout deletion:', error);
        }
    };

    const handleTakeAPhoto = async () => {
        setShowModalSelectDevicePhoto(true);
    };

    const handleBackToAllDevice = () => {
        navigate('/layouts');
    };

    const handleSelectLayoutView = (
        size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4' | '1х7',
    ) => {
        setLayoutViewType(size);
    };

    const getChangedFields = (
        initialValues: { [key: string]: any },
        currentValues: { [key: string]: any },
    ) => {
        const changedFields: { [key: string]: any } = {};
        for (const key in currentValues) {
            if (currentValues[key] !== initialValues[key]) {
                changedFields[key] = currentValues[key];
            }
        }
        return changedFields;
    };

    const handleLayoutSave = async () => {
        setIsEdit(false);
        if (user?.login) {
            try {
                const valuesLeft = await formLeft.validateFields();
                const valuesRight = await formRight.validateFields();

                const initialValuesLeft = {
                    name: selectedLayout?.name,
                };
                const initialValuesRight = {
                    description: selectedLayout?.description,
                };

                const changedValuesLeft = getChangedFields(initialValuesLeft, valuesLeft);
                const changedValuesRight = getChangedFields(initialValuesRight, valuesRight);

                if (selectedLayout?.uid && SmartDVRToken) {
                    // Проверьте регистр 'uid' или 'UID'
                    const updatedLayoutData = {
                        ...selectedLayout,
                        ...changedValuesLeft,
                        ...changedValuesRight,
                        viewType: layoutViewType,
                    };

                    console.log('Updated Layout Data:', updatedLayoutData);

                    const response = await UpdateLayouts(
                        SmartDVRToken,
                        user.login,
                        updatedLayoutData,
                    );

                    if (response?.success) {
                        messageApi.success('Раскладка успешно обновлена');
                        // setIsLayoutFormChanged(false);
                        setSelectedLayout(updatedLayoutData);

                        navigate('/layout/${selectedLayout.uid}', {
                            state: { layout: updatedLayoutData },
                        });
                    } else {
                        const errorMessage = response?.error || 'Неизвестная ошибка';
                        messageApi.error('Ошибка обновления: ' + errorMessage);
                    }
                } else {
                    messageApi.error('UID или SmartDVRToken отсутствует.');
                }
            } catch (error) {
                console.error('Ошибка валидации или сохранения:', error);
                messageApi.error('Ошибка валидации или сохранения');
            }
        } else {
            messageApi.error('Пользователь не авторизован');
        }
    };

    useEffect(() => {
        if (selectedLayout) {
            setLayoutViewType(selectedLayout.viewType);
        }
    }, [selectedLayout]);

    const setIsAudioModalVisible = useRecordingStore((state) => state.setIsAudioModalVisible);
    const isAudioModalVisible = useRecordingStore((state) => state.isAudioModalVisible);
    const setIsVideoModalVisible = useRecordingStore((state) => state.setIsVideoModalVisible);
    const isVideoModalVisible = useRecordingStore((state) => state.isVideoModalVisible);
    const setIsStopModalVisible = useRecordingStore((state) => state.setIsStopModalVisible);
    const isStopModalVisible = useRecordingStore((state) => state.isStopModalVisible);
    const setStopType = useRecordingStore((state) => state.setStopType);
    const stopType = useRecordingStore((state) => state.stopType);
    const startRecording = useRecordingStore((state) => state.startRecording);
    const stopRecording = useRecordingStore((state) => state.stopRecording);

    const handleStopRecording = (type: 'audio' | 'video') => {
        setStopType(type);
        setIsStopModalVisible(true);
    };

    const { canStartRecording, recordings, getDeviceRecordingType } = useRecordingStore();

    // // Проверяем, все ли устройства заняты видео-записью
    // const allDevicesRecordingVideo = devices.every((device) =>
    //     recordings.some((r) => r.type === 'video' && r.devices.some((d) => d.UID === device.UID)),
    // );
    //
    // // Проверяем, все ли устройства заняты аудио-записью
    // const allDevicesRecordingAudio = devices.every((device) =>
    //     recordings.some((r) => r.type === 'audio' && r.devices.some((d) => d.UID === device.UID)),
    // );

    const canStartVideo = devices.some((device) => {
        const recordingType = getDeviceRecordingType(device.UID);
        return !recordingType || recordingType === 'audio';
    });

    const canStartAudio = devices.some((device) => {
        const recordingType = getDeviceRecordingType(device.UID);
        return !recordingType;
    });

    //     const canStartVideo = canStartRecording('video', devices);
    //     const canStartAudio = canStartRecording('audio', devices);
    //
    // // Проверяем, есть ли хотя бы одно устройство, доступное для записи
    //     const hasDevicesForVideo = devices.some(device => {
    //         const recordingType = getDeviceRecordingType(device.UID);
    //         return !recordingType || recordingType === 'audio';
    //     });
    //
    //     const hasDevicesForAudio = devices.some(device => {
    //         const recordingType = getDeviceRecordingType(device.UID);
    //         return !recordingType;
    //     });

    return (
        <>
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 0,
                        paddingRight: 0,
                    }}
                >
                    <div className="menu">
                        <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem} />
                    </div>
                </Header>
                <div
                    style={{
                        display: 'flex',
                        height: '100vh',
                    }}
                >
                    <div
                        className="layouts"
                        style={{ display: 'flex', padding: 24, flex: 1, overflow: 'hidden' }}
                    >
                        <div
                            className="header_layout"
                            style={{
                                display: 'flex',
                                transition: 'margin-right 0.3s ease', // Плавное появление карты
                                justifyContent: 'space-between',
                                paddingBottom: 8,
                                borderBottom: '1px solid var(--divider-2)',
                                marginBottom: 16,
                            }}
                        >
                            <div className="left_HT">
                                {isEdit ? (
                                    <Button
                                        className="buttonLeft headline small"
                                        icon={<ArrowLeftOutlined />}
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'none',
                                            boxShadow: 'none',
                                        }}
                                        onClick={() => (
                                            setIsEdit(false),
                                            setLayoutViewType(selectedLayout.viewType)
                                        )}
                                    >
                                        Раскладка: режим редактирования
                                    </Button>
                                ) : (
                                    <Button
                                        className="buttonLeft headline small"
                                        icon={<ArrowLeftOutlined />}
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'none',
                                            boxShadow: 'none',
                                        }}
                                        onClick={handleBackToAllDevice}
                                    >
                                        Раскладка
                                    </Button>
                                )}
                            </div>

                            <div className="right_HT">
                                {isEdit ? (
                                    <ButtonLayoutViewStyle
                                        onFilterButtonClick={handleSelectLayoutView}
                                        activeButton={layoutViewType}
                                    />
                                ) : (
                                    <div className="rightSideToolBar">
                                        <ButtonRecordVideo
                                            onClick={() => setIsVideoModalVisible(true)}
                                            disabled={!canStartVideo}
                                        />
                                        <ButtonTakeAPhoto onClick={handleTakeAPhoto} />
                                        <ButtonRecordAudio
                                            onClick={() => setIsAudioModalVisible(true)}
                                            disabled={!canStartAudio}
                                        />
                                        {/*<ButtonRecordVideo*/}
                                        {/*    onClick={() => setIsVideoModalVisible(true)}*/}
                                        {/*/>*/}
                                        {/*<ButtonTakeAPhoto onClick={handleTakeAPhoto} />*/}
                                        {/*<ButtonRecordAudio*/}
                                        {/*    onClick={() => setIsAudioModalVisible(true)}*/}
                                        {/*/>*/}
                                        <ButtonShowMap
                                            onClick={handleShowMap}
                                            isMapVisible={isMapVisible}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            className="body_layouts"
                            style={{
                                flex: 1,
                                overflow: 'hidden',
                                // display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {selectedLayout ? (
                                <div
                                    style={{
                                        flex: 1,
                                        // display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <CameraGrid
                                        viewType={layoutViewType}
                                        devices={devices}
                                        menuType={isEdit ? 'edit' : 'layout'}
                                        isMapVisible={isMapVisible}
                                        setIsModalVisible={setIsModalVisible}
                                        onTileClick={(index) => {
                                            if (isEdit) {
                                                setSelectedDevice(selectedLayout?.devices[index]);
                                                // setIsModalVisible(true);
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <p>Раскладка не выбрана</p>
                            )}
                        </div>

                        <div
                            className="description_layout"
                            style={{
                                display: 'flex',
                                gap: '16px', // Отступ между элементами
                                width: '100%', // Занимает всю ширину
                                marginTop: 24,
                            }}
                        >
                            {/* Группа слева */}
                            <Form
                                form={formLeft}
                                className="form"
                                name="description-layout-form"
                                // labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                style={{
                                    display: 'flex',
                                    gap: '16px', // Отступ между Form.Item
                                    width: '100%', // Занимает всю ширину
                                    flexDirection: 'row',
                                }}
                                initialValues={{ name: selectedLayout?.name || '' }}
                            >
                                <Form.Item
                                    label={
                                        <span className="inputLabel title medium">Название</span>
                                    }
                                    name="name"
                                    style={{
                                        flex: 1, // Занимает равное пространство
                                        margin: 0, // Убираем margin от antd
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста, введите Название',
                                        },
                                    ]}
                                >
                                    <Input className="input" disabled />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <span className="inputLabel title medium">Описание</span>
                                    }
                                    name="description"
                                    style={{
                                        flex: 1, // Занимает равное пространство
                                        margin: 0, // Убираем margin от antd
                                    }}
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Пожалуйста, введите описание',
                                        },
                                    ]}
                                >
                                    <Input className="input" disabled />
                                </Form.Item>
                                {isEdit && (
                                    <Form.Item
                                        label={
                                            <span
                                                className="inputLabel title medium"
                                                style={{
                                                    flex: 1, // Занимает равное пространство
                                                    margin: 0, // Убираем margin от antd
                                                }}
                                            >
                                                Названия устройств
                                            </span>
                                        }
                                        initialValue={showHide}
                                        name="nameOfDevice"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Пожалуйста, введите Название',
                                            },
                                        ]}
                                    >
                                        <SelectChecker
                                            value={showHide}
                                            onChange={(event) =>
                                                setIsShowNameDevice(event.target.value === '1')
                                            }
                                            options={showHideOptions}
                                        />
                                    </Form.Item>
                                )}
                            </Form>
                        </div>

                        <div className="DescButtons_layout">
                            {isEdit ? (
                                <Button
                                    className={'button-base button-size-medium button-type-primary'}
                                    // onClick={handleEditLayout}
                                    onClick={() => handleLayoutSave()}
                                >
                                    Сохранить
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        className={
                                            'button-base button-size-medium button-type-primary'
                                        }
                                        // onClick={handleEditLayout}
                                        onClick={() => setIsEdit(true)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        className={
                                            'button-base button-size-medium button-type-primary button-state-danger'
                                        }
                                        onClick={handleDeleteLayout}
                                    >
                                        Удалить
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    {isMapVisible && (
                        <div
                            style={{
                                // width: 400, // Фиксированная ширина карты
                                // height: '100%', // Карта занимает всю высоту
                                marginTop: 24, // Отступ от камер
                            }}
                        >
                            <div className={'headline small mapText'}>Карта</div>
                            <LocationMap2 devices={selectedLayout?.devices || []} />
                        </div>
                    )}
                </div>
                <DevicePositionModal
                    visible={isModalVisible}
                    onOk={() => setIsModalVisible(false)}
                    onCancel={() => setIsModalVisible(false)}
                    devices={selectedLayout?.devices || []}
                    currentDevice={selectedDevice}
                    setIsModalVisible={setIsModalVisible}
                    onPositionChange={handlePositionChange}
                    currentPosition={devices.findIndex((d) => d.UID === selectedDevice?.UID) + 1}
                    selectedDevices={selectedLayout?.devices.map((d: any) => d.UID) || []}
                    layoutViewType={layoutViewType}
                />

                <RecordModal
                    visible={isAudioModalVisible}
                    onCancel={() => setIsAudioModalVisible(false)}
                    devices={devices}
                    onOk={(selectedDevices) => {
                        startRecording('audio', selectedDevices);
                        setIsAudioModalVisible(false);
                    }}
                    layoutViewType={layoutViewType}
                    title="Запись аудио"
                    type="audio"
                    setIsModalVisible={setIsVideoModalVisible}
                />
                <RecordModal
                    visible={isVideoModalVisible}
                    onCancel={() => setIsVideoModalVisible(false)}
                    devices={devices}
                    onOk={(selectedDevices) => {
                        startRecording('video', selectedDevices);
                        setIsVideoModalVisible(false);
                    }}
                    layoutViewType={layoutViewType}
                    title="Запись видео"
                    type="video"
                    setIsModalVisible={setIsVideoModalVisible}
                />
                <RecordingTimers
                    setIsStopModalVisible={setIsStopModalVisible}
                    setStopType={setStopType}
                />
                <StopRecordingModal
                    visible={isStopModalVisible}
                    onCancel={() => setIsStopModalVisible(false)}
                    devices={devices}
                    layoutViewType={layoutViewType}
                    onOk={(selectedDevices) => {
                        stopRecording(stopType, selectedDevices);
                        setIsStopModalVisible(false);
                    }}
                    setIsModalVisible={setIsStopModalVisible}
                    title={`Остановить запись ${stopType === 'audio' ? 'аудио' : 'видео'}`}
                    type={stopType}
                />
            </div>
        </>
    );
};

export default LayoutV2;

import React, { FC, useEffect, useState } from 'react';

import './styles.css';
import { useAuthStore } from '../../../../../store/auth/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Layout, message, Radio, RadioChangeEvent } from 'antd';

import { DeleteLayouts } from '../../../../../api/layout/DeleteLayout';
import MainMenu from '../../../../../components/menu/Menu';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { Footer, Header } from 'antd/lib/layout/layout';

import ButtonRecordVideo from './components/buttons/buttonForToolBarDeviceOne/ButtonRecordVideo';
import ButtonTakeAPhoto from './components/buttons/buttonForToolBarDeviceOne/ButtonTakeAPhoto';
import ButtonRecordAudio from './components/buttons/buttonForToolBarDeviceOne/ButtonRecordAudio';
import ButtonShowMap from './components/buttons/buttonForToolBarDeviceOne/ButtonShowMap';
import ButtonLayoutEdit from './components/buttons/buttonLayout/LayoutEdit/ButtonLayoutEdit';
import ButtonLayoutDelete from './components/buttons/buttonLayout/LayoutEdit/ButtonLayoutDelete';
import ModalSelectDevice from './components/modals/ModalSelectDevice/ModalSelectDevice';
import ModalSelectDeviceAudio from './components/modals/ModalSelectDeviceAudio/ModalSelectDeviceAudio';
import ModalSelectDevicePhoto from './components/modals/ModalSelectDevicePhoto/ModalSelectDevicePhoto';
import { useLayoutsStore } from './api/layout/useLayoutsStore';
import { useStateNameDevice } from './api/layout/useStateNameDevice';
import { useIsLayoutFormChanged } from './api/layout/useIsLayoutFormChanged';
import CameraGrid from './components/CameraTile/CameraTile';
import LocationMap2 from '../../../../../components/locationMap2/LocationMap2';
import { LayoutType } from '../../../../../types/LayoutType';
import { useSelectedLayout } from '../../../../../store/useSelectedLayout';
import ButtonLayoutViewStyle from './components/buttons/buttonLayout/buttonLayoutViewStyle';
import styled from 'styled-components';
import { UpdateLayouts } from '../../../../../api/layout/UpdateLayout';
import { Device } from '../../../../../types/Device';
import SelectChecker from '../../../../../utils/shared/components/Select/SelectChecker/SelectChecker';
import DevicePositionModal from './components/DevicePosition/DevicePosition';

interface LayoutV2Props {}
const StyledRadioGroup = styled(Radio.Group)`
    display: flex;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
`;

// Стилизация Radio.Button
const StyledRadioButton = styled(Radio.Button)`
    flex: 1;
    text-align: center;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 1.5;
    cursor: pointer;

    &.ant-radio-button-wrapper {
        border-radius: 0;
        border: none;
        box-shadow: none;
    }

    &.ant-radio-button-wrapper-checked {
        background-color: #4d4e65; /* Цвет для выделенной кнопки */
        color: white;

        &:hover {
            background-color: #4d4e65; /* Цвет при наведении на выделенную кнопку */
            color: white; /* Текст остается белым */
        }
    }

    &:not(.ant-radio-button-wrapper-checked) {
        background-color: #cdd0d2; /* Цвет для невыделенных кнопок */
        color: #333;

        &:hover {
            background-color: #4d4e65; /* Цвет при наведении на невыделенную кнопку */
            color: white; /* Текст становится белым */
        }
    }
`;

export const showHideOptions = [
    { label: 'Показать', value: '1' },
    { label: 'Скрыть', value: '2' },
];

const LayoutV2: FC<LayoutV2Props> = (props) => {
    const { SmartDVRToken, user } = useAuthStore();
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [isEdit, setIsEdit] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { allLayouts, fetchLayouts } = useLayoutsStore();
    const [showAddLayoutModal, setShowAddLayoutModal] = useState(false);
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('big');
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();
    const [isMapVisible, setIsMapVisible] = useState(false);
    const { isShowNameDevice, setIsShowNameDevice } = useStateNameDevice();
    const [showModalSelectDevice, setShowModalSelectDevice] = useState(false);
    const [showModalSelectDeviceAudio, setShowModalSelectDeviceAudio] = useState(false);
    const [showModalSelectDevicePhoto, setShowModalSelectDevicePhoto] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [showHide, setShowHide] = useState<'1' | '2'>('1');
    // const [isShowNameDevice, setIsShowNameDevice] = useState(true); // Состояние для управления видимостью заголовков

    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);

    const [newPosition, setNewPosition] = useState<number | null>(null);

    // const {
    //     setIsLayoutFormChanged,
    //     setIsNotSavedModalVisible,
    //     isNotSavedModalVisible,
    //     layoutViewType,
    //     setLayoutViewType,
    // } = useIsLayoutFormChanged();
    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };
    const [selectedType, setSelectedType] = useState(isShowNameDevice ? 'Show' : 'Hide');
    const {
        setIsLayoutFormChanged,
        setIsNotSavedModalVisible,
        isNotSavedModalVisible,
        layoutViewType,
        setLayoutViewType,
    } = useIsLayoutFormChanged();

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

    // const [layoutViewType, setLayoutViewType] = useState<
    //     '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4'
    // >('2x2');

    // const handleSelectLayoutView = (size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4') => {
    //     setLayoutViewType(size);
    // };

    const handleRadioChange = (e: RadioChangeEvent) => {
        const value = e.target.value;
        setSelectedType(value);
        setIsShowNameDevice(value === 'Show');
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

    const handleEditLayout = () => {
        navigate(`/editLayout/${selectedLayout.uid}`);
        console.log(selectedLayout.devices);
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

    const handleRecordVideo = async () => {
        setShowModalSelectDevice(true);
    };

    const handleRecordAudio = async () => {
        setShowModalSelectDeviceAudio(true);
    };

    const handleTakeAPhoto = async () => {
        setShowModalSelectDevicePhoto(true);
    };

    const handleBackToAllDevice = () => {
        navigate('/layouts');
    };

    const handleOkModalSelectDevice = () => {
        setShowModalSelectDevice(false);
    };

    const handleCancelModalSelectDevice = () => {
        setShowModalSelectDevice(false);
    };
    const handleOkModalSelectDevicePhoto = () => {
        setShowModalSelectDevicePhoto(false);
    };
    const handleCancelModalSelectDevicePhoto = () => {
        setShowModalSelectDevicePhoto(false);
    };

    const handleOkModalSelectDeviceAudio = () => {
        setShowModalSelectDeviceAudio(false);
    };

    const handleCancelModalSelectDeviceAudio = () => {
        setShowModalSelectDeviceAudio(false);
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
                                        <ButtonRecordVideo onClick={handleRecordVideo} />
                                        <ButtonTakeAPhoto onClick={handleTakeAPhoto} />
                                        <ButtonRecordAudio onClick={handleRecordAudio} />
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
                                    {/*{selectedLayout.viewType === '2x2' && (*/}
                                    {/*    <CameraGrid2x2*/}
                                    {/*        menuType={'layout'}*/}
                                    {/*        isMapVisible={isMapVisible}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    {/*{selectedLayout.viewType === '1х5' && (*/}
                                    {/*    <CameraGrid1x5*/}
                                    {/*        menuType={'layout'}*/}
                                    {/*        isMapVisible={isMapVisible}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    {/*{selectedLayout.viewType === '3х4' && (*/}
                                    {/*    <CameraGrid3x4*/}
                                    {/*        menuType={'layout'}*/}
                                    {/*        isMapVisible={isMapVisible}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    {/*{selectedLayout.viewType === '3х3' && (*/}
                                    {/*    <CameraGrid3x3*/}
                                    {/*        menuType={'layout'}*/}
                                    {/*        isMapVisible={isMapVisible}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    {/*{selectedLayout.viewType === '2х8' && (*/}
                                    {/*    <CameraGrid2x8*/}
                                    {/*        menuType={'layout'}*/}
                                    {/*        isMapVisible={isMapVisible}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    {/*{selectedLayout.viewType === '1х12' && (*/}
                                    {/*    <CameraGrid1x12*/}
                                    {/*        menuType={'layout'}*/}
                                    {/*        isMapVisible={isMapVisible}*/}
                                    {/*    />*/}
                                    {/*)}*/}
                                    {/*{selectedLayout.viewType === '4х4' && (*/}
                                    {/*    <CameraGrid4x4*/}
                                    {/*        menuType={'layout'}*/}
                                    {/*        isMapVisible={isMapVisible}*/}
                                    {/*    />*/}
                                    {/*)}*/}
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
                                            // className={props.className}
                                            value={showHide}
                                            onChange={(event) =>
                                                setIsShowNameDevice(event.target.value === '1')
                                            }
                                            //     setShowHide(event.target.value);
                                            //     console.log(event.target.value, showHide);
                                            // }}
                                            options={showHideOptions}
                                            // size={'middle'}
                                        />
                                        {/*<div style={{ width: '100%' }}>*/}
                                        {/*    <StyledRadioGroup*/}
                                        {/*        value={selectedType}*/}
                                        {/*        onChange={handleRadioChange}*/}
                                        {/*    >*/}
                                        {/*        <StyledRadioButton value="Show">*/}
                                        {/*            Показать*/}
                                        {/*        </StyledRadioButton>*/}
                                        {/*        <StyledRadioButton value="Hide">*/}
                                        {/*            Скрыть*/}
                                        {/*        </StyledRadioButton>*/}
                                        {/*    </StyledRadioGroup>*/}
                                        {/*</div>*/}
                                    </Form.Item>
                                )}
                            </Form>
                        </div>
                        {/*    <div className="formGroupRight">*/}
                        {/*        /!* Группа справа *!/*/}

                        {/*        <Form*/}
                        {/*            form={formRight}*/}
                        {/*            className="form"*/}
                        {/*            name="basicRight"*/}
                        {/*            labelCol={{ span: 5 }}*/}
                        {/*            wrapperCol={{ span: 19 }}*/}
                        {/*            style={{ maxWidth: '100%' }}*/}
                        {/*            initialValues={{*/}
                        {/*                description: selectedLayout?.description || '',*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <Form.Item*/}
                        {/*                label={<span className="inputLabel">Описание</span>}*/}
                        {/*                name="description"*/}
                        {/*                rules={[*/}
                        {/*                    {*/}
                        {/*                        required: true,*/}
                        {/*                        message: 'Пожалуйста, введите описание',*/}
                        {/*                    },*/}
                        {/*                ]}*/}
                        {/*            >*/}
                        {/*                <Input className="input" disabled />*/}
                        {/*            </Form.Item>*/}
                        {/*        </Form>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

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
                {/*<Footer*/}
                {/*    style={{*/}
                {/*        width: '100%',*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center',*/}
                {/*        paddingLeft: 0,*/}
                {/*        paddingRight: 0,*/}
                {/*        background: 'blue',*/}
                {/*        position: 'relative',*/}
                {/*        bottom: 0,*/}
                {/*        backgroundColor: '#ffffff',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    /!* Ваш футер здесь *!/*/}
                {/*</Footer>*/}
                {/* Модальные окна */}

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

                {/*<DevicePositionModal*/}
                {/*    visible={isModalVisible}*/}
                {/*    onOk={() => {*/}
                {/*        if (newPosition) {*/}
                {/*            handleOk(); // Подтвердить выбор позиции*/}
                {/*        }*/}
                {/*        setIsModalVisible(false);*/}
                {/*    }}*/}
                {/*    onCancel={() => setIsModalVisible(false)}*/}
                {/*    currentPosition={newPosition}*/}
                {/*    onPositionChange={(value) => setNewPosition(value)} // Обновляем состояние позиции*/}
                {/*    selectedDevices={selectedLayout.devices.map((device: Device) => device.UID)} // Передаем список UID устройств*/}
                {/*/>*/}
                <ModalSelectDevice
                    onOk={handleOkModalSelectDevice}
                    onCancel={handleCancelModalSelectDevice}
                    visible={showModalSelectDevice}
                    layoutViewType={layoutViewType}
                />
                <ModalSelectDeviceAudio
                    onOk={handleOkModalSelectDeviceAudio}
                    onCancel={handleCancelModalSelectDeviceAudio}
                    visible={showModalSelectDeviceAudio}
                    layoutViewType={layoutViewType}
                />
                <ModalSelectDevicePhoto
                    onOk={handleOkModalSelectDevicePhoto}
                    onCancel={handleCancelModalSelectDevicePhoto}
                    visible={showModalSelectDevicePhoto}
                    layoutViewType={layoutViewType}
                />
            </div>
        </>
    );
};

export default LayoutV2;

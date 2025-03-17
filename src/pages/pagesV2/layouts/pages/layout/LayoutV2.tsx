import React, { FC, useEffect, useState } from 'react';

import './styles.css';
import { useAuthStore } from '../../../../../store/auth/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Layout } from 'antd';

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

interface LayoutV2Props {}

const LayoutV2: FC<LayoutV2Props> = (props) => {
    const { SmartDVRToken, user } = useAuthStore();
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
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
    const {
        setIsLayoutFormChanged,
        setIsNotSavedModalVisible,
        isNotSavedModalVisible,
        layoutViewType,
        setLayoutViewType,
    } = useIsLayoutFormChanged();
    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };

    // useEffect(() => {
    //     if (selectedLayout) {
    //         localStorage.setItem('selectedLayout', JSON.stringify(selectedLayout));
    //     }
    // }, [selectedLayout]);

    // useEffect(() => {
    //     const loadLayouts = async () => {
    //         if (!selectedLayout) {
    //             const savedLayout = localStorage.getItem('selectedLayout');
    //             if (savedLayout) {
    //                 try {
    //                     const parsedLayout = JSON.parse(savedLayout);
    //                     // Проверяем, существует ли макет в загруженных данных
    //                     if (allLayouts.some((layout) => layout.uid === parsedLayout.uid)) {
    //                         setSelectedLayout(parsedLayout);
    //                     } else {
    //                         localStorage.removeItem('selectedLayout');
    //                         await fetchLayouts();
    //                     }
    //                 } catch (e) {
    //                     console.error('Error parsing saved layout:', e);
    //                 }
    //             } else {
    //                 await fetchLayouts();
    //                 // Устанавливаем первый макет, если есть
    //                 if (allLayouts.length > 0) {
    //                     setSelectedLayout(allLayouts[0]);
    //                 }
    //             }
    //         }
    //     };
    //
    //     loadLayouts();
    // }, [selectedLayout, fetchLayouts, setSelectedLayout, allLayouts]);

    // useEffect(() => {
    //     if (!selectedLayout) {
    //         const savedLayout = localStorage.getItem('selectedLayout');
    //         if (savedLayout) {
    //             setSelectedLayout(JSON.parse(savedLayout));
    //         } else {
    //             fetchLayouts(); // Если данных нет в localStorage, загрузить из API
    //         }
    //     }
    // }, [selectedLayout, fetchLayouts, setSelectedLayout]);

    // useEffect(() => {
    //     if (state?.layout) {
    //         setSelectedLayout(state.layout); // Обновляем состояние
    //     }
    // }, [state, setSelectedLayout]);

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

    // useEffect(() => {
    //     // Загружаем выбранную раскладку из localStorage при инициализации
    //     const savedLayout = localStorage.getItem('selectedLayout');
    //     if (savedLayout) {
    //         try {
    //             const parsedLayout = JSON.parse(savedLayout);
    //             setSelectedLayout(parsedLayout);
    //         } catch (e) {
    //             console.error('Ошибка при парсинге сохраненной раскладки:', e);
    //             localStorage.removeItem('selectedLayout');
    //         }
    //     }
    // }, [setSelectedLayout]);

    // Функция для выбора новой раскладки
    // const handleSelectLayout = (layout: LayoutType) => {
    //     setSelectedLayout(layout); // Это автоматически обновит localStorage благодаря useEffect выше
    // };

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

    console.log(selectedLayout);

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
                                // flex: 1,
                                display: 'flex',
                                // flexDirection: 'column',
                                // marginRight: isMapVisible ? 400 : 0, // Отступ для карты
                                transition: 'margin-right 0.3s ease', // Плавное появление карты

                                // display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: 8,
                                borderBottom: '1px solid var(--divider-2)',
                                marginBottom: 16,
                                // flex: isMapVisible ? 2 : 3, // Левый блок занимает больше пространства при скрытой карте
                                // transition: 'flex 0.3s ease', // Плавное изменение ширины
                            }}
                        >
                            <div className="left_HT">
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
                            </div>

                            {/*<div className="center_LO">
                                    <ButtonLayoutViewStyle onFilterButtonClick={handleSelectLayoutView}/>
                                </div>*/}

                            <div className="right_HT">
                                <div className="rightSideToolBar">
                                    <ButtonRecordVideo onClick={handleRecordVideo} />
                                    <ButtonTakeAPhoto onClick={handleTakeAPhoto} />
                                    <ButtonRecordAudio onClick={handleRecordAudio} />
                                    <ButtonShowMap
                                        onClick={handleShowMap}
                                        isMapVisible={isMapVisible}
                                    />
                                </div>
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
                                        viewType={selectedLayout.viewType}
                                        devices={selectedLayout.devices}
                                        menuType="layout"
                                        isMapVisible={isMapVisible}
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
                                            required: true,
                                            message: 'Пожалуйста, введите описание',
                                        },
                                    ]}
                                >
                                    <Input className="input" disabled />
                                </Form.Item>
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
                            <ButtonLayoutEdit onClick={handleEditLayout} />
                            <ButtonLayoutDelete onClick={handleDeleteLayout} />
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

import React, {useEffect, useState} from 'react';
import MainMenu from "../../../components/menu/Menu";
import {Button, Form, Input, Layout} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useLayoutsStore} from "../../../store/layout/useLayoutsStore";
import ButtonRecordVideo from "../../../components/buttons/buttonForToolBarDeviceOne/ButtonRecordVideo";
import ButtonTakeAPhoto from "../../../components/buttons/buttonForToolBarDeviceOne/ButtonTakeAPhoto";
import ButtonRecordAudio from "../../../components/buttons/buttonForToolBarDeviceOne/ButtonRecordAudio";
import './style.css'
import ButtonShowMap from "../../../components/buttons/buttonForToolBarDeviceOne/ButtonShowMap";
import {useNavigate} from "react-router-dom";
import CameraGrid3x3 from "../../../components/cameraGrid/3х3/cameraGrid3x3";
import LocationMap2 from "../../../components/locationMap2/LocationMap2";
import {useSelectedLayout} from "../../../store/useSelectedLayout";
import CameraGrid1x5 from "../../../components/cameraGrid/1x5/cameraGrid1x5";
import CameraGrid3x4 from "../../../components/cameraGrid/3x4/cameraGrid3x4";
import CameraGrid4x4 from "../../../components/cameraGrid/4x4/cameraGrid4x4";
import CameraGrid2x2 from "../../../components/cameraGrid/2x2/cameraGrid2x2";
import CameraGrid1x12 from "../../../components/cameraGrid/1x12/cameraGrid1x12";
import CameraGrid2x8 from "../../../components/cameraGrid/2х8/cameraGrid2x8";
import {useIsLayoutFormChanged} from "../../../store/layout/useIsLayoutFormChanged";
import ButtonLayoutEdit from "../../../components/buttons/buttonLayout/LayoutEdit/ButtonLayoutEdit";
import ButtonLayoutDelete from "../../../components/buttons/buttonLayout/LayoutEdit/ButtonLayoutDelete";
import { useLocation } from 'react-router-dom';
import {useStateNameDevice} from "../../../store/layout/useStateNameDevice";
import ModalSelectDevice from "../../../components/modals/videoRecord/ModalSelectDevice/ModalSelectDevice";

const {Header, Content, Footer} = Layout;


const LayoutOne: React.FC = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [searchText, setSearchText] = useState('');
    const {allLayouts, fetchLayouts}=useLayoutsStore();
    const [showAddLayoutModal, setShowAddLayoutModal]=useState(false);
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('big');
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();
    const [isMapVisible, setIsMapVisible] = useState(false);
    const {isShowNameDevice, setIsShowNameDevice}=useStateNameDevice();
    const [showModalSelectDevice, setShowModalSelectDevice] = useState(false);
    const {setIsLayoutFormChanged, setIsNotSavedModalVisible, isNotSavedModalVisible, layoutViewType, setLayoutViewType} = useIsLayoutFormChanged();
    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };

    useEffect(() => {
        if (state?.layout) {
            setSelectedLayout(state.layout); // Обновляем состояние
        }
    }, [state, setSelectedLayout]);

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


    const handleAddLayout = () => {
        setShowAddLayoutModal(true)
    };



    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const filteredLayouts = allLayouts.filter(layout =>
        layout.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleTakeAPhoto = async () => {
        /*if(device && device.online){
            // Вызов API для начала записи аудио
            if (SmartDVRToken && user?.login && device.UID) {
                await PhotoRecord(SmartDVRToken, user.login, { UID: device.UID });
                openNotificationEndFR()
            } else {
                console.error('Missing SmartDVRToken, user login or device UID.');
            }} else {
            openNotificationNotOnline();
        }*/

    };
    const handleRecordAudio = async () => {
       /* if(device && device.online){
            setShowAudioRecord(true)
            // Вызов API для начала записи аудио
            if (SmartDVRToken && user?.login && device.UID) {
                await AudioRecordStart(SmartDVRToken, user.login, { UID: device.UID });
                openNotificationStartAR();
            } else {
                console.error('Missing SmartDVRToken, user login or device UID.');
            }} else {
            setShowAudioRecord(false)
            openNotificationNotOnline();
        }*/
    };

    const handleShowMap = async () => {
        /* if(device && device.online){
             setShowAudioRecord(true)
             // Вызов API для начала записи аудио
             if (SmartDVRToken && user?.login && device.UID) {
                 await AudioRecordStart(SmartDVRToken, user.login, { UID: device.UID });
                 openNotificationStartAR();
             } else {
                 console.error('Missing SmartDVRToken, user login or device UID.');
             }} else {
             setShowAudioRecord(false)
             openNotificationNotOnline();
         }*/

        setIsMapVisible(!isMapVisible);
    };

    const handleEditLayout = () => {
        navigate(`/editLayout/${selectedLayout.uid}`);
        console.log(selectedLayout.devices)
    };


    const handleDeleteLayout = () => {

    };

    const handleRecordVideo = async () => {
        setShowModalSelectDevice(true)


       /* if(device && device.online){
            setShowVideoRecord(true)
            // Вызов API для начала записи видео
            if (SmartDVRToken && user?.login && device.UID) {
                await VideoRecordStart(SmartDVRToken, user.login, { UID: device.UID });
                openNotificationStartVR();
            } else {
                console.error('Missing SmartDVRToken, user login or device UID.');
            }} else {
            openNotificationNotOnline();
            setShowVideoRecord(false)
        }*/
    };




    const handleBackToAllDevice = () => {
        navigate('/layouts');
    };

    const initialValuesLeft = {
        name: selectedLayout?.name,
    };

    const initialValuesRight = {
        description: selectedLayout.description
    };

    const handleOkModalSelectDevice = () => {
        setShowModalSelectDevice(false);

    };

    const handleCancelModalSelectDevice = () => {
        setShowModalSelectDevice(false)
    };



    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 0,
                paddingRight: 0
            }}>
                <div className="menu">
                    <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
                </div>
            </Header>

            <Layout>

                <Layout>
                    <Content style={{
                        overflowX: 'auto',
                        background: '#ffffff',
                        flex: 1,
                        padding: '16px'
                    }}>
                        <div className="layouts">
                            <div className="header_layout">

                                <div className="left_HT">
                                    <Button className="buttonLeft" icon={<ArrowLeftOutlined/>} style={{border: 'none'}}
                                            onClick={handleBackToAllDevice}>Раскладка</Button>
                                </div>

                                {/*<div className="center_LO">
                                    <ButtonLayoutViewStyle onFilterButtonClick={handleSelectLayoutView}/>
                                </div>*/}


                                <div className="right_HT">
                                    <div className="rightSideToolBar">
                                        <ButtonRecordVideo onClick={handleRecordVideo}/>
                                        <ButtonTakeAPhoto onClick={handleTakeAPhoto}/>
                                        <ButtonRecordAudio onClick={handleRecordAudio}/>
                                        <ButtonShowMap onClick={handleShowMap}/>
                                    </div>
                                </div>

                            </div>

                            <div className="body_layouts">
                                {layoutViewType === '2x2' && <CameraGrid2x2 menuType={"layout"}/>}
                                {layoutViewType === '1х5' && <CameraGrid1x5 menuType={"layout"}/>}
                                {layoutViewType === '3х4' && <CameraGrid3x4 menuType={"layout"}/>}
                                {layoutViewType === '3х3' && <CameraGrid3x3 menuType={"layout"}/>}
                                {layoutViewType === '2х8' && <CameraGrid2x8 menuType={"layout"}/>}
                                {layoutViewType === '1х12' && <CameraGrid1x12 menuType={"layout"}/>}
                                {layoutViewType === '4х4' && <CameraGrid4x4  menuType={"layout"}/>}

                                {isMapVisible && (
                                    <LocationMap2 devices={selectedLayout.devices}/>
                                )}
                            </div>

                            <div className="description_layout">
                                <div className="formGroupLeft"> {/* Группа слева */}
                                    <Form
                                        form={formLeft}
                                        className="form"
                                        name="basicLeft"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 18}}
                                        style={{maxWidth: '100%'}}
                                        initialValues={{ name: selectedLayout?.name || '' }}
                                    >
                                        <Form.Item
                                            label={<span className="inputLabel">Название</span>}
                                            name="name"
                                            rules={[{required: true, message: 'Пожалуйста, введите Название'}]}
                                        >
                                            <Input className="input" disabled />
                                        </Form.Item>
                                    </Form>
                                </div>

                                <div className="formGroupRight">
                                    {/* Группа справа */}

                                    <Form
                                        form={formRight}
                                        className="form"
                                        name="basicRight"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 19}}
                                        style={{maxWidth: '100%'}}
                                        initialValues={{ description: selectedLayout?.description || '' }}
                                    >
                                        <Form.Item
                                            label={<span className="inputLabel">Описание</span>}
                                            name="description"
                                            rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
                                        >
                                            <Input className="input" disabled />
                                        </Form.Item>

                                    </Form>
                                </div>
                            </div>

                            <div className="DescButtons_layout">
                                <ButtonLayoutEdit onClick={handleEditLayout}/>
                                <ButtonLayoutDelete onClick={handleDeleteLayout}/>
                            </div>

                        </div>
                    </Content>

                    <Footer style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "blue",
                        position: 'relative',
                        bottom: 0,
                        backgroundColor: '#ffffff'
                    }}>
                        {/* Ваш футер здесь */}
                    </Footer>
                </Layout>
            </Layout>
            {/* Модальные окна */}
            <ModalSelectDevice onOk={handleOkModalSelectDevice} onCancel={handleCancelModalSelectDevice} visible={showModalSelectDevice} layoutViewType={layoutViewType}/>

        </Layout>
    );
};

export default LayoutOne;
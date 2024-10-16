import React, {useState} from 'react';
import MainMenu from "../../../components/menu/Menu";

import {Button, Form, Input, Layout, Radio} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";

import {useLayoutsStore} from "../../../store/layout/useLayoutsStore";

import './style.css'

import {useNavigate} from "react-router-dom";
import CameraGrid3x3 from "../../../components/cameraGrid/cameraGrid3x3";

import LocationMap2 from "../../../components/locationMap2/LocationMap2";
import {useSelectedLayout} from "../../../store/useSelectedLayout";

import ButtonLayoutViewStyle from "../../../components/buttons/buttonLayout/buttonLayoutViewStyle";
import CameraGrid1x5 from "../../../components/cameraGrid/cameraGrid1x5";
import CameraGrid3x4 from "../../../components/cameraGrid/cameraGrid3x4";
import CameraGrid4x4 from "../../../components/cameraGrid/cameraGrid4x4";
import CameraGrid2x2 from "../../../components/cameraGrid/2x2/cameraGrid2x2";
import CameraGrid1x12 from "../../../components/cameraGrid/cameraGrid1x12";
import CameraGrid2x8 from "../../../components/cameraGrid/cameraGrid2x8";

import {useIsLayoutFormChanged} from "../../../store/layout/getLayoutChange";

import ButtonLayoutSave from "../../../components/buttons/buttonLayout/LayoutEdit/ButtonLayoutSave";

const {Header, Content, Footer} = Layout;


const EditLayout: React.FC = () => {

    const navigate = useNavigate();

    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [searchText, setSearchText] = useState('');
    const {allLayouts, fetchLayouts}=useLayoutsStore();
    const [showAddLayoutModal, setShowAddLayoutModal]=useState(false);
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('small');
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [selectedType, setSelectedType] = useState<string>('Show'); // Установка начального значения "Show"


    const {setIsLayoutFormChanged, setIsNotSavedModalVisible, isNotSavedModalVisible, layoutViewType, setLayoutViewType } = useIsLayoutFormChanged();
    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };

    const handleAddLayout = () => {
        setShowAddLayoutModal(true)
    };

    const handleSelectLayoutView = (size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4') => {
        setLayoutViewType(size);
    }

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

    const handleSaveLayout = () => {

    };

    const handleDeleteLayout = () => {

    };

    const handleRecordVideo = async () => {
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


    const handleOkRecordAudio= async ()=>{
        /* if (device && SmartDVRToken && user?.login && device.UID) {
             await AudioRecordEnd(SmartDVRToken, user.login, {UID: device.UID});
             setShowAudioRecord(false)
             openNotificationEndAR();
         } else {
             console.error('Missing SmartDVRToken, user login or device UID.');
         }*/
    }


    const handleOkRecordVideo = async () => {
        /*if (device && SmartDVRToken && user?.login && device.UID) {
            await VideoRecordEnd(SmartDVRToken, user.login, {UID: device.UID});
            setShowVideoRecord(false)
            openNotificationEndVR();
        } else {
            console.error('Missing SmartDVRToken, user login or device UID.');
        }*/
    }

    const handleBackToAllDevice = () => {
        navigate(-1);
    };

    const initialValuesLeft = {
        name: selectedLayout?.name,
    };

    const initialValuesRight = {
        description: selectedLayout.description
    };

    const checkForChanges = () => {
        const valuesLeft = formLeft.getFieldsValue();
        const valuesRight = formRight.getFieldsValue();

        const changedValuesLeft = getChangedFields(initialValuesLeft, valuesLeft);
        const changedValuesRight = getChangedFields(initialValuesRight, valuesRight);

        setIsLayoutFormChanged(Object.keys(changedValuesLeft).length > 0 || Object.keys(changedValuesRight).length > 0);
    };

    const getChangedFields = (initialValues: { [key: string]: any }, currentValues: { [key: string]: any }) => {
        const changedFields: { [key: string]: any } = {};
        for (const key in currentValues) {
            if (currentValues[key] !== initialValues[key]) {
                changedFields[key] = currentValues[key];
            }
        }
        return changedFields;
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

                                <div className="center_LO">
                                    <ButtonLayoutViewStyle onFilterButtonClick={handleSelectLayoutView}/>
                                </div>


                                {/*<div className="right_HT">
                                    <div className="rightSideToolBar">
                                        <ButtonRecordVideo onClick={handleRecordVideo}/>
                                        <ButtonTakeAPhoto onClick={handleTakeAPhoto}/>
                                        <ButtonRecordAudio onClick={handleRecordAudio}/>
                                        <ButtonShowMap onClick={handleShowMap}/>
                                    </div>
                                </div>*/}
                            </div>

                            <div className="body_layouts">
                                {layoutViewType === '2x2' && <CameraGrid2x2/>}
                                {layoutViewType === '1х5' && <CameraGrid1x5/>}
                                {layoutViewType === '3х4' && <CameraGrid3x4/>}
                                {layoutViewType === '3х3' && <CameraGrid3x3/>}
                                {layoutViewType === '2х8' && <CameraGrid2x8/>}
                                {layoutViewType === '1х12' && <CameraGrid1x12/>}
                                {layoutViewType === '4х4' && <CameraGrid4x4/>}

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
                                        labelCol={{span: 4}}
                                        wrapperCol={{span: 20}}
                                        style={{maxWidth: '100%'}}
                                        onValuesChange={checkForChanges}
                                    >
                                        <Form.Item
                                            label={<span className="inputLabel">Название</span>}
                                            name="name"
                                            rules={[{required: true, message: 'Пожалуйста, введите Название'}]}
                                        >
                                            <Input className="input"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={<span className="inputLabel">Названия утройств</span>}
                                            name="nameOfDevice"
                                            rules={[{required: false, message: 'Пожалуйста, введите Название'}]}
                                        >
                                            <Radio.Group value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                                <Radio.Button value="Show" className="RadioGroupButton">
                                                    Показать
                                                </Radio.Button>
                                                <Radio.Button value="Hide" className="RadioGroupButton">
                                                    Скрыть
                                                </Radio.Button>
                                            </Radio.Group>
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
                                        onValuesChange={checkForChanges}
                                    >
                                        <Form.Item
                                            label={<span className="inputLabel">Описание</span>}
                                            name="description"
                                            rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
                                        >
                                            <Input className="input"/>
                                        </Form.Item>

                                    </Form>
                                </div>
                            </div>

                            <div className="DescButtons_layout">
                                <ButtonLayoutSave onClick={handleSaveLayout}/>
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
        </Layout>
    );
};

export default EditLayout;
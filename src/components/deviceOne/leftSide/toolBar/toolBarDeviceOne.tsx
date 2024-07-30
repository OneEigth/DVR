import React, {useEffect, useState} from "react";
import './style.css'
import {Button, notification} from "antd";
import {ArrowLeftOutlined, InfoCircleFilled} from "@ant-design/icons";
import {useBlocker, useNavigate} from "react-router-dom";
import ButtonRecordVideo from "../../../buttons/buttonForToolBarDeviceOne/ButtonRecordVideo";
import ButtonTakeAPhoto from "../../../buttons/buttonForToolBarDeviceOne/ButtonTakeAPhoto";
import ButtonRecordAudio from "../../../buttons/buttonForToolBarDeviceOne/ButtonRecordAudio";
import {useIsFormChanged} from "../../../../store/devices/getDeviceChange";
import NotSavedChanges from "../../../modals/notSavedChanges/NotSavedChanges";
import {Device} from "../../../../types/Device";
import RecordVideoModal from "../../../modals/videoRecord/ModalVideoRecord";
import {useAuthStore} from "../../../../store/auth/auth";
import {VideoRecordStart} from "../../../../api/videoRec/VideoRecStart";
import {AudioRecordStart} from "../../../../api/audioRec/AudioRecStart";
import RecordAudioModal from "../../../modals/audioMadal/ModalAudioRecord";
import {PhotoRecord} from "../../../../api/fotoRec/PhotoRec";
import {VideoRecordEnd} from "../../../../api/videoRec/VideoRecStop";
import {AudioRecordEnd} from "../../../../api/audioRec/AudioRecStop";


interface ToolBarDeviceOneProps{
    device: Device | null;
}
const ToolBarDeviceOne: React.FC<ToolBarDeviceOneProps> = ({device}) => {
    const navigate = useNavigate();
    const {isFormChanged,setIsFormChanged} = useIsFormChanged();
    const [nextLocation, setNextLocation] = useState<string | null>(null);
    const [isNotSavedModalVisible, setIsNotSavedModalVisible] = useState(false);
    const [showVideoRecord, setShowVideoRecord]=useState(false);
    const [showAudioRecord, setShowAudioRecord]=useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { user, SmartDVRToken } = useAuthStore();

    const handleTakeAPhoto = async () => {
        if(device && device.online){
            // Вызов API для начала записи аудио
            if (SmartDVRToken && user?.login && device.UID) {
                await PhotoRecord(SmartDVRToken, user.login, { UID: device.UID });
                openNotificationEndFR()
            } else {
                console.error('Missing SmartDVRToken, user login or device UID.');
            }} else {
            openNotificationNotOnline();
        }

    };
    const handleRecordAudio = async () => {
        if(device && device.online){
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
        }
    };




    const handleRecordVideo = async () => {
        if(device && device.online){
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
        }
    };
    
    const handleOkRecordAudio= async ()=>{
        if (device && SmartDVRToken && user?.login && device.UID) {
            await AudioRecordEnd(SmartDVRToken, user.login, {UID: device.UID});
            setShowAudioRecord(false)
            openNotificationEndAR();
        } else {
            console.error('Missing SmartDVRToken, user login or device UID.');
        }
    }


    const handleOkRecordVideo = async () => {
        if (device && SmartDVRToken && user?.login && device.UID) {
            await VideoRecordEnd(SmartDVRToken, user.login, {UID: device.UID});
            setShowVideoRecord(false)
            openNotificationEndVR();
        } else {
            console.error('Missing SmartDVRToken, user login or device UID.');
        }
    }


    const handleCancelRecordVideo = () => {
    }

    const handleBackToAllDevice = () => {
        navigate(-1);
    };

    const handleOkNotChangedDeiceModal = () => {
        setIsNotSavedModalVisible(false);
        if (nextLocation) {
            navigate(nextLocation); // Переходим по сохраненному адресу
        }
    }

    const handleCancelNotChangedDeiceModal = () => {
        setIsNotSavedModalVisible(false)
        setNextLocation(null);
    }
    console.log("toolbar "+isFormChanged)
    useBlocker((info) => {
        if (isFormChanged) {
            setIsNotSavedModalVisible(true);
            setNextLocation(info.nextLocation.pathname); // Сохраняем следующий адрес для навигации
            return false; // Блокируем навигацию
        }
        return true; // Разрешаем навигацию
    });

    //Окошко уведомления о  записи Видео
    const openNotificationStartAR = () => {
    api.open({
        message: 'Запись файла',
        description:
            `Ведётся запись на "${device?.name}" `,
        duration: 0,
        icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
    });
};

    //Окошко уведомления о  записи Аудио
    const openNotificationStartVR = () => {
        if(device){
        api.open({
            message: 'Запись файла',
            description:
                `Ведётся запись на "${device.name}" `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
        }
    };


    //Окошко уведомления о  сохранении аудио
    const openNotificationEndAR = () => {
        setShowVideoRecord(false)
        api.open({
            message: 'Файл записан',
            description:
                `Сохранено аудио" `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
    };

    //Окошко уведомления о  сохранении Видео
    const openNotificationEndVR = () => {
        setShowVideoRecord(false)
        api.open({
            message: 'Файл записан',
            description:
                `Сохранено видео" `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
    };

    //Окошко уведомления о  сохранении Фото
    const openNotificationEndFR = () => {
        setShowVideoRecord(false)
        api.open({
            message: 'Файл записан',
            description:
                `Сохранено фото" `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
    };

    //Окошко уведомления о невозможности записи Видео
    const openNotificationNotOnline = () => {
        if (device){
        api.open({
            message: 'Запись невозможна',
            description:
                `Запись устройства "${device.name}" невозможна `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
        }
    };


    return (
        <div className="toolBarDeviceOne">
            {contextHolder}
            <div className="leftSideToolBar">
                <Button className="buttonLeft" icon={<ArrowLeftOutlined />} style={{border: 'none'}} onClick={handleBackToAllDevice}>Устройство</Button>
            </div>
            <div className="rightSideToolBar">
                <ButtonRecordVideo onClick={handleRecordVideo}/>
                <ButtonTakeAPhoto onClick={handleTakeAPhoto}/>
                <ButtonRecordAudio onClick={handleRecordAudio}/>
            </div>
            {device && (
                <>
            <NotSavedChanges device={device}
                             onOk={handleOkNotChangedDeiceModal}
                             onCancel={handleCancelNotChangedDeiceModal}
                             visible={isNotSavedModalVisible}
            />
            <RecordVideoModal visible={showVideoRecord}
                              onOk={handleOkRecordVideo}
                              device={device}
                              onCancel={handleCancelRecordVideo}
            />
            <RecordAudioModal visible={showAudioRecord}
                              onOk={handleOkRecordAudio}
                              device={device}
                              onCancel={handleCancelRecordVideo}
            />
                </>
            )}
        </div>
    );
}

export default ToolBarDeviceOne;

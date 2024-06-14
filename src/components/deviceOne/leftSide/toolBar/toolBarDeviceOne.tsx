import React, {useState} from "react";
import './style.css'
import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useBlocker, useNavigate} from "react-router-dom";
import ButtonRecordVideo from "../../../buttons/buttonForToolBarDeviceOne/ButtonRecordVideo";
import ButtonTakeAPhoto from "../../../buttons/buttonForToolBarDeviceOne/ButtonTakeAPhoto";
import ButtonRecordAudio from "../../../buttons/buttonForToolBarDeviceOne/ButtonRecordAudio";
import {useIsFormChanged} from "../../../../store/devices/getDeviceChange";
import NotSavedChanges from "../../../modals/notSavedChanges/NotSavedChanges";
import {Device} from "../../../../types/Device";


interface ToolBarDeviceOneProps{
    device: Device;
}
const ToolBarDeviceOne: React.FC<ToolBarDeviceOneProps> = ({device}) => {
    const navigate = useNavigate();
    const {isFormChanged,setIsFormChanged} = useIsFormChanged();
    const [nextLocation, setNextLocation] = useState<string | null>(null);
    const [isNotSavedModalVisible, setIsNotSavedModalVisible] = useState(false);
    const handleTakeAPhoto = () => {
        // Добавьте здесь логику обработки клика на кнопку "Добавить в раскладку"
    };
    const handleRecordAudio = () => {
        // Добавьте здесь логику обработки клика на кнопку "Добавить в раскладку"
    };

    const handleRecordVideo = () => {
        // Добавьте здесь логику обработки клика на кнопку "Добавить в раскладку"
    };

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

    return (
        <div className="toolBarDeviceOne">
            <div className="leftSideToolBar">
                <Button className="buttonLeft" icon={<ArrowLeftOutlined />} style={{border: 'none'}} onClick={handleBackToAllDevice}>Устройство</Button>
            </div>
            <div className="rightSideToolBar">
                <ButtonRecordVideo onClick={handleRecordVideo}/>
                <ButtonTakeAPhoto onClick={handleTakeAPhoto}/>
                <ButtonRecordAudio onClick={handleRecordAudio}/>
            </div>
            <NotSavedChanges device={device}
                             onOk={handleOkNotChangedDeiceModal}
                             onCancel={handleCancelNotChangedDeiceModal}
                             visible={isNotSavedModalVisible}
            />
        </div>
    );
}

export default ToolBarDeviceOne;

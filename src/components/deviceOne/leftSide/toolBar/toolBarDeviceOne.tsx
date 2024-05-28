import React from "react";
import './style.css'
import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import ButtonRecordVideo from "../../../buttons/buttonForToolBarDeviceOne/ButtonRecordVideo";
import ButtonTakeAPhoto from "../../../buttons/buttonForToolBarDeviceOne/ButtonTakeAPhoto";
import ButtonRecordAudio from "../../../buttons/buttonForToolBarDeviceOne/ButtonRecordAudio";

const ToolBarDeviceOne: React.FC = () => {
    const navigate = useNavigate();
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
        </div>
    );
}

export default ToolBarDeviceOne;

import React from "react";
import {Card} from 'antd';
import {useNavigate} from 'react-router-dom';
import '../../tables/tableDevices/tableDevices/big/style/style.css';
import { VIDEO_PREVIEW_URL} from "../../../const/const";
import IconOnline from "../../icons/iconOnline/IconOnline";
import IconOffline from "../../icons/iconOffline/IconOffline";
import {useSelectedDevice} from "../../../store/devices/SelectedDevice";
import {Device} from "../../../types/Device";
import {useAuthStore} from "../../../store/auth/auth";
import img from './Video.png'

interface CardComponentProps {
    file: Device;
    handleViewVideo: (uid: string) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({file, handleViewVideo}) => {
    const navigate = useNavigate();
    const {setSelectedDevice} = useSelectedDevice();
    const { SmartDVRToken } = useAuthStore.getState();

    const handleDeviceClick = (deviceId: string) => {
        navigate(`/device/${deviceId}`);
        setSelectedDevice(file);

    };

    const handleError = (e:any) => {
        e.target.src = img; // Устанавливаем локальную картинку при ошибке загрузки
    };

    return (
        <div className="containerCardBig" onClick={() => handleDeviceClick(file.UID)}>
            <div className="coverBig">
                <Card
                    className="coverCardBig"
                    key={file.ID}
                    cover={<img alt={''} src={VIDEO_PREVIEW_URL(file.UID,SmartDVRToken)} style={{ borderRadius: 0 }}/>}
                    onError={handleError}
                />
            </div>
            <div className="propertiesBig">
                <h1 className="name">
                    <div className="icon">{file.online ? <IconOnline/> : <IconOffline/>}</div>
                    {file.name}
                </h1>
            </div>

        </div>
    );
}

export default CardComponent;
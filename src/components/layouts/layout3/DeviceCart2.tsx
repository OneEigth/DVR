import React from 'react';
import { Card } from 'antd';
import {Device} from "../../../types/Device";
import './style2.css'
import {VIDEO_PREVIEW_URL} from "../../../const/const";
import IconOnline from "../../icons/iconOnline/IconOnline";
import IconOffline from "../../icons/iconOffline/IconOffline";
import {useAuthStore} from "../../../store/auth/auth";
import img from "./Video.png";

interface deviceCartData {
    device:Device
}
const DeviceCart: React.FC<deviceCartData> = ({device} ) => {
    const { SmartDVRToken } = useAuthStore.getState();

    const handleError = (e:any) => {
        e.target.src = img; // Устанавливаем локальную картинку при ошибке загрузки
    };
    return (
        <div className="containerDeviceLayout">
            <div className="coverDeviceLayout">
                <Card
                    className="DeviceLayout"
                    key={device.ID}
                    cover={<img className="image" alt={''} src={VIDEO_PREVIEW_URL(device.UID, SmartDVRToken)} />}
                    onError={handleError}
                />
            </div>
            <div className="propertiesDeviceLayout">
                <h1 className="nameDeviceLayout">
                    <div className="iconDeviceLayout">{device.online ? <IconOnline/> : <IconOffline/>}</div>
                    <h1 className="deviceName_Layout">{device.name}</h1>
                </h1>
            </div>
        </div>
    );
};

export default DeviceCart;

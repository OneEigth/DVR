import React from 'react';
import { Card } from 'antd';
import {Device} from "../../../types/Device";

import {VIDEO_PREVIEW_URL} from "../../../const/const";
import IconOnline from "../../icons/iconOnline/IconOnline";
import IconOffline from "../../icons/iconOffline/IconOffline";
import {useAuthStore} from "../../../store/auth/auth";
import img from "../../cards/cardComponentBig/Video.png";

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
                    cover={<img alt={''} src={VIDEO_PREVIEW_URL(device.UID, SmartDVRToken)} style={{borderRadius: 0}}/>}
                    onError={handleError}
                />
            </div>
            <div className="propertiesDeviceLayout">
                <h1 className="nameDeviceLayout">
                    <div className="iconDeviceLayout">{device.online ? <IconOnline/> : <IconOffline/>}</div>
                    {device.name}
                </h1>
            </div>
        </div>
    );
};

export default DeviceCart;

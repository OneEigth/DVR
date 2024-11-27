import React from 'react';
import { Card } from 'antd';
import {Device} from "../../../types/Device";
import './style.css'
import {VIDEO_PREVIEW_URL} from "../../../const/const";
import IconOnline from "../../icons/iconOnline/IconOnline";
import IconOffline from "../../icons/iconOffline/IconOffline";
import {useAuthStore} from "../../../store/auth/auth";
import img from "./Video.png";
import {useNavigate} from "react-router-dom";
import {LayoutType} from "../../../types/LayoutType";
import layout from "../../../pages/layouts/Layout/layout";
import {useSelectedLayout} from "../../../store/useSelectedLayout";

interface deviceCartData {
    device:Device;
    layout:LayoutType;
}
const DeviceCart: React.FC<deviceCartData> = ({device,layout} ) => {
    const { SmartDVRToken } = useAuthStore.getState();
    const navigate = useNavigate();
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();


    const handleDeviceClick = (layout: LayoutType) => {
        navigate(`/layout/${layout.uid}`);
        setSelectedLayout(layout);
    };

    const handleError = (e:any) => {
        e.target.src = img; // Устанавливаем локальную картинку при ошибке загрузки
    };
    return (
        <div className="containerDeviceLayout"
             onClick={() => handleDeviceClick(layout)}>
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

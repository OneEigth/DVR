import React, { FC } from 'react';

import './styles.css';
import { useAuthStore } from '../../../../../store/auth/auth';
import { useNavigate } from 'react-router-dom';
import { useSelectedLayout } from '../../../../../store/useSelectedLayout';
import { LayoutType } from '../../../../../types/LayoutType';
import img from '../../../../../components/layouts/camera/Video.png';
import { Card } from 'antd';
import { VIDEO_PREVIEW_URL } from '../../../../../const/const';
import IconOnline from '../../../../../components/icons/iconOnline/IconOnline';
import IconOffline from '../../../../../components/icons/iconOffline/IconOffline';
import { Device } from '../../../../../types/Device';
import { ReactComponent as CircleImg } from 'utils/app/assets/icons/circle.svg';

interface LayoutComponentDeviceProps {
    device: Device;
    layout: LayoutType;
}

const LayoutComponentDevice: FC<LayoutComponentDeviceProps> = ({ device, layout }) => {
    const { SmartDVRToken } = useAuthStore.getState();
    const navigate = useNavigate();
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();

    const handleDeviceClick = (layout: LayoutType) => {
        navigate(`/layout/${layout.uid}`);
        setSelectedLayout(layout);
    };

    const handleError = (e: any) => {
        e.target.src = img; // Устанавливаем локальную картинку при ошибке загрузки
    };
    return (
        <div className="containerDeviceLayout" onClick={() => handleDeviceClick(layout)}>
            <div className="coverDeviceLayout">
                <Card
                    className="DeviceLayout"
                    key={device?.ID}
                    cover={
                        <img
                            className="image"
                            alt={''}
                            src={VIDEO_PREVIEW_URL(device?.UID, SmartDVRToken)}
                        />
                    }
                    onError={handleError}
                />
            </div>
            <div className="propertiesDeviceLayout">
                <span className="nameDeviceLayout">
                    <div className="iconDeviceLayout">
                        {device?.online ? (
                            <CircleImg style={{ fill: '#5ABEA6' }} />
                        ) : (
                            <CircleImg style={{ fill: 'red' }} />
                        )}
                    </div>
                    <span className="deviceName_Layout title large">{device?.name}</span>
                </span>
            </div>
        </div>
    );
};

export default LayoutComponentDevice;

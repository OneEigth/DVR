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
import ButtonAddPlus from '../../../../../components/buttons/buttonAddPlus/ButtonAddPlus';
import { ReactComponent as DeviceImg } from 'utils/app/assets/icons/Device.svg';
import { ReactComponent as UserImg } from 'utils/app/assets/icons/User.svg';
import Tag from '../../../../../utils/shared/components/Tags/Tag';

interface LayoutComponentProps {
    // device: Device;
    layout: LayoutType;
}

const LayoutComponent: FC<LayoutComponentProps> = ({ layout }) => {
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
        <div className="containerLayout" onClick={() => handleDeviceClick(layout)}>
            <div className="coverLayout">
                <Card
                    className="Layout"
                    key={layout?.id}
                    cover={
                        <img
                            className="image imageSmall"
                            alt={''}
                            src={VIDEO_PREVIEW_URL(layout?.devices[0]?.UID, SmartDVRToken)}
                        />
                    }
                    onError={handleError}
                />
            </div>
            <div className="propertiesLayout">
                <span className="nameLayout">
                    <div className={'layoutComponentContainerTitle'}>
                        <span className="Name_Layout title large">{layout?.name}</span>
                        <ButtonAddPlus onClick={() => {}} />
                    </div>

                    <span className={'body medium layoutComponentText'} style={{ marginBottom: 8 }}>
                        {layout.description}
                    </span>
                    <div className={'layoutComponentContainerFlex'}>
                        <span className={'body large layoutComponentText'}>Вид: </span>
                        <Tag state={'default'} border={true}>
                            {layout.viewType}
                        </Tag>
                    </div>
                    <div className={'layoutComponentContainerFlex'}>
                        <UserImg />
                        <span className={'body large layoutComponentText'}>{layout.userName}</span>
                    </div>
                    <div className={'layoutComponentContainerFlex'}>
                        <DeviceImg />
                        <span className={'body large layoutComponentText'}>
                            {layout.devices.length} устройств
                        </span>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default LayoutComponent;

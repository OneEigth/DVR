import React, { FC, useEffect, useRef, useState } from 'react';

import './styles.css';
import { useAuthStore } from '../../../../../store/auth/auth';
import { useNavigate } from 'react-router-dom';
import { useSelectedLayout } from '../../../../../store/useSelectedLayout';
import { LayoutType } from '../../../../../types/LayoutType';
import img from '../../../../../components/layouts/camera/Video.png';
import { Card } from 'antd';
import { VIDEO_PREVIEW_URL } from '../../../../../const/const';
import ButtonAddPlus from '../../../../../components/buttons/buttonAddPlus/ButtonAddPlus';
import Tag from '../../../../../utils/shared/components/Tags/Tag';
import useHasScroll from '../../../../../utils/features/hooks/useHasScroll';

interface LayoutComponentProps {
    // device: Device;
    layout: LayoutType;
}

const LayoutComponent: FC<LayoutComponentProps> = ({ layout }) => {
    const { SmartDVRToken } = useAuthStore.getState();
    const navigate = useNavigate();
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();
    console.log(selectedLayout);
    const handleDeviceClick = (layout: LayoutType) => {
        navigate(`/layout/${layout.uid}`);
        setSelectedLayout(layout);
    };

    const handleError = (e: any) => {
        e.target.src = img; // Устанавливаем локальную картинку при ошибке загрузки
    };

    const { containerRef, hasScroll } = useHasScroll();

    return (
        <div className="containerLayout" onClick={() => handleDeviceClick(layout)}>
            <div className="propertiesLayout">
                <span className="nameLayout">
                    <div className={'layoutComponentContainerTitle'}>
                        <span className="Name_Layout title large">{layout?.name}</span>
                        <ButtonAddPlus onClick={() => {}} />
                    </div>

                    <span
                        className={'body medium layoutComponentText'}
                        style={{ marginBottom: 22 }}
                    >
                        {layout.description}, {layout.viewType}
                    </span>

                    <div className={'layoutComponentContainerFlex'}>
                        <Tag state={'processing'} border={true}>
                            {layout.devices.length} устройств
                        </Tag>
                        <Tag state={'default'} border={true}>
                            {layout.userName}
                        </Tag>
                    </div>
                </span>
            </div>

            <div
                ref={containerRef}
                className={'containerLayoutDeviceImages'}
                style={{ paddingBottom: hasScroll ? '8px' : '0' }}
            >
                {layout?.devices.map((device) => (
                    <div className="coverLayout">
                        <Card
                            className="Layout"
                            key={device?.ID}
                            cover={
                                <img
                                    className="image imageSmall"
                                    alt={''}
                                    src={VIDEO_PREVIEW_URL(device?.UID, SmartDVRToken)}
                                />
                            }
                            onError={handleError}
                        />
                    </div>
                ))}
                {/*{remaining > 0 && <div className="remaining-counter">+{remaining}</div>}*/}
            </div>
        </div>
    );
};

export default LayoutComponent;

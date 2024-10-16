import React from 'react';
import styled from 'styled-components';
import {useAuthStore} from "../../store/auth/auth";
import {useOnlineStateStream} from "../../store/devices/onlineStream";
import {ONLINE_PLAY_URL} from "../../const/const";
import {Device} from "../../types/Device";
import {useSelectedLayout} from "../../store/useSelectedLayout";

/*const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
    width: 100%;
`;

const CameraTile = styled.div`
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;*/

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 458px 458px 458px 458px; /* Ширина колонок */
    grid-template-rows: 180px 180px 180px 180px;    /* Высота строк */
    gap: 10px; /* Отступ между элементами */
    padding: 10px;
    width: 100%;
    height: 100vh; /* Высота контейнера */
`;


const CameraTile = styled.div`
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 100%;
`;

const CameraGrid4x4: React.FC = () => {

    const { user, SmartDVRToken } = useAuthStore();
    const { selectedLayout } = useSelectedLayout();
    // URL для потока видео


    return (
        <GridContainer>
            {Array.from({ length: 16 }).map((_, idx) => {
                const device: Device | undefined = selectedLayout?.devices[idx];
                return (
                <CameraTile key={idx}>
                    {device ? (
                        device.online ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`${ONLINE_PLAY_URL}${device.UID}/${SmartDVRToken}`}
                        scrolling="no"
                        frameBorder="0"
                        style={{borderWidth: '0px'}}
                    >
                    </iframe>
                        ) : (
                            <div>Устройство оффлайн</div>
                        )
                    ) : (
                        <div>+</div>
                    )}
                </CameraTile>
            );
            })}
        </GridContainer>
    );
};

export default CameraGrid4x4;
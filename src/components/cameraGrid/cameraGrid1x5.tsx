import React from 'react';
import styled from 'styled-components';
import {useAuthStore} from "../../store/auth/auth";
import {useOnlineStateStream} from "../../store/devices/onlineStream";
import {ONLINE_PLAY_URL} from "../../const/const";
import {useSelectedLayout} from "../../store/useSelectedLayout";


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 614px 614px 614px 614px; /* Ширина колонок */
    grid-template-rows: 248px 248px 248px 248px;    /* Высота строк */
    gap: 10px; /* Отступ между элементами */
    padding: 10px;
    width: 100%;
    height: 80vh; /* Высота контейнера */
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


const CameraGrid1x5: React.FC = () => {
    const { SmartDVRToken } = useAuthStore();
    const { selectedLayout } = useSelectedLayout();

    // Безопасная проверка на наличие devices
    const devices = selectedLayout?.devices || [];

    return (
        <GridContainer>
            {/* Камера 1 - занимает большую область */}
            <CameraTile style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
                {devices[0] ? (
                    devices[0].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${devices[0].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        />
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 2 */}
            <CameraTile style={{ gridColumn: '3', gridRow: '1 / 2' }}>
                {devices[1] ? (
                    devices[1].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${devices[1].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        />
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 3 */}
            <CameraTile style={{ gridColumn: '3', gridRow: '2 / 3' }}>
                {devices[2] ? (
                    devices[2].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${devices[2].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        />
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 4 */}
            <CameraTile style={{ gridColumn: '1 / 2', gridRow: '3' }}>
                {devices[3] ? (
                    devices[3].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${devices[3].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        />
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 5 */}
            <CameraTile style={{ gridColumn: '2 / 3', gridRow: '3' }}>
                {devices[4] ? (
                    devices[4].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${devices[4].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        />
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 6 */}
            <CameraTile style={{ gridColumn: '3', gridRow: '3' }}>
                {devices[5] ? (
                    devices[5].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${devices[5].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        />
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>
        </GridContainer>
    );
};

export default CameraGrid1x5;

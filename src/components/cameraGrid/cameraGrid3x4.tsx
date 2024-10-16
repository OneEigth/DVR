import React from 'react';
import styled from 'styled-components';
import {ONLINE_PLAY_URL} from "../../const/const";
import {useAuthStore} from "../../store/auth/auth";
import {useOnlineStateStream} from "../../store/devices/onlineStream";
import {useSelectedLayout} from "../../store/useSelectedLayout";

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

const CameraGrid3x4: React.FC = () => {

    const { SmartDVRToken } = useAuthStore();
    const { selectedLayout } = useSelectedLayout();

    return (
        <GridContainer>
            {/* Камера 1 - 648px x 368px */}
            <CameraTile style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
                {selectedLayout?.devices[0] ? (
                    selectedLayout.devices[0].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[0].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        >
                        </iframe>
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 2 - 648px x 368px */}
            <CameraTile style={{ gridColumn: '3 / 5', gridRow: '1 / 3' }}>
                {selectedLayout?.devices[1] ? (
                    selectedLayout.devices[1].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[1].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        >
                        </iframe>
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 3 - 648px x 368px */}
            <CameraTile style={{ gridColumn: '1 / 3', gridRow: '3 / 5' }}>
                {selectedLayout?.devices[2] ? (
                    selectedLayout.devices[2].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[2].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        >
                        </iframe>
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 4 - 320px x 180px */}
            <CameraTile style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }}>
                {selectedLayout?.devices[3] ? (
                    selectedLayout.devices[3].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[3].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        >
                        </iframe>
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 5 - 320px x 180px */}
            <CameraTile style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }}>
                {selectedLayout?.devices[4] ? (
                    selectedLayout.devices[4].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[4].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        >
                        </iframe>
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 6 - 320px x 180px */}
            <CameraTile style={{ gridColumn: '3 / 4', gridRow: '4 / 4' }}>
                {selectedLayout?.devices[5] ? (
                    selectedLayout.devices[5].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[5].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        >
                        </iframe>
                    ) : (
                        <div>Устройство оффлайн</div>
                    )
                ) : (
                    <div>+</div>
                )}
            </CameraTile>

            {/* Камера 7 - 320px x 180px */}
            <CameraTile style={{ gridColumn: '4 / 5', gridRow: '4 / 4' }}>
                {selectedLayout?.devices[6] ? (
                    selectedLayout.devices[6].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[6].UID}/${SmartDVRToken}`}
                            scrolling="no"
                            frameBorder="0"
                            style={{ borderWidth: '0px' }}
                        >
                        </iframe>
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

export default CameraGrid3x4;

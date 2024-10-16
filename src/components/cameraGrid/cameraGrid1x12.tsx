import React from 'react';
import styled from 'styled-components';
import {useAuthStore} from "../../store/auth/auth";
import {useOnlineStateStream} from "../../store/devices/onlineStream";
import {ONLINE_PLAY_URL} from "../../const/const";
import {useSelectedLayout} from "../../store/useSelectedLayout";

/*const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 10px;
    padding: 10px;
    width: 100%;
    height: 100vh; /!* Вы можете изменить высоту по необходимости *!/
`;

const CameraTile = styled.div<{ gridArea?: string }>`
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    grid-area: ${({ gridArea }) => gridArea || 'auto'};
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


const CameraGrid1x12: React.FC = () => {
        const { SmartDVRToken } = useAuthStore();
        const { selectedLayout } = useSelectedLayout();

    return (
        <GridContainer>
            {/* Камера 1 - занимает большую область */}
                <CameraTile style={{gridColumn: '1 / 3', gridRow: '1 / 3'}}>
                    {selectedLayout?.devices[0] ? (
                        selectedLayout.devices[0].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[0].UID}/${SmartDVRToken}`}
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

                {/* Камера 2 */}
                <CameraTile style={{gridColumn: '1', gridRow: '3'}}>
                    {selectedLayout?.devices[1] ? (
                        selectedLayout.devices[1].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[1].UID}/${SmartDVRToken}`}
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

                {/* Камера 3 */}
                <CameraTile style={{gridColumn: '2', gridRow: '3'}}>
                    {selectedLayout?.devices[2] ? (
                        selectedLayout.devices[2].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[2].UID}/${SmartDVRToken}`}
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

                {/* Камера 4 */}
                <CameraTile style={{gridColumn: '1', gridRow: '4'}}>
                    {selectedLayout?.devices[3] ? (
                        selectedLayout.devices[3].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[3].UID}/${SmartDVRToken}`}
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

                {/* Камера 5 */}
                <CameraTile style={{gridColumn: '2', gridRow: '4'}}>
                    {selectedLayout?.devices[4] ? (
                        selectedLayout.devices[4].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[4].UID}/${SmartDVRToken}`}
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

                {/* Камера 6 */}
                <CameraTile style={{gridColumn: '3', gridRow: '1 / 2'}}>
                    {selectedLayout?.devices[5] ? (
                        selectedLayout.devices[5].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[5].UID}/${SmartDVRToken}`}
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

                {/* Камера 7 */}
                <CameraTile style={{gridColumn: '4', gridRow: '1/2'}}>
                    {selectedLayout?.devices[6] ? (
                        selectedLayout.devices[6].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[6].UID}/${SmartDVRToken}`}
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

                {/* Камера 8 */}
                <CameraTile style={{gridColumn: '3', gridRow: '2/3'}}>
                    {selectedLayout?.devices[7] ? (
                        selectedLayout.devices[7].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[7].UID}/${SmartDVRToken}`}
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

                {/* Камера 9 */}
                <CameraTile style={{gridColumn: '4', gridRow: '2'}}>
                    {selectedLayout?.devices[8] ? (
                        selectedLayout.devices[8].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[8].UID}/${SmartDVRToken}`}
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

                {/* Камера 10 */}
                <CameraTile style={{gridColumn: '3', gridRow: '3'}}>
                    {selectedLayout?.devices[9] ? (
                        selectedLayout.devices[9].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[9].UID}/${SmartDVRToken}`}
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

                {/* Камера 11 */}
                <CameraTile style={{gridColumn: '4', gridRow: '3'}}>
                    {selectedLayout?.devices[10] ? (
                        selectedLayout.devices[10].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[10].UID}/${SmartDVRToken}`}
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

                {/* Камера 12 */}
                <CameraTile style={{gridColumn: '3', gridRow: '4'}}>
                    {selectedLayout?.devices[11] ? (
                        selectedLayout.devices[11].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[11].UID}/${SmartDVRToken}`}
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

                {/* Камера 13 */}
                <CameraTile style={{gridColumn: '4', gridRow: '4'}}>
                    {selectedLayout?.devices[12] ? (
                        selectedLayout.devices[12].online ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${ONLINE_PLAY_URL}${selectedLayout.devices[12].UID}/${SmartDVRToken}`}
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

        </GridContainer>
    );
};

export default CameraGrid1x12;

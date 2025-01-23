import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useAuthStore} from "../../../store/auth/auth";
import {ONLINE_PLAY_URL} from "../../../const/const";
import {useSelectedLayout} from "../../../store/useSelectedLayout";
import './style1x12.css'
import {Device} from "../../../types/Device";
import {useStateNameDevice} from "../../../store/layout/useStateNameDevice";
import {useNavigate} from "react-router-dom";
import {Button, Dropdown,  Menu, message,  notification} from "antd";
import {LayoutType} from "../../../types/LayoutType";
import {UpdateLayouts} from "../../../api/layout/UpdateLayout";
import {InfoCircleFilled, MoreOutlined} from "@ant-design/icons";
import {PhotoRecord} from "../../../api/fotoRec/PhotoRec";
import {AudioRecordStart} from "../../../api/audioRec/AudioRecStart";
import {VideoRecordStart} from "../../../api/videoRec/VideoRecStart";
import {AudioRecordEnd} from "../../../api/audioRec/AudioRecStop";
import {VideoRecordEnd} from "../../../api/videoRec/VideoRecStop";
import AddDeviceInLayout from "../../modals/addDeviceInLayout/AddDeviceInLayout";
import RecordVideoModal from "../../modals/videoRecord/ModalVideoRecord";
import RecordAudioModal from "../../modals/audioMadal/ModalAudioRecord";
import DevicePositionModal1x12 from "../../devicePosition/1x12/DevicePosition1x12";
import LocationMap2 from "../../locationMap2/LocationMap2";

const GridContainer = styled.div<{ isMapVisible: boolean }>`
    display: grid;
    /*grid-template-columns: 458px 458px 458px 458px; !* Ширина колонок *!
    grid-template-rows: 180px 180px 180px 180px;    !* Высота строк *!*/
    grid-template-columns: ${({ isMapVisible }) =>
            isMapVisible ? "repeat(4, 1fr) auto" : "repeat(4, 458px )"};
    grid-template-rows: repeat(4, ${({ isMapVisible }) =>
            isMapVisible ? "180px" : "180px"});
    gap: 10px; /* Отступ между элементами */
    padding: 10px;
    width: 100%;
    height: 87vh; /* Высота контейнера */
`;

const CameraTile = styled.div`
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 100%;
    position: relative;
`;
const CameraHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgba(77, 78, 101, 0.25);
    padding: 4px 8px;
    width: calc(100% - 0px); /* Учитывайте отступы */
    z-index: 1;
    
`;

const Circle = styled.div`
    width: 20px;
    height: 20px;
    background-color: white;
    color: black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    margin: 4px;
    z-index: 10;

`;

const DeviceName = styled.span`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    text-align: left;
    color: white; /* Цвет текста */
    
    margin-top: 6px;
`;

const OfflineMessage = styled.div`
    font-size: 18px; /* Размер текста */
    color: white; /* Цвет текста */
    text-align: center; /* Выравнивание текста */
`;

const AddDeviceButton = styled.div`
    font-size: 24px; /* Размер кнопки */
    color: white; /* Цвет текста */
    cursor: pointer; /* Указатель мыши при наведении */
    text-align: center; /* Центрирование текста */
`;

const MapContainer = styled.div`
    grid-column: 5; /* Карта занимает последнюю колонку */
    grid-row: 1 / span 3; /* Карта занимает все строки */
    height: 87vh;
    border-radius: 8px;
    overflow: hidden;
`;

interface CameraGridProps {
    menuType: 'edit' | 'layout';
    isMapVisible:boolean;
}

const CameraGrid1x12: React.FC<CameraGridProps> = ({ menuType ,isMapVisible}) => {

    const { SmartDVRToken, user } = useAuthStore();
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [newPosition, setNewPosition] = useState<number | null>(null);
    const [isAddDeviceModalVisible, setIsAddDeviceModalVisible] = useState(false);
    const [devices, setDevices] = useState<Device[]>(selectedLayout?.devices || []);
    const {isShowNameDevice, setIsShowNameDevice}=useStateNameDevice();
    const navigate = useNavigate();
    const [isNotSavedModalVisible, setIsNotSavedModalVisible] = useState(false);
    const [showVideoRecord, setShowVideoRecord]=useState(false);
    const [showAudioRecord, setShowAudioRecord]=useState(false);
    const [api, contextHolder] = notification.useNotification();

    // Сохранение устройств в localStorage при изменении раскладки
    useEffect(() => {
        if (selectedLayout?.devices) {
            setDevices([...selectedLayout.devices]);
            localStorage.setItem('devices', JSON.stringify(selectedLayout.devices));
        }
    }, [selectedLayout]);

    // Восстановление устройств из localStorage при загрузке компонента
    useEffect(() => {
        const savedDevices = localStorage.getItem('devices');
        if (savedDevices) {
            setDevices(JSON.parse(savedDevices));
        }
    }, []);


    const handleOpenAddDeviceModal = (): void => setIsAddDeviceModalVisible(true);

    const handleCloseAddDeviceModal = (newDevices?: Device[] | null): void => {
        setIsAddDeviceModalVisible(false);

        // Проверяем, что newDevices является массивом, иначе выходим из функции
        if (!Array.isArray(newDevices)) {
            console.warn('newDevices не является массивом или не определен. Используем пустой массив по умолчанию.');
            return; // Выход, если newDevices некорректен
        }

        const updatedDevices: Device[] = [
            ...newDevices.filter((d) => !devices.some((device) => device.UID === d.UID)),
            ...devices,
        ];

        setSelectedLayout((prevLayout: LayoutType | null) =>
            prevLayout ? { ...prevLayout, devices: updatedDevices } : prevLayout
        );
    };

    const handleDeleteDevice = async (deviceUID: string): Promise<void> => {
        if (!selectedLayout?.uid) {
            message.error('Не удалось найти раскладку. Попробуйте обновить страницу.');
            return;
        }

        const updatedDevices: Device[] = devices.filter((d) => d.UID !== deviceUID);
        const data = {
            uid: selectedLayout.uid,
            devices: updatedDevices.map((d) => ({ UID: d.UID })),
        };

        try {
            const response = await UpdateLayouts(SmartDVRToken, user?.login || '', data);
            if (response?.success) {
                setDevices(updatedDevices);
                setSelectedLayout((prevLayout: LayoutType | null) =>
                    prevLayout ? { ...prevLayout, devices: updatedDevices } : prevLayout
                );
                message.success('Устройство успешно удалено!');
            } else {
                message.error('Не удалось удалить устройство.');
            }
        } catch (error) {
            console.error('Ошибка удаления устройства:', error);
            message.error('Произошла ошибка при удалении устройства.');
        }
    };



    const handleMenuClick = (key: string, device: Device, idx: number) => {
        if (menuType === 'edit') {
            if (key === 'edit') {
                setSelectedDevice(device);
                setNewPosition(idx + 1);
                setIsModalVisible(true);
            } else if (key === 'delete') {
                handleDeleteDevice(device.UID);
            }
        } else if (key === 'goToDevice') {
            navigate(`/device/${device.UID}`);
        } else if (key === 'recVideo') {
            setSelectedDevice(device)
            handleRecordVideo();

        } else if (key === 'recAudio') {
            handleRecordAudio();
            setSelectedDevice(device)
        } else if (key === 'takePhoto') {
            handleTakeAPhoto();
            setSelectedDevice(device)
        }
    };

    const menu = (device: Device, idx: number) => (
        <Menu onClick={(e) => handleMenuClick(e.key as string, device, idx)}>
            {menuType === 'edit' ? (
                <>
                    <Menu.Item key="edit">Изменить положение</Menu.Item>
                    <Menu.Item key="delete">
                        <span style={{ color: 'red' }}>Удалить</span>
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="turnOnRadioChat">Включить радиочат</Menu.Item>
                    <Menu.Item key="recVideo">Запись видео</Menu.Item>
                    <Menu.Item key="takePhoto">Сделать фото</Menu.Item>
                    <Menu.Item key="recAudio">Запись аудио</Menu.Item>
                    <Menu.Item key="goToDevice">Перейти к устройству</Menu.Item>
                </>
            )}
        </Menu>
    );


    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedDevice(null);
    };


    //Изменение положения устройства в раскладке
    const handleOk = async () => {
        if (newPosition !== null && selectedDevice) {
            const currentDeviceIndex = devices.findIndex((d) => d.UID === selectedDevice.UID);

            if (currentDeviceIndex !== -1 && currentDeviceIndex !== newPosition - 1) {
                const newDeviceIndex = newPosition - 1;
                const updatedDevices = [...devices];

                // Меняем местами устройства
                const temp = updatedDevices[newDeviceIndex];
                updatedDevices[newDeviceIndex] = updatedDevices[currentDeviceIndex];
                updatedDevices[currentDeviceIndex] = temp;

                // Обновляем локальное состояние
                setDevices(updatedDevices);

                // Создаем данные для обновления раскладки
                const updatedLayoutData = {
                    ...selectedLayout,
                    devices: updatedDevices,
                };

                try {
                    const response = await UpdateLayouts(SmartDVRToken, user?.login || '', updatedLayoutData);

                    if (response?.success) {
                        message.success('Положение устройства успешно изменено!');
                        setSelectedLayout(updatedLayoutData); // Обновляем состояние раскладки
                    } else {
                        message.error('Не удалось сохранить изменения.');
                    }
                } catch (error) {
                    console.error('Ошибка при обновлении раскладки:', error);
                    message.error('Произошла ошибка при сохранении.');
                }
            }
            setIsModalVisible(false); // Закрываем модальное окно
        }
    };

    //Окошко уведомления о  записи Видео
    const openNotificationStartAR = () => {
        api.open({
            message: 'Запись файла',
            description:
                `Ведётся запись на "${selectedDevice?.name}" `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
    };

    //Окошко уведомления о  записи Аудио
    const openNotificationStartVR = () => {
        if(selectedDevice){
            api.open({
                message: 'Запись файла',
                description:
                    `Ведётся запись на "${selectedDevice.name}" `,
                duration: 0,
                icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
            });
        }
    };

    //Окошко уведомления о  сохранении аудио
    const openNotificationEndAR = () => {
        setShowVideoRecord(false)
        api.open({
            message: 'Файл записан',
            description:
                `Сохранено аудио" `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
    };

    //Окошко уведомления о  сохранении Видео
    const openNotificationEndVR = () => {
        setShowVideoRecord(false)
        api.open({
            message: 'Файл записан',
            description:
                `Сохранено видео" `,
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
    };

    //Окошко уведомления о  сохранении Фото
    const openNotificationEndFR = () => {
        console.log("Функция openNotificationEndFR вызвана"); // Лог для проверки
        api.open({
            message: 'Файл записан',
            description: 'Сохранено фото',
            duration: 0,
            icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
        });
    };

    //Окошко уведомления о невозможности записи Видео
    const openNotificationNotOnline = () => {
        if (selectedDevice){
            api.open({
                message: 'Запись невозможна',
                description:
                    `Запись устройства "${selectedDevice.name}" невозможна `,
                duration: 0,
                icon: <InfoCircleFilled style={{ color: '#FDB159' }} />,
            });
        }
    };

    const handleTakeAPhoto = async () => {
        if (!selectedDevice?.online) {
            message.error(`Сделать фото невозможно: устройство ${selectedDevice?.name} оффлайн.`);
            return;
        }

        if (SmartDVRToken && user?.login && selectedDevice?.UID) {
            try {
                const response = await PhotoRecord(SmartDVRToken, user.login, { UID: selectedDevice.UID });

                if (response?.success) {
                    console.log("Уведомление: Сохранено фото успешно"); // Лог для проверки
                    openNotificationEndFR();
                } else {
                    console.error("Ошибка при выполнении PhotoRecord: Уведомление не вызвано");
                    message.error('Ошибка: Не удалось выполнить запись фото.');
                }
            } catch (error) {
                console.error('Ошибка при попытке сделать фото:', error);
                message.error('Не удалось сделать фото из-за ошибки.');
            }
        } else {
            console.error('Не хватает данных для записи фото');
            message.error('Сделать фото невозможно: не хватает данных.');
        }
    };

    const handleRecordAudio = async () => {
        if (!selectedDevice?.online) {
            message.error(`Запись аудио невозможна: устройство ${selectedDevice?.name} оффлайн.`);
            return;
        }

        if (SmartDVRToken && user?.login && selectedDevice?.UID) {
            try {
                setShowAudioRecord(true);
                await AudioRecordStart(SmartDVRToken, user.login, { UID: selectedDevice.UID });
                openNotificationStartAR();
            } catch (error) {
                console.error('Ошибка при попытке начать запись аудио:', error);
                message.error('Не удалось начать запись аудио.');
            }
        } else {
            console.error('Не хватает данных для начала записи аудио');
            message.error('Запись невозможна: не хватает данных.');
        }
    };


    const handleRecordVideo = async () => {
        if (!selectedDevice?.online) {
            message.error(`Запись видео невозможна: устройство ${selectedDevice?.name} оффлайн.`);
            return;
        }

        if (SmartDVRToken && user?.login && selectedDevice?.UID) {
            try {
                setShowVideoRecord(true);
                await VideoRecordStart(SmartDVRToken, user.login, { UID: selectedDevice.UID });
                notification.info({
                    message: 'Запись видео',
                    description: `Запись началась на устройстве "${selectedDevice?.name}".`,
                });
            } catch (error) {
                console.error('Ошибка при попытке начать запись видео:', error);
                message.error('Не удалось начать запись видео.');
            }
        } else {
            console.error('Не хватает данных для начала записи видео');
            message.error('Запись невозможна: не хватает данных.');
        }
    };

    const handleOkRecordAudio= async ()=>{

        if (selectedDevice && SmartDVRToken && user?.login && selectedDevice.UID) {
            await AudioRecordEnd(SmartDVRToken, user.login, {UID: selectedDevice.UID});
            setShowAudioRecord(false)
            openNotificationEndAR();
        } else {
            console.error('Missing SmartDVRToken, user login or device UID.');
        }
    }


    const handleOkRecordVideo = async () => {
        if (selectedDevice && SmartDVRToken && user?.login && selectedDevice.UID) {
            await VideoRecordEnd(SmartDVRToken, user.login, {UID: selectedDevice.UID});
            setShowVideoRecord(false)
            openNotificationEndVR();
        } else {
            console.error('Missing SmartDVRToken, user login or device UID.');
        }
    }
    const handleCancelRecordVideo = () => {
    }

    return (
        <>
            <GridContainer isMapVisible={isMapVisible}>
            {/* Камера 1 - занимает большую область */}
                <CameraTile style={{gridColumn: '1 / 3', gridRow: '1 / 3'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{1}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[0] ? devices[0].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[0] && (
                            <Dropdown overlay={menu(devices[0], 0)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 2 */}
                <CameraTile style={{gridColumn: '1', gridRow: '3'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{2}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[1] ? devices[1].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[0] && (
                            <Dropdown overlay={menu(devices[1], 1)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[1] ? (
                        devices[1].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 3 */}
                <CameraTile style={{gridColumn: '2', gridRow: '3'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{3}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[2] ? devices[2].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[2] && (
                            <Dropdown overlay={menu(devices[2], 2)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[2] ? (
                        devices[2].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 4 */}
                <CameraTile style={{gridColumn: '1', gridRow: '4'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{4}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[3] ? devices[3].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[3] && (
                            <Dropdown overlay={menu(devices[3], 3)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[3] ? (
                        devices[3].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 5 */}
                <CameraTile style={{gridColumn: '2', gridRow: '4'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{5}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[4] ? devices[4].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[0] && (
                            <Dropdown overlay={menu(devices[4], 4)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[4] ? (
                        devices[4].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 6 */}
                <CameraTile style={{gridColumn: '3', gridRow: '1 / 2'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{6}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[5] ? devices[5].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[5] && (
                            <Dropdown overlay={menu(devices[5], 5)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[5] ? (
                        devices[5].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 7 */}
                <CameraTile style={{gridColumn: '4', gridRow: '1/2'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{7}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[6] ? devices[6].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[0] && (
                            <Dropdown overlay={menu(devices[6], 6)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[6] ? (
                        devices[6].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 8 */}
                <CameraTile style={{gridColumn: '3', gridRow: '2/3'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{8}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[7] ? devices[7].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[7] && (
                            <Dropdown overlay={menu(devices[7], 7)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[7] ? (
                        devices[7].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 9 */}
                <CameraTile style={{gridColumn: '4', gridRow: '2'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{9}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[8] ? devices[8].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[8] && (
                            <Dropdown overlay={menu(devices[8], 8)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[8] ? (
                        devices[8].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 10 */}
                <CameraTile style={{gridColumn: '3', gridRow: '3'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{10}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[9] ? devices[9].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[9] && (
                            <Dropdown overlay={menu(devices[9], 9)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[9] ? (
                        devices[9].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 11 */}
                <CameraTile style={{gridColumn: '4', gridRow: '3'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{11}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[10] ? devices[10].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[10] && (
                            <Dropdown overlay={menu(devices[10], 10)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[10] ? (
                        devices[10].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 12 */}
                <CameraTile style={{gridColumn: '3', gridRow: '4'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{12}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[11] ? devices[11].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[11] && (
                            <Dropdown overlay={menu(devices[11], 11)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[11] ? (
                        devices[11].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>

                {/* Камера 13 */}
                <CameraTile style={{gridColumn: '4', gridRow: '4'}}>
                    <CameraHeader>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Circle>{13}</Circle>
                            {isShowNameDevice && (
                                <DeviceName style={{ marginLeft: 8 }}>
                                    {devices[12] ? devices[12].name : 'Нет устройства'}
                                </DeviceName>
                            )}
                        </div>
                        {devices[12] && (
                            <Dropdown overlay={menu(devices[12], 12)} trigger={['click']} placement="bottomRight" arrow>
                                <Button
                                    icon={<MoreOutlined />}
                                    style={{ backgroundColor: '#3E405F', color: 'white', borderColor:'#3E405F' }}
                                />
                            </Dropdown>
                        )}
                    </CameraHeader>
                    {devices[12] ? (
                        devices[12].online ? (
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
                            <OfflineMessage>Устройство оффлайн</OfflineMessage>
                        )
                    ) : (
                        <AddDeviceButton onClick={handleOpenAddDeviceModal}>+</AddDeviceButton>
                    )}
                </CameraTile>
                {isMapVisible && (
                    <MapContainer>
                        <LocationMap2 devices={selectedLayout.devices} />
                    </MapContainer>
                )}
        </GridContainer>
            <DevicePositionModal1x12
                visible={isModalVisible}
                onOk={() => {
                    if (newPosition) {
                        handleOk(); // Подтвердить выбор позиции
                    }
                    setIsModalVisible(false);
                }}
                onCancel={() => setIsModalVisible(false)}
                currentPosition={newPosition}
                onPositionChange={(value) => setNewPosition(value)} // Обновляем состояние позиции
                selectedDevices={devices.map((device) => device.UID)} // Передаем список UID устройств
            />
            <AddDeviceInLayout
                visible={isAddDeviceModalVisible}
                onOk={handleCloseAddDeviceModal}
                onCancel={handleCloseAddDeviceModal}
                layout={selectedLayout!}
                existingDevices={devices.map((device: Device) => device.UID) || []}
            />
            {selectedDevice && (
                <RecordVideoModal
                    visible={showVideoRecord}
                    onOk={handleOkRecordVideo}
                    device={selectedDevice}
                    onCancel={handleCancelRecordVideo}
                />
            )}

            {selectedDevice && (
                <RecordAudioModal
                    visible={showAudioRecord}
                    onOk={handleOkRecordAudio}
                    device={selectedDevice}
                    onCancel={handleCancelRecordVideo}
                />
            )}
        </>
    );
};

export default CameraGrid1x12;


import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ONLINE_PLAY_LAYOUT_URL, ONLINE_PLAY_URL} from "../../../const/const";
import {useAuthStore} from "../../../store/auth/auth";
import {InfoCircleFilled, MoreOutlined} from '@ant-design/icons';
import {useSelectedLayout} from "../../../store/useSelectedLayout";
import {Device} from "../../../types/Device";
import {Button, Dropdown, InputNumber, Menu, message, Modal, notification} from "antd";
import './style2x2.css'
import AddDeviceInLayout from "../../modals/addDeviceInLayout/AddDeviceInLayout";
import {LayoutType} from "../../../types/LayoutType";
import {UpdateLayouts} from "../../../api/layout/UpdateLayout";
import {useStateNameDevice} from "../../../store/layout/useStateNameDevice";
import {useNavigate} from "react-router-dom";
import RecordVideoModal from "../../modals/videoRecord/ModalVideoRecord";
import RecordAudioModal from "../../modals/audioMadal/ModalAudioRecord";
import {AudioRecordEnd} from "../../../api/audioRec/AudioRecStop";
import {VideoRecordEnd} from "../../../api/videoRec/VideoRecStop";
import {AudioRecordStart} from "../../../api/audioRec/AudioRecStart";
import {VideoRecordStart} from "../../../api/videoRec/VideoRecStart";
import {PhotoRecord} from "../../../api/fotoRec/PhotoRec";
import DevicePositionModal from "../../devicePosition/2x2/DevicePosition";
import LocationMap2 from "../../locationMap2/LocationMap2";



const GridContainer = styled.div<{ isMapVisible: boolean }>`
    display: grid;
    grid-template-columns: repeat(2, minmax(720px, 920px)); /* Минимальная и максимальная ширина колонок */
    grid-template-rows: repeat(2, 370px); /* Сохраняем 2 строки */
    gap: 10px; /* Отступ между элементами */
    padding: 10px;
    width: 100%;
    height: 84vh; /* Высота контейнера */
`;


const CameraTile = styled.div`
    background-color: #333;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* Для абсолютного позиционирования нумерации */
    font-size: 24px;
    height: 100%;
`;

const CameraHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #4D4E6540; /* Полупрозрачный фон для улучшения видимости */
    padding: 0;
    border-radius: 0;
    width: 100%;
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
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    text-align: left;
    margin-right: 8px; /* Отступ справа от круга */
    margin-left: 4px;
    margin-top: 6px;
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
interface CameraGridProps {
    menuType: 'edit' | 'layout';
    isMapVisible:boolean;
}

const CameraGrid2x2: React.FC<CameraGridProps>  = ({ menuType,isMapVisible }) => {

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

    const handleCloseAddDeviceModal = (newDevices?: Device[]): void => {
        setIsAddDeviceModalVisible(false);

        if (newDevices) {
            const updatedDevices: Device[] = [
                ...newDevices.filter((d) => !devices.some((device) => device.UID === d.UID)),
                ...devices,
            ];

            setSelectedLayout((prevLayout: LayoutType | null) =>
                prevLayout ? { ...prevLayout, devices: updatedDevices } : prevLayout
            );
        }
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
            {contextHolder}
            <GridContainer isMapVisible>
                {Array.from({ length: 4 }).map((_, idx) => {
                    const device = devices[idx] || null;

                    return (
                        <CameraTile key={device?.UID || idx}>
                            <CameraHeader>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Circle>{idx + 1}</Circle>
                                    {isShowNameDevice && (
                                        <DeviceName style={{ marginLeft: 8 }}>
                                            {device ? device.name : 'Нет устройства'}
                                        </DeviceName>
                                    )}
                                </div>
                                {device && (
                                    <Dropdown overlay={menu(device, idx)} trigger={['click']} placement="bottomRight" arrow>
                                        <Button
                                            icon={<MoreOutlined />}
                                            style={{ backgroundColor: '#3E405F', color: 'white',borderColor:'#3E405F' }}
                                        />
                                    </Dropdown>
                                )}
                            </CameraHeader>
                            {device ? (
                                device.online ? (
                                    <iframe
                                        width={isMapVisible ? "720" : "920"} // Используем min и max ширину в зависимости от isMapVisible
                                        height={isMapVisible ? "170" : "370"} // Аналогично для высоты
                                        src={`${ONLINE_PLAY_LAYOUT_URL}${device.UID}/${SmartDVRToken}`}
                                        scrolling="no"
                                        frameBorder="0"
                                        style={{
                                            borderWidth: '0px',
                                            maxWidth: "920px", // Максимальная ширина
                                            minWidth: "720px", // Минимальная ширина
                                            maxHeight: "370px", // Максимальная высота
                                            minHeight: "170px", // Минимальная высота
                                        }}
                                    />
                                ) : (
                                    <div>Устройство оффлайн</div>
                                )
                            ) : (
                                <div onClick={handleOpenAddDeviceModal} style={{ cursor: 'pointer' }}>
                                    +
                                </div>
                            )}
                        </CameraTile>
                    );
                })}
                {isMapVisible && (
                    <div
                        style={{
                            gridColumn: "3 / span 1", // Карта занимает третью колонку
                            gridRow: "1 / span 2", // Карта занимает обе строки
                            height: "100%",
                        }}
                    >
                        <LocationMap2 devices={selectedLayout.devices} />
                    </div>
                )}
            </GridContainer>

            <DevicePositionModal
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

export default CameraGrid2x2;

import React, {useState} from 'react';
import styled from 'styled-components';
import {ONLINE_PLAY_URL} from "../../../const/const";
import {useAuthStore} from "../../../store/auth/auth";
import { MoreOutlined } from '@ant-design/icons';
import {useSelectedLayout} from "../../../store/useSelectedLayout";
import {Device} from "../../../types/Device";
import {Button, Dropdown, InputNumber, Menu, Modal} from "antd";
import './style2x2.css'



const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 920px 920px ; /* Ширина колонок */
    grid-template-rows: 370px 370px ;    /* Высота строк */
    gap: 10px; /* Отступ между элементами */
    padding: 10px;
    width: 100%;
    height: 100vh; /* Высота контейнера */
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


const CameraGrid2x2: React.FC = () => {

    const { SmartDVRToken } = useAuthStore();
    const { selectedLayout, setSelectedLayout} = useSelectedLayout();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [newPosition, setNewPosition] = useState<number | null>(null);

    // Открытие модального окна с передачей текущей позиции
    const showModal = (device: Device, currentPosition: number) => {
        setSelectedDevice(device);
        setNewPosition(currentPosition + 1); // Устанавливаем текущее положение устройства
        setIsModalVisible(true);
    };

    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedDevice(null);
    };

    // Подтверждение изменения положения устройства
    const handleOk = () => {
        if (newPosition !== null && selectedDevice) {
            // Получаем текущий индекс устройства, которое нужно переместить
            const currentDeviceIndex = selectedLayout?.devices.findIndex(
                (d:Device) => d.UID === selectedDevice.UID
            );

            // Если нашли текущее устройство и новая позиция не равна старой
            if (currentDeviceIndex !== -1 && currentDeviceIndex !== (newPosition - 1)) {
                // Получаем новое место, куда нужно переместить устройство
                const newDeviceIndex = newPosition - 1;

                // Создаем копию массива устройств
                const updatedDevices = [...(selectedLayout?.devices || [])];

                // Меняем местами устройства
                const temp = updatedDevices[newDeviceIndex];
                updatedDevices[newDeviceIndex] = updatedDevices[currentDeviceIndex];
                updatedDevices[currentDeviceIndex] = temp;

                // Обновляем раскладку с новым порядком устройств
                setSelectedLayout({
                    ...selectedLayout,
                    devices: updatedDevices,
                });
            }

            // Закрыть модальное окно
            setIsModalVisible(false);
        }
    };

    // Обработка выбора в меню
    const handleMenuClick = ({ key }: { key: string }, device: Device, currentPosition: number) => {
        if (key === 'edit') {
            showModal(device, currentPosition); // Открыть модальное окно для изменения положения
        } else if (key === 'delete') {
            console.log(`Удалить устройство ${device.name}`);
        }
    };

    const menu = (device: Device, currentPosition: number) => (
        <Menu onClick={(e) => handleMenuClick(e, device, currentPosition)}>
            <Menu.Item key="edit">
                Изменить положение
            </Menu.Item>
            <Menu.Item key="delete">
                <span style={{ color: 'red' }}>Удалить с раскладки</span>
            </Menu.Item>
        </Menu>
    );




    return (
        <>
        <GridContainer>
            {selectedLayout?.devices.map((device : Device, idx : number) => (
                <CameraTile key={device?.UID || idx}>

                        <CameraHeader>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <Circle>{idx + 1}</Circle>
                                <DeviceName>
                                    {device ? device.name : 'Нет устройства'}
                                </DeviceName>
                            </div>

                            <div style={{display: "flex", flexDirection: "row"}}>
                                {device && (
                                    <Dropdown overlay={menu(device, idx)} trigger={['click']} placement="bottomRight" arrow>
                                        <Button
                                            icon={<MoreOutlined/>}
                                            style={{backgroundColor: '#3E405F', color: "white", borderColor: '#3E405F'}}
                                        />
                                    </Dropdown>
                                )}
                            </div>

                        </CameraHeader>
                        {device ? (
                            device.online ? (
                                <iframe
                                    width="920"
                                    height="370"
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
                ))}
        </GridContainer>
            {/* Модальное окно для изменения положения устройства */}
            <Modal
                title="Изменить положение устройства"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Применить"
                cancelText="Отмена"
            >
                <p>Выберите новую позицию для устройства:</p>
                <InputNumber
                    min={1}
                    max={selectedLayout?.devices.length}
                    value={newPosition !== null ? newPosition : undefined} // Преобразование к нужному типу
                    onChange={(value) => setNewPosition(value as number)} // Преобразование значения к числу
                />
            </Modal>
    </>
    );
};

export default CameraGrid2x2;
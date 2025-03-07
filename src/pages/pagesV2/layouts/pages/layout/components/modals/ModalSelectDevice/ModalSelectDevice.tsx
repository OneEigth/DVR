import React, { useState } from 'react';
import {Modal, Button, Switch, Grid, notification, Radio, RadioChangeEvent} from 'antd';
import styled from "styled-components";
import {VideoRecordStartArray} from "../../../../../../../../api/videoRec/videoRecArray/VideoRecStartArray";
import {useAuthStore} from "../../../../../../../../store/auth/auth";
import {VideoRecordEndArray} from "../../../../../../../../api/videoRec/videoRecArray/VideoRecStopArray";
import CameraGrid2x2Small from "../../cameraGridSmall/2x2/cameraGrid2x2Small";
import CameraGrid1x5Small from "../../cameraGridSmall/1x5/cameraGrid1x5Small";
import CameraGrid3x4Small from "../../cameraGridSmall/cameraGrid3x4Small";
import CameraGrid3x3Small from "../../cameraGridSmall/cameraGrid3x3Small";
import CameraGrid2x8Small from "../../cameraGridSmall/cameraGrid2x8Small";
import CameraGrid1x12Small from "../../cameraGridSmall/cameraGrid1x12Small";
import CameraGrid4x4Small from "../../cameraGridSmall/cameraGrid4x4Small";


const { useBreakpoint } = Grid;

// Стилизация Radio.Group
const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 504px;
    height: 32px;
`;

// Стилизация Radio.Button
const StyledRadioButton = styled(Radio.Button)`
    flex: 1;
    /*text-align: center;*/
    border: none;
    padding: 8px 8px ;
    font-size: 14px;
    /*line-height: 1.5;*/
    cursor: pointer;
    font-family: Roboto;
    /*font-size: 14px;*/
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;


    &.ant-radio-button-wrapper {
        border-radius: 0;
        border: none;
        box-shadow: none;
    }

    &.ant-radio-button-wrapper-checked {
        background-color: #4D4E65; /* Цвет для выделенной кнопки */
        color: white;

        &:hover {
            background-color: #4D4E65; /* Цвет при наведении на выделенную кнопку */
            color: white; /* Текст остается белым */
        }
    }

    &:not(.ant-radio-button-wrapper-checked) {
        background-color: #FFFFFF; /* Цвет для невыделенных кнопок */
        color: #333;

        &:hover {
            background-color: #4D4E65; /* Цвет при наведении на невыделенную кнопку */
            color: white; /* Текст становится белым */
        }
    }
`;

interface ModalSelectDeviceProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    layoutViewType: string;
}

const ModalSelectDevice: React.FC<ModalSelectDeviceProps> = ({ visible, onOk, onCancel, layoutViewType }) => {
    const { SmartDVRToken, user } = useAuthStore();
    const [isSelectDevices, setIsSelectDevices] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [isShowNameDevice, setIsShowNameDevice]=useState(false);
    const [selectedType, setSelectType]=useState(isShowNameDevice ? 'All' : 'notAll');

    const handleDeviceSwitch = () => setIsSelectDevices(!isSelectDevices);

    const handleDeviceClick = (UID: string) => {
        setSelectedDevices((prev) =>
            prev.includes(UID) ? prev.filter((id) => id !== UID) : [...prev, UID]
        );
    };

    const handleStartRecording = async () => {

        if (!selectedDevices.length) {
            api.warning({ message: "Не выбраны устройства для записи." });
            return;
        }
        setLoading(true);
        try {
            const userLogin = user?.login || "";
            const response = await VideoRecordStartArray(SmartDVRToken, userLogin, { UID: selectedDevices });
            if (response) {
                api.success({ message: "Запись начата для выбранных устройств." });
            }
        } catch (error: any) {
            api.error({ message: "Ошибка при запуске записи.", description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleStopRecording = async () => {
        if (!selectedDevices.length) {
            api.warning({ message: "Не выбраны устройства для остановки записи." });
            return;
        }
        setLoading(true);
        try {
            const userLogin = user?.login || "";
            const response = await VideoRecordEndArray(SmartDVRToken, userLogin, { UID: selectedDevices });
            if (response) {
                api.success({ message: "Запись завершена для выбранных устройств." });
            }
        } catch (error: any) {
            api.error({ message: "Ошибка при завершении записи.", description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const renderGrid = () => {
        const gridProps = {
            menuType: "layout" as "layout" | "edit", // Приведение типа
            onDeviceClick: handleDeviceClick,
            selectedDevices,
        };

        switch (layoutViewType) {
            case "2x2":
                return <CameraGrid2x2Small {...gridProps} />;
            case "1х5":
                return <CameraGrid1x5Small {...gridProps} />;
            case "3х4":
                return <CameraGrid3x4Small {...gridProps} />;
            case "3х3":
                return <CameraGrid3x3Small {...gridProps} />;
            case "2х8":
                return <CameraGrid2x8Small {...gridProps} />;
            case "1х12":
                return <CameraGrid1x12Small {...gridProps} />;
            case "4х4":
                return <CameraGrid4x4Small {...gridProps} />;
            default:
                return null;
        }
    };

    const handleRadioChange = (e: RadioChangeEvent) => {
        const value = e.target.value;
        setSelectType(value);
    };

    return (
        <>
            {contextHolder}
            <Modal
                visible={visible}
                onCancel={onCancel}
                footer={null}
                title={
                    <span
                        style={{
                            marginBottom:"24px",
                            fontFamily: "Roboto, sans-serif", // Корректный формат для шрифта
                            fontSize: "24px", // Размер шрифта
                            fontWeight: 400, // Значение font-weight без кавычек
                            lineHeight: "32px", // Линейная высота
                            textAlign: "center", // Выравнивание текста
                            textUnderlinePosition: "under", // Корректное значение
                            textDecorationSkipInk: "none", // Корректное значение
                        }}
                    >
            С каких устройств осуществить запись?
        </span>
                }
                className="custom-modal"
                width={720}

                bodyStyle={{
                    height: 495,
                    opacity: 0.9,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
                centered
            >
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span
                        style={{
                            fontFamily: "Roboto", // Название шрифта
                            fontSize: "16px", // Размер шрифта
                            fontWeight: 500, // Жирность шрифта
                            lineHeight: "24px", // Высота строки
                            letterSpacing: "0.15px", // Расстояние между буквами
                            textAlign: "left", // Выравнивание текста
                            textUnderlinePosition: "from-font", // Расположение подчеркивания
                            textDecorationSkipInk: "none", // Отображение декорации
                            color: "#21201F",
                            width:'100%'
                        }}
                    >
                    Выберите уст-ва:
                    </span>
                    {/*<Switch
                        checkedChildren="Со всех"
                        unCheckedChildren="Выбрать с каких"
                        onChange={handleDeviceSwitch}
                        checked={isSelectDevices}
                    />*/}
                    <div style={{width: "100%", display:"flex", justifyContent:"end"}}>
                        <StyledRadioGroup value={selectedType} onChange={handleRadioChange}>
                            <StyledRadioButton value="All">Со всех</StyledRadioButton>
                            <StyledRadioButton value="notAll">Выбрать с каких</StyledRadioButton>
                        </StyledRadioGroup>
                    </div>
                </div>
                <div className="device-grid">{renderGrid()}</div>
                <div style={{display: "flex", gap: "10px", marginTop: "10px", justifyContent:"center"}}>
                    <Button
                        style={{
                            fontFamily: "Roboto", // Название шрифта
                            fontSize: "14px", // Размер шрифта
                            fontWeight: 700, // Жирность шрифта
                            lineHeight: "20px", // Высота строки
                            letterSpacing: "0.25px", // Расстояние между буквами
                            textAlign: "left", // Выравнивание текста
                            textUnderlinePosition: "from-font", // Расположение подчеркивания
                            textDecorationSkipInk: "none", // Отображение декорации
                            color: "#FFFFF", // Цвет текста (исправлено написание)
                        }}
                        onClick={handleStartRecording}
                        loading={loading}
                        disabled={!selectedDevices.length}
                        title="Начать запись выбранных устройств"
                    >
                        Запись
                    </Button>

                </div>
            </Modal>
        </>
    );
};

export default ModalSelectDevice;
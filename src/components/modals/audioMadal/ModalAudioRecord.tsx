import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, message, Modal, notification} from 'antd';
import {useAuthStore} from "../../../store/auth/auth";
import "./arStyle.css"

import {Device} from "../../../types/Device";
import {AudioRecordEnd} from "../../../api/audioRec/AudioRecStop";

interface RecordAudioModal {
    visible: boolean;
    device:Device;
    onOk: () => void;
    onCancel: () => void;
}
const RecordAudioModal: React.FC<RecordAudioModal> = ({ visible,device, onOk, onCancel }) => {

    const { user, SmartDVRToken } = useAuthStore();
    const [messageApi] = message.useMessage();
    const [time, setTime] = useState(0);
    const [isRecording, setIsRecording] = useState(false);

    //Действие завершения аудиозаписи
    const handleOk =async () => {
        // Вызов API для начала записи аудио
        if (SmartDVRToken && user?.login && device.UID) {
            await AudioRecordEnd(SmartDVRToken, user.login, { UID: device.UID });
            onOk()
        } else {
            console.error('Missing SmartDVRToken, user login or device UID.');
        }

    };

    //timer
    const startRecording = () => {
        setTime(0);
        setIsRecording(true);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRecording) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRecording]);

    useEffect(() => {
        if (visible) {
            startRecording();
        } else {
            setIsRecording(false);
            setTime(0);
        }
    }, [visible]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        contentBg: '#4D4E65'
                    },
                },
            }}
        >
            <Modal
                title={false}
                className="videoRec_modal"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                width={360}
                closable={false}
                footer={null}
                bodyStyle={{ padding: 0 }}
            >
                <div className="container-VideoRec">
                    <div className="timerPLace_VR">
                        <div className="timer_VR">
                            {formatTime(time)}
                        </div>
                        <div>
                            <h1 className="h1_vr">Запись аудио</h1>
                        </div>
                    </div>

                    <div className="button_VR">
                        <Button className="buttonStopRecord" onClick={handleOk}>Завершить</Button>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default RecordAudioModal;
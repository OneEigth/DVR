import React from 'react';
import {Button, message, Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import {useAuthStore} from "../../../store/auth/auth";
import {DeleteDeviceOne} from "../../../api/devices/deleteDeviceOne";
import {useNavigate} from "react-router-dom";
import {Device} from "../../../types/Device";
import "./DelDevOne.css"

interface DeleteDeviceProps {
    visible: boolean;
    device:Device;
    onOk: () => void;
    onCancel: () => void;
}
const DeleteDeviceOneModal: React.FC<DeleteDeviceProps> = ({ visible,device, onOk, onCancel }) => {

    const { user, SmartDVRToken } = useAuthStore();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();




    const handleOk = () => {
        if (device && SmartDVRToken && user) {
            const devices = {UID:device.UID};
            DeleteDeviceOne(SmartDVRToken, user.login, devices as any)
                .then((response) => {
                    console.log('Group deleted:', response);
                    if (response?.success) {
                        messageApi.success('Устройство удалено');
                        onOk();
                        navigate('/allcams');

                    } else {
                        const errorMessage = response?.error;

                        if (errorMessage === "in DeviceUpdateByData user is not admin or wrong group") {
                            messageApi.error('У пользователя нет прав на редактирование устройства');
                        } else {
                            messageApi.error('Ошибка обновления: ' + errorMessage);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error deleting group:', error);
                });
        } else {
            console.warn('Group UID, or user is missing');
        }
    };

    return (
        <Modal
            title={
                <div className="titleModal_delDevOne">
                    <span className="spanGroup_delDevOne">Удаление устройства</span>
                    <>
                    <CloseOutlined onClick={onCancel} className="closeBut_Group"/>
                    </>
                </div>
            }
            className="delDevOne_modal"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={720}
            closable={false}
            footer={
                <div className="footerDevOneDelModal">
                    <Button className="buttonNo" onClick={onCancel}>Нет</Button>
                    <Button className="buttonYes" onClick={handleOk}>Да</Button>

                </div>
            }
        >
            <span className="contentText"> Удалить "Устройство {device.name}"? </span>
        </Modal>
    );
};
export default DeleteDeviceOneModal;
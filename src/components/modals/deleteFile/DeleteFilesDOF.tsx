import React from 'react';
import {Button, message, Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import {useAuthStore} from "../../../store/auth/auth";
import "./DelDOF.css"
import {FileDeleteDOF} from "../../../api/file/FileDeleteDOF";

interface DeleteDeviceProps {
    visible: boolean;
    files:{ [key: string]: boolean };
    onOk: () => void;
    onCancel: () => void;
}
const DeleteDeviceOneModal: React.FC<DeleteDeviceProps> = ({ visible,files, onOk, onCancel }) => {

    const { user, SmartDVRToken } = useAuthStore();
    const [messageApi] = message.useMessage();

    const handleOk = () => {
        if (files && SmartDVRToken && user) {
            const filesData = {uid: Object.keys(files)}
            FileDeleteDOF(SmartDVRToken, user.login, filesData as any)
                .then((response) => {
                    console.log('file deleted:', response);
                    if (response?.success) {
                        onOk();
                    } else {
                        const errorMessage = response?.error;

                        if (errorMessage === "in DeviceUpdateByData user is not admin or wrong group") {
                            messageApi.error('У пользователя нет прав на редактирование файлов');
                        } else {
                            messageApi.error('Ошибка обновления: ' + errorMessage);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error deleting group:', error);
                });
        } else {
            console.warn('File UID, or user is missing');
        }
    };

    return (
        <Modal
            title={
                <div className="titleModal_delDevOne">
                    <span className="spanGroup_delDevOne">Удаление файлов</span>
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
            <span className="contentText">
                 Удалить "{Object.entries(files).length} {Object.entries(files).length === 1 ? 'файл' : Object.entries(files).length > 1 && Object.entries(files).length < 5 ? 'файла' : 'файлов'}"?
            </span>
        </Modal>
    );
};
export default DeleteDeviceOneModal;
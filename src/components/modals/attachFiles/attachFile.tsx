import React from 'react';
import {Button, Modal} from 'antd';
import {CloseOutlined, InboxOutlined} from "@ant-design/icons";
import './style.css'
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import {useSelectedFile} from "../../../store/devices/getSelectedFile";
import {FIlE_ATTACH_API_URL} from "../../../const/const";
import {useAuthStore} from "../../../store/auth/auth";


const { Dragger } = Upload;

interface AttachFileProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const AttachFile: React.FC<AttachFileProps> = ({ visible, onOk, onCancel }) => {
    const { user, SmartDVRToken } = useAuthStore();
    const { selectedFile } = useSelectedFile();

    // Убедитесь, что user.login и SmartDVRToken определены, иначе задайте им пустые строки
    const userLogin: string = user?.login ?? '';
    const token: string = SmartDVRToken ?? '';

    if (!selectedFile?.UID) {
        console.error('Selected file UID is missing.');
        return null; // Или сделайте что-то другое в случае отсутствия UID
    }

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: FIlE_ATTACH_API_URL(selectedFile.UID),

        headers: {
            SmartDVRLogin: userLogin,
            SmartDVRToken: token,
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Modal
            title={
                <div className="titleModal_Group">
                    <span className="spanGroup">Прикрепить файлы</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_Group" />
                </div>
            }
            className="newGroup_modal"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={720}
            closable={false}
            footer={
                <>
                    <Button className="buttonAdd" onClick={onOk}>Сохранить</Button>
                </>
            }
        >
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                </p>
            </Dragger>
        </Modal>
    );
};

export default AttachFile;
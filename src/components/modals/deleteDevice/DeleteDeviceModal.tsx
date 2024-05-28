import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import {useAuthStore} from "../../../store/auth/auth";
import {DeleteGroup} from "../../../api/groups/DeleteGroup";
import {useGroupsStore} from "../../../store/groups/Groups";
import {Device} from "../../../types/Device";
import {DeleteDevice} from "../../../api/devices/deleteDevice";
import {Key} from "antd/lib/table/interface";
import {useButtonsFromAllcams} from "../../../store/devices/useButtonsFromAllcams";

interface DeleteDeviceProps {
    visible: boolean;
    device:Key[];
    onOk: () => void;
    onCancel: () => void;
}
const DeleteDeviceModal: React.FC<DeleteDeviceProps> = ({ visible,device, onOk, onCancel }) => {

    const { user, SmartDVRToken } = useAuthStore();
    const {setIsDeleteDeviceModal} = useButtonsFromAllcams();

    const handleOk = () => {
        if (device && SmartDVRToken && user) {
            const devices = {uid:device};
            DeleteDevice(SmartDVRToken, user.login, devices as any)
                .then((response) => {
                    console.log('Group deleted:', response);
                    if (response.success) {
                        onOk(); // Close modal on success
                        setIsDeleteDeviceModal(false);
                    } else {
                        console.error('Error deleting group:', response.error);
                        console.log('Error deleting group:', response.error)
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
                <div className="titleModal_Group">
                    <span className="spanGroup">Удаление устройств</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_Group"/>
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
                    <Button className="buttonAdd" onClick={handleOk}>Сохранить</Button>
                </>
            }
        >
            <span> Удалить {device.length} устройств? </span>

        </Modal>
    );
};
export default DeleteDeviceModal;
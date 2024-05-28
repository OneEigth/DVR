import React, {useEffect} from 'react';
import {Button, Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleDeleteModalGroup.css'
import {useAuthStore} from "../../../store/auth/auth";
import {DeviceByGroupStore} from "../../../store/devices/DeviceByGroupStore";
import {DeleteGroup} from "../../../api/groups/DeleteGroup";
import {Group} from "../../../types/Group";

interface DeleteModalGroupProps {
    visible: boolean;
    group:Group | undefined;
    onOk: () => void;
    onCancel: () => void;
}
const DeleteModalGroup: React.FC<DeleteModalGroupProps> = ({ visible,group, onOk, onCancel }) => {

    const { devicesByStore, fetchDevicesByStore } = DeviceByGroupStore();
    const { user, SmartDVRToken } = useAuthStore();

    useEffect(() => {
        if(user?.login && group?.uid){
            fetchDevicesByStore(group.uid,SmartDVRToken,user.login);
        }}, [group?.uid, fetchDevicesByStore]);

    if (!group) return null;
    const handleOk = () => {
        if (group.uid && SmartDVRToken && user) {
            const groupData = {uid: group.uid};
            DeleteGroup(SmartDVRToken, user.login, groupData)
                .then((response) => {
                    console.log('Group deleted:', response);
                    if (response.success) {
                        onOk(); // Close modal on success
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
                    <span className="spanGroup">Удаление группы</span>
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
                    <Button className="buttonAdd" onClick={handleOk}>Да</Button>
                    <Button className="buttonAdd" onClick={onCancel}>Нет</Button>
                </>
            }
        >
            {devicesByStore.length>0 ? (
            <span>Удалить "{group.name}"? В ней находятся {devicesByStore.length} устройства, при удалении группы они перенесутся в папку "Несортированные"</span>
                ) : (
            <span> Подвердите удаление {group.name} </span>
            )}
        </Modal>
    );
};
export default DeleteModalGroup;
import React from 'react';
import {Button, Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import {useAuthStore} from "../../../../store/auth/auth";
import {DeleteDevice} from "../../../../api/devices/deleteDevice";
import {Key} from "antd/lib/table/interface";
import {useButtonsFromAllcams} from "../../../../store/devices/useButtonsFromAllcams";
import {DeleteUser} from "../../../../api/users/deleteUsers";

interface DeleteDeviceProps {
    visible: boolean;
    users:Key[];
    onOk: () => void;
    onCancel: () => void;
}
const DeleteUserModal: React.FC<DeleteDeviceProps> = ({ visible,users, onOk, onCancel }) => {

    const { user, SmartDVRToken } = useAuthStore();
    //const {setIsDeleteDeviceModal} = useButtonsFromAllcams();

    const handleOk = () => {
        if (users && SmartDVRToken && user) {
            const usersData = {uid:users};
            DeleteUser(SmartDVRToken, user.login, usersData as any)
                .then((response) => {
                    console.log('User deleted:', response);
                    if (response.success) {
                        onOk(); // Close modal on success
                       // setIsDeleteDeviceModal(false);
                    } else {
                        console.error('Error deleting user:', response.error);
                        console.log('Error deleting user:', response.error)
                    }
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                });
        } else {
            console.warn('date is missing');
        }
    };

    const handleOnCancel = () => {
        onCancel()
    }

    return (
        <Modal
            title={
                <div className="titleUser">
                    <span className="spanUser">Удаление пользователей</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_User"/>
                </div>
            }
            className="newUser_modal"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={720}
            closable={false}
            footer={
                <>
                    <Button className="buttonYes" onClick={handleOnCancel}>Нет</Button>
                    <Button className="buttonNo" onClick={handleOk}>Да</Button>
                </>
            }
        >
            <span> Удалить {users.length} пользователей? </span>

        </Modal>
    );
};
export default DeleteUserModal;
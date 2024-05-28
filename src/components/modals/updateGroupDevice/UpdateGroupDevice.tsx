import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleDeleteModalGroup.css'
import {useAuthStore} from "../../../store/auth/auth";
import {DeleteGroup} from "../../../api/groups/DeleteGroup";
import {Group} from "../../../types/Group";
import {useGroupsStore} from "../../../store/groups/Groups";
import {UpdateGroup} from "../../../api/groups/UpdateGroup";

const { Option } = Select;
interface DeleteModalGroupProps {
    visible: boolean;
    group:Group | undefined;
    onOk: () => void;
    onCancel: () => void;
}
const UpdateGroupDevice: React.FC<DeleteModalGroupProps> = ({ visible,group, onOk, onCancel }) => {

    const { user, SmartDVRToken } = useAuthStore();
    const { groups, fetchGroups } = useGroupsStore();
    const [parentUid, setParentUid] = useState<string | undefined>(undefined); // Состояние для выбранной группы


    useEffect(() => {
        if (groups.length === 0) {
            fetchGroups();
        }
    }, [fetchGroups, groups.length]);

    if (!group) return null;

    const handleParentUidChange = (value: string) => {
        setParentUid(value);
    };
    const handleOk = () => {
        if (group.uid && SmartDVRToken && user) {
            const groupData = {uid: group.uid, groupUID:group.uid};
            //todo поменять на updateDevice
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
                    <span className="spanGroup">Редактировать устройства</span>
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
            <Form.Item
                className="form_Group"
                label={<span className="inputLabel_Group">Путь</span>}
                name="parent_uid"
                required={false}
            >
                <Select

                    className="selectGroup"
                    placeholder="Введите название или выберите из списка"
                    onChange={handleParentUidChange}
                    maxCount={1}
                >
                    {/* Отображаем группы как опции выбора */}
                    {groups.map(group => (
                        <Option key={group.uid} value={group.uid}>{group.name}</Option>
                    ))}
                </Select>
            </Form.Item>



        </Modal>
    );
};
export default UpdateGroupDevice;
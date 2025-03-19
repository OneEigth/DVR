import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button,  Form,  Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleEditDeviceGroup.css'
import {useGroupsStore} from "../../../store/groups/Groups";
import {Group} from "../../../types/Group";
import {useAuthStore} from "../../../store/auth/auth";
import {getGroupEditDevice} from "../../../api/devices/getEditDeviceGroup";
import {Key} from "antd/lib/table/interface";
import {useButtonsFromAllcams} from "../../../store/devices/useButtonsFromAllcams";
import { message } from 'antd';

const { Option } = Select;
interface NewGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    device:Key[];

}
const NewGroupModal: React.FC<NewGroupModalProps> = ({ visible, onOk, onCancel, device }) => {

    const { groups, fetchGroups } = useGroupsStore();
    const { user, SmartDVRToken } = useAuthStore();
    const [groupUID, setGroupUID]=useState<string | undefined>(undefined);
    const {setIsEditDeviceGroupModal} =useButtonsFromAllcams();


    useEffect(() => {
        if (visible && groups.length === 0) {
            fetchGroups();
        }
    }, [visible, fetchGroups, groups.length]);

    const handleParentUidChange = (value: string) => {
        setGroupUID(value);
    };

    const getAllSubGroups = useCallback((group: Group): Group[] => {
        let subGroups: Group[] = [];
        group.sub_groups.forEach(subGroup => {
            subGroups.push(subGroup);
            if (subGroup.sub_groups.length > 0) {
                subGroups = [...subGroups, ...getAllSubGroups(subGroup)];
            }
        });
        return subGroups;
    }, []);

    // Объединяем группы и подгруппы в один массив
    const allGroups = useMemo(() => {
        let result: Group[] = [];
        groups.forEach(group => {
            result.push(group);
            if (group.sub_groups) {
                result = [...result, ...getAllSubGroups(group)];
            }
        });
        return result;
    }, [groups, getAllSubGroups]);


    const handleOk = async () => {
        if (!groupUID) {
            message.error("Выберите группу!");
            return;
        }
        if (!user) {
            message.error("Ошибка авторизации!");
            return;
        }

        const groupData = { group_uid: groupUID, uid: device };

        try {
            const response = await getGroupEditDevice(SmartDVRToken, user.login, groupData as any);

            if (response.success) {
                message.success("Группа устройств успешно обновлена!");
                setIsEditDeviceGroupModal(false);
                onOk();
            } else {
                message.error(`Ошибка: ${response.error}`);
            }
        } catch (error) {
            message.error("Ошибка при обновлении группы устройств!");
            console.error('Error updating group:', error);
        }
    };


    return (
        <Modal
            title={
                <div className="titleModal_Group">
                    <span className="spanGroup">Редактировать устройства</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_GroupEdit"/>
                </div>
            }
            className="newGroup_modal"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={720}
            closable={false}
            footer={<Button className="buttonAdd" onClick={handleOk}>Добавить</Button>}
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
                    {allGroups.filter(group => group.uid !== '00000000-0000-0000-0000-000000000003').map(group => (
                        <Option key={group.uid} value={group.uid}>{group.name}</Option>
                    ))}
                </Select>
            </Form.Item>
        </Modal>
    );
};

export default NewGroupModal;
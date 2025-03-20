import React, {useEffect, useMemo, useState} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleModalGroup2.css'
import {useGroupsStore} from "../../../store/groups/Groups";
import {Group} from "../../../types/Group";
import {CreateGroup} from "../../../api/groups/CreateGroup";
import {useAuthStore} from "../../../store/auth/auth";
import { message } from 'antd';

interface NewGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    group?:Group;

}
const NewGroupModal2: React.FC<NewGroupModalProps> = ({ visible, onOk, onCancel, group }) => {

    const { groups, fetchGroups } = useGroupsStore();
    const [groupName, setGroupName] = useState<string>(''); // Состояние для названия группы
    const { user, SmartDVRToken } = useAuthStore();


    console.log('Group.name '+ group?.name)

    useEffect(() => {
        if (visible && groups.length === 0) {
            fetchGroups();
        }
    }, [visible, fetchGroups, groups.length]);


    const getAllSubGroups = (group: Group): Group[] => {
        const subGroups: Group[] = [];
        group.sub_groups.forEach(subGroup => {
            subGroups.push(subGroup);
            if (subGroup.sub_groups) {
                subGroups.push(...getAllSubGroups(subGroup));
            }
        });
        return subGroups;
    };

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

    const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
    };

    const handleOk = async () => {
        if (!groupName.trim()) {
            message.error("Введите название группы!");
            return;
        }
        if (!group) {
            message.error("Ошибка: Родительская группа не выбрана!");
            return;
        }
        if (!user) {
            message.error("Ошибка авторизации!");
            return;
        }

        const groupData = { name: groupName, parent_uid: group.uid };

        try {
            const response = await CreateGroup(SmartDVRToken, user.login, groupData);

            if (response.success) {
                message.success("Группа успешно создана!");
                onOk();
            } else {
                message.error(`Ошибка: ${response.error}`);
            }
        } catch (error) {
            message.error("Ошибка при создании группы!");
            console.error('Error creating group:', error);
        }
    };

    return (
            <Modal
                title={
                <div className="titleModal_Group">
                    <span className="spanGroup">Добавить группу</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_Group"/>
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
                    label={<span className="inputLabel_Group">Название</span>}
                    name="name"
                    required={false}
                >
                    <Input className="input_Group" onChange={handleGroupNameChange} />
                </Form.Item>
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Group">Путь</span>}
                    name="group"
                    required={false}
                >
                    <Input prefix={group?.name} disabled style={{width: '504px'}} />
                </Form.Item>
            </Modal>
    );
};
export default NewGroupModal2;
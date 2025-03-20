import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleModalGroup.css'
import {useGroupsStore} from "../../../store/groups/Groups";
import {Group} from "../../../types/Group";
import {CreateGroup} from "../../../api/groups/CreateGroup";
import {useAuthStore} from "../../../store/auth/auth";
import { message } from 'antd';

const { Option } = Select;
interface NewGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;

}
const NewGroupModal: React.FC<NewGroupModalProps> = ({ visible, onOk, onCancel }) => {

    const { groups, fetchGroups } = useGroupsStore();
    const [groupName, setGroupName] = useState<string>(''); // Состояние для названия группы
    const [parentUid, setParentUid] = useState<string | undefined>('00000000-0000-0000-0000-000000000001'); // Состояние для выбранной группы
    const { user, SmartDVRToken } = useAuthStore();


    useEffect(() => {
        if (visible && groups.length === 0) {
            fetchGroups();
        }
    }, [visible, fetchGroups, groups.length]);

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


    const handleParentUidChange = (value: string) => {
        setParentUid(value);
    };
    const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
    };



    const handleOk = () => {
        if (!groupName.trim()) {
            message.error("Введите название группы!");
            return;
        }
        if (!parentUid) {
            message.error("Выберите родительскую группу!");
            return;
        }
        if (!user) {
            message.error("Ошибка авторизации!");
            return;
        }

        const groupData = { name: groupName, parent_uid: parentUid };
        CreateGroup(SmartDVRToken, user.login, groupData)
            .then((response) => {
                if (response.success) {
                    message.success("Группа успешно создана!");
                    onOk();
                } else {
                    message.error(`Ошибка: ${response.error}`);
                }
            })
            .catch((error) => {
                message.error("Ошибка при создании группы!");
                console.error('Error creating group:', error);
            });
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
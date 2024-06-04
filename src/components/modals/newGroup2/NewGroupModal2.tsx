import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleModalGroup2.css'
import {useGroupsStore} from "../../../store/groups/Groups";
import {Group} from "../../../types/Group";
import {CreateGroup} from "../../../api/groups/CreateGroup";
import {useAuthStore} from "../../../store/auth/auth";

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
        if (groups.length === 0) {
            fetchGroups();
        }
    }, [fetchGroups, groups.length]);
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
    const allGroups: Group[] = [];
    groups.forEach(group => {
        allGroups.push(group);
        if (group.sub_groups) {
            allGroups.push(...getAllSubGroups(group));
        }

    });

    const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
    };

    const handleOk = () => {
        if (groupName  && user && group) {
            const groupData = { name: groupName, parent_uid: group.uid };
            CreateGroup(SmartDVRToken, user.login, groupData)
                .then((response) => {
                    console.log('Group created:', response);
                    if (response.success) {
                        onOk(); // Close modal on success
                    } else {
                        console.error('Error creating group:', response.error);
                        console.log('Error creating group:', response.error)
                    }
                })
                .catch((error) => {
                    console.error('Error creating group:', error);
                });
        } else {
            console.warn('Group name, parent UID, or user is missing');
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
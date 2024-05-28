import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, Form, Input, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleEditDeviceGroup.css'
import {useGroupsStore} from "../../../store/groups/Groups";
import {Group} from "../../../types/Group";
import {CreateGroup} from "../../../api/groups/CreateGroup";
import {useAuthStore} from "../../../store/auth/auth";
import {getGroupEditDevice} from "../../../api/devices/getEditDeviceGroup";
import {Key} from "antd/lib/table/interface";
import {useButtonsFromAllcams} from "../../../store/devices/useButtonsFromAllcams";

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
        fetchGroups();
    }, [fetchGroups]);

    const handleParentUidChange = (value: string) => {
        setGroupUID(value);
    };

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


    const handleOk = () => {
        if (groupUID && user) {
            const groupData = { group_uid: groupUID, uid: device };
            getGroupEditDevice(SmartDVRToken, user.login, groupData as any)
                .then((response) => {
                    console.log('Group created:', response);
                    if (response.success) {
                        onOk(); // Close modal on success
                        setIsEditDeviceGroupModal(true);
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
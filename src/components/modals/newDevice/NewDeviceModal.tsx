import React, {useCallback, useEffect, useMemo} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleDeviceGroup.css'
import {useAuthStore} from "../../../store/auth/auth";
import {getCreateDevice} from "../../../api/devices/getCreateDevice";
import {useGroupsStore} from "../../../store/groups/Groups";
import {Group} from "../../../types/Group";
import {useIsDeviceAdded} from "../../../store/devices/isDeviceAdded";
import { message } from 'antd';

const { Option } = Select;
interface NewGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}
const NewDeviceModal: React.FC<NewGroupModalProps> = ({ visible, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const {user, SmartDVRToken} = useAuthStore();
    const { groups, fetchGroups } = useGroupsStore();
    const {setIsDeviceAdded} = useIsDeviceAdded();


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

    useEffect(() => {
        if (visible && groups.length === 0) {
            fetchGroups();
        }
    }, [visible, fetchGroups, groups.length]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (!values.name.trim()) {
                message.error("Введите название устройства!");
                return;
            }
            if (!values.DID.trim()) {
                message.error("Введите серийный номер устройства!");
                return;
            }
            if (!values.groupUID) {
                values.groupUID = '00000000-0000-0000-0000-000000000002';
            }
            if (!user) {
                message.error("Ошибка авторизации!");
                return;
            }

            const response = await getCreateDevice(SmartDVRToken, user.login, values);

            if (response.success) {
                message.success("Устройство успешно добавлено!");
                setIsDeviceAdded(true);
                form.resetFields();
                onOk();
            } else {
                message.error(`Ошибка: ${response.error}`);
            }
        } catch (errorInfo) {
            console.error('Validation failed:', errorInfo);
        }
    };

    return (
            <Modal
                title={
                <div className="titleModal_Device">
                    <span className="spanDevice">Добавить устройство</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_Device"/>
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
                <Form form={form} layout="horizontal" className="form_dev">
                    <Form.Item
                        className="form_name_Device"
                        label={<span className="inputLabel_Device">Название</span>}
                        name="name"
                        required={false}
                    >
                        <Input className="input_Group" />
                    </Form.Item>
                    <Form.Item
                        className="form_Description_Device"
                        label={<span className="inputLabel_Device">Описание</span>}
                        name="description"
                        required={false}
                    >
                        <Input className="input_Device" />
                    </Form.Item>
                    <Form.Item
                        className="form_Group"
                        label={<span className="inputLabel_Group">Путь</span>}
                        name="groupUID"
                        required={false}
                    >
                        <Select
                            className="selectGroup"
                            placeholder="Введите название или выберите из списка"
                            maxCount={1}
                        >
                            {allGroups.filter(group => group.uid !== '00000000-0000-0000-0000-000000000003').map(group => (
                                <Option key={group.uid} value={group.uid}>{group.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        className="form_Employee_Device"
                        label={<span className="inputLabel_Device">Сотрудник</span>}
                        name="owner"
                        required={false}
                    >
                        <Input className="input_Device" />
                    </Form.Item>
                    <Form.Item
                        className="form_SerialNumber_Device"
                        label={<span className="inputLabel_Device">Серийный номер</span>}
                        name="DID"
                        required={false}
                    >
                        <Input className="input_Device" />
                    </Form.Item>
                    <Form.Item
                        className="form_Model_Device"
                        label={<span className="inputLabel_Device">Модель</span>}
                        name="model"
                        required={false}
                    >
                        <Input className="input_Device" />
                     </Form.Item>
                </Form>
            </Modal>
    );
};

export default NewDeviceModal;
import React, {useEffect} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleDeviceGroup.css'
import {useAuthStore} from "../../../store/auth/auth";
import {getCreateDevice} from "../../../api/devices/getCreateDevice";
import {useGroupsStore} from "../../../store/groups/Groups";
import {Group} from "../../../types/Group";
import {useIsDeviceAdded} from "../../../store/devices/isDeviceAdded";

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

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    const handleOk = () => {

        form.validateFields().then(values => {
            if (!values.groupUID) {
                values.groupUID = '00000000-0000-0000-0000-000000000001';
            }
            if (user) {
                getCreateDevice(SmartDVRToken, user.login, values)
                    .then((response) => {
                        console.log('Device created:', response);
                        if (response.success) {
                            onOk(); // Close modal on success
                            setIsDeviceAdded(true);
                            form.resetFields();
                        } else {
                            console.error('Error creating device:', response.error);
                        }
                    })
                    .catch((error) => {
                        console.error('Error creating device:', error);
                    });
            } else {
                console.warn('User is missing');
            }
        }).catch(errorInfo => {
            console.error('Validation failed:', errorInfo);
        });
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
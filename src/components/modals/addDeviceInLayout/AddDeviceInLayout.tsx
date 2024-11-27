

import React, {useEffect, useState} from 'react';
import {Button, Form,  message, Modal, Select, TreeSelect} from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import './styleModalAddDeviceInLayout.css';
import { useAuthStore } from "../../../store/auth/auth";
import {useGroupsStore} from "../../../store/groups/Groups";
import {DeviceByGroupStore} from "../../../store/devices/DeviceByGroupStore";
import {Group} from "../../../types/Group";
import {UpdateLayouts} from "../../../api/layout/UpdateLayout";
import {LayoutType} from "../../../types/LayoutType";


const { TreeNode } = TreeSelect;
const { Option } = Select;
interface NewLayoutModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    layout: LayoutType; // Уникальный идентификатор раскладки
    existingDevices: string[];
}

const AddDeviceInLayout: React.FC<NewLayoutModalProps> = ({ visible, onOk, onCancel,layout,existingDevices  }) => {
    const { user, SmartDVRToken } = useAuthStore();
    const { groups, fetchGroups } = useGroupsStore(); // Используем хранилище групп
    const { devicesByStore, fetchDevicesByStore } = DeviceByGroupStore(); // Используем хранилище устройств по группам
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
    const [selectedDevices, setSelectedDevices] = useState<string[]>([]); // Для хранения выбранных устройств
    const [loading, setLoading] = useState(false);


    // Загрузка групп и установка устройств
    useEffect(() => {
        if (visible) {
            fetchGroups();
            console.log("Setting selected devices:", existingDevices);
            setSelectedDevices(existingDevices);
        }
    }, [visible, existingDevices]);



    const handleGroupChange = async (value: string) => {
        setSelectedGroup(value);
        if (value && user) {
            setLoading(true);
            await fetchDevicesByStore(value, SmartDVRToken, user.login);
            setLoading(false);
        }
    };

    const handleDeviceChange = (newDevices: string[]) => {
        console.log("Devices selected by user:", newDevices);

        // Объединяем старые и новые устройства
        const uniqueDevices = Array.from(new Set([...selectedDevices, ...newDevices]));
        setSelectedDevices(uniqueDevices);
    };

    const handleOk = async () => {
        if (!layout.uid ) {
            message.error("UID раскладки не найден.");
            return;
        }

        if (!selectedDevices.length) {
            message.error("Пожалуйста, выберите устройства для добавления.");
            return;
        }

        // Преобразуем выбранные устройства в нужный формат
        const devices = selectedDevices.map(deviceUID => ({ UID: deviceUID }));

        const data = {
            uid: layout.uid,
            devices: devices
        };

        try {
            if ( user) {
            setLoading(true);
            const response = await UpdateLayouts(SmartDVRToken, user.login, data);
            if (response.success) {
                message.success("Устройство успешно добавлено!");
                onOk();
            }
            }else {
                message.error("Ошибка обновления раскладки: ");
            }
        } catch (error) {
            console.error("Ошибка обновления раскладки:", error);
            message.error("Произошла ошибка при обновлении раскладки.");
        } finally {
            setLoading(false);
        }

    };


    const renderTreeNodes = (data: Group[]) =>
        data.map((item) => {
            if (item.sub_groups && item.sub_groups.length) {
                return (
                    <TreeNode title={item.name} value={item.uid} key={item.uid}>
                        {renderTreeNodes(item.sub_groups)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} value={item.uid} key={item.uid} />;
        });



    return (
        <Modal
            title={
                <div className="titleModal_Layout">
                    <span className="spanLayout">Добавить устройство</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_Layout" />
                </div>
            }
            className="newLayout_modal"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={720}
            closable={false}
            footer={<Button className="buttonAdd" onClick={handleOk}>Добавить</Button>}
        >
            <Form>
                <Form.Item
                    className="form_Layout"
                    label={<span className="inputLabel_Layout">Группа</span>}
                    name="group"
                    rules={[{ required: true, message: 'Пожалуйста, выберите группу' }]}
                >
                    <TreeSelect
                        className="select_group"
                        placeholder="Выберите группу"
                        onChange={handleGroupChange}
                        loading={loading}
                        treeDefaultExpandAll
                    >
                        {renderTreeNodes(groups)}
                    </TreeSelect>
                </Form.Item>
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Layout">Устройство</span>}
                    name="device"
                    rules={[{ required: true, message: 'Пожалуйста, выберите устройство' }]}
                >
                    <Select
                        key={selectedDevices.join(',')}
                        className="select_device"
                        placeholder="Выберите устройство"
                        disabled={!selectedGroup}
                        loading={loading}
                        mode="multiple"
                        onChange={handleDeviceChange}
                        value={selectedDevices.length ? selectedDevices : undefined}
                    >
                        {devicesByStore.map((device) => (
                            <Option key={device.UID} value={device.UID}>
                                {device.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddDeviceInLayout;

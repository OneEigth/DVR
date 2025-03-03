
import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Input,
    Form,
    message,
    Select,
    Card,
    Layout,
    Menu,
    Tag,
} from 'antd';
import './style.css'
import { usePTTGroupsStore } from '../../../store/pttGroups/usePTTGroupsStore';
import { PTTGroup } from '../../../types/PTTGroup';
import { useDevicesStore } from '../../../store/devices/allDevices';
import { useAuthStore } from '../../../store/auth/auth';
import { Typography } from 'antd';
import ButtonDeviceSave from "../../buttons/buttonDeviceEdit/ButtonDeviceSave";
import {PlusOutlined} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;


const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4D4E65',
};

const contentStyle: React.CSSProperties = {
    margin: '20px',
    backgroundColor: '#f0f2f5',
    padding: '24px',
    minHeight: 280,
};

const siderStyle: React.CSSProperties = {
    backgroundColor: '#fff',
};


const AdminPage: React.FC = () => {
    const {
        groups,
        fetchGroups,
        updateGroup,
    } = usePTTGroupsStore();

    const [selectedGroup, setSelectedGroup] = useState<PTTGroup | null>(null);
    const { devices, fetchDevices } = useDevicesStore();
    const [groupForm] = Form.useForm();
    const [createForm] = Form.useForm();
    const [tempGroup, setTempGroup] = useState<PTTGroup | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isСreateGroupModalVisible, setIsСreateGroupModalVisible] = useState(false);

    useEffect(() => {

            fetchGroups();
            fetchDevices();

    }, [fetchGroups, fetchDevices]);

    // При выборе группы заполняем форму значениями выбранной группы
    useEffect(() => {
        if (selectedGroup) {
            groupForm.setFieldsValue({
                name: selectedGroup.name,
                uid: selectedGroup.uid,
                userUID: selectedGroup.userUID,
                userName: selectedGroup.user?.name,
            });
        } else {
            groupForm.resetFields();
        }
    }, [selectedGroup, groupForm]);

    const handleCreateGroup = async () => {
        try {
            // Валидируем форму перед отправкой
            const values = await createForm.validateFields();

            const { user } = useAuthStore.getState();
            if (!user || !user.uid) {
                message.error('Не удалось получить UID пользователя!');
                return;
            }

            if (!values.devices || values.devices.length === 0) {
                message.warning('Выберите хотя бы одно устройство!');
                return;
            }

            // Отправляем запрос на создание группы и получаем ответ
            const response = await usePTTGroupsStore.getState().addGroup(
                {
                    uid: '',
                    name: values.name, // Берем название группы из формы
                    userUID: user.uid,
                    user: user,
                    devices: devices.filter((device) => values.devices.includes(device.UID)),
                },
                devices.filter((device) => values.devices.includes(device.UID))
            );

            // Проверяем, что сервер вернул успешный ответ
            if (response?.success) {
                message.success("Группа создана успешно!");
                createForm.resetFields();
                setIsСreateGroupModalVisible(false);
                fetchGroups();
            } else {
                // Если сервер вернул ошибку, показываем её в UI
                message.error(response?.error || "Ошибка создания группы!");
            }
        } catch (error) {
            message.error("Ошибка при создании группы!");
            console.error("Ошибка:", error);
        }
    };
    const handleCancel = () => {
        setIsСreateGroupModalVisible(false);
        createForm.resetFields();
    };

    const showCreateModal = () => {
        setIsСreateGroupModalVisible(true);
    };

    const handleDeleteGroup = async () => {
        if (!selectedGroup || !selectedGroup.uid) {
            message.error("Ошибка: UID группы отсутствует!");
            return;
        }

        try {
            await usePTTGroupsStore.getState().removeGroup(selectedGroup.uid);
            message.success("Группа удалена успешно!");
            setSelectedGroup(null);
        } catch (error) {
            message.error("Ошибка удаления группы!");
            console.error("Ошибка удаления группы:", error);
        }
    };

   const onSelectGroup = (groupId: string) => {
        const group = groups.find(g => g.id === groupId);
        if (group) {
            setSelectedGroup(group);
        }
    };

    // Функция для отрисовки кружка статуса
    const renderStatusDot = (online: boolean) => (
        <span
            style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: online ? 'green' : 'red',
                marginRight: 8,
            }}
        />
    );


    //Редактирование групп PTT

    const hasChanges = () => {
        const currentValues = groupForm.getFieldsValue();
        return selectedGroup && (selectedGroup.name !== currentValues.name);
    };

    // Добавление устройства в группу
    const handleDeviceAdd = async (deviceUID: string) => {
        if (!selectedGroup) return;
        const updatedDevices = [...(selectedGroup.devices || []), { UID: deviceUID } as any]; // Приведение типа для совместимости
        setSelectedGroup({ ...selectedGroup, devices: updatedDevices });
        await updateGroup({ uid: selectedGroup.uid, name: selectedGroup.name, devices: updatedDevices });
        message.success('Изменения сохранены!');
        await updateGroup({ uid: selectedGroup.uid, name: selectedGroup.name, devices: updatedDevices });
        message.success('Устройство удалено и изменения сохранены!');
        await updateGroup({ uid: selectedGroup.uid, name: selectedGroup.name, devices: updatedDevices });
        message.success('Устройство добавлено и изменения сохранены!');
    };

    // Удаление устройства из группы
    const handleDeviceRemove = async (deviceUID: string) => {
        if (!selectedGroup || !selectedGroup.devices) return;
        const updatedDevices = selectedGroup.devices.filter(device => device.UID !== deviceUID);
        if (updatedDevices.length === 0) {
            message.warning("Группа должна содержать хотя бы одно устройство!");
            return;
        }
        setSelectedGroup({ ...selectedGroup, devices: updatedDevices });
        await updateGroup({ uid: selectedGroup.uid, name: selectedGroup.name, devices: updatedDevices });
        message.success('Изменения сохранены!');
    };

    const handleSaveChanges = async () => {
        if (!selectedGroup || !selectedGroup.devices || selectedGroup.devices.length === 0) {
            message.error("Группа должна содержать хотя бы одно устройство!");
            return;
        }
        const values = groupForm.getFieldsValue();
        await updateGroup({ uid: selectedGroup.uid, name: values.name, devices: selectedGroup.devices });
        message.success('Изменения сохранены!');
        setIsModalVisible(false);
    };




    return (
        <>
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                ...headerStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: "fixed",
                width: "100%",
                top: 0,
                zIndex: 1000, // Чтобы он был поверх остальных элементов
            }}>
                <Title level={3} style={{ color: '#fff', margin: 0 }}>
                    Администрирование PTT групп
                </Title>

            </Header>
            <Layout>
                <Layout style={{ marginTop: 64 }}> {/* Отступ, чтобы контент не перекрывал Header */}
                <Sider style={{
                    ...siderStyle,
                    height: "calc(100vh - 64px)", // Высота минус Header
                    overflowY: "auto", // Включаем прокрутку
                    position: "fixed", // Фиксируем его слева
                    left: 0,
                }}
                       width={250}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            background: "#fff",
                            borderBottom: "1px solid #f0f0f0",
                            display: "flex", // Располагаем элементы в строку
                            justifyContent: "space-between", // Раздвигаем элементы
                            alignItems: "center", // Выравниваем по центру вертикально

                        }}
                    >
                        <Title level={4} style={{margin: 0}}>Группы PTT</Title>

                        <Button
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined/>}
                            onClick={showCreateModal} // Замените на нужную функцию
                        />
                    </div>
                    <Menu mode="inline" selectedKeys={selectedGroup?.id ? [selectedGroup.id] : []}>
                        {groups.map((group) => (
                            <Menu.SubMenu
                                key={group.id}
                                title={group.name}
                                onTitleClick={() => {
                                    if (selectedGroup && selectedGroup.id !== group.id && hasChanges()) {
                                        setTempGroup(group);
                                        setIsModalVisible(true);
                                    } else {
                                        onSelectGroup(group.id ?? '');
                                    }
                                }}
                            >
                                {group.devices && group.devices.length > 0 ? (
                                    group.devices.map((device) => (
                                        <Menu.Item key={`${group.id}-${device.DID}`} disabled>
                                            {renderStatusDot(device.online)}
                                            {device.name ? device.name : device.DID}
                                        </Menu.Item>
                                    ))
                                ) : (
                                    <Menu.Item key={`${group.id}-noDevices`} disabled>
                                        Нет устройств
                                    </Menu.Item>
                                )}
                            </Menu.SubMenu>
                        ))}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 250 }}>
                <Content style={contentStyle}>
                    {selectedGroup ? (
                        <Card
                            title="Информация о группе"
                            extra={
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >

                                    <Button
                                        onClick={handleDeleteGroup}
                                        style={{
                                            backgroundColor: '#DE7171',
                                            borderColor: '#DE7171',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <svg
                                            width="12"
                                            height="14"
                                            viewBox="0 0 12 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{marginRight: 4}}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M2.66667 2H9.33333V0H2.66667V2ZM2.66667 4.66667H9.33333V12H2.66667V4.66667ZM0 4H1.33333V4.66667V12C1.33333 12.7364 1.93029 13.3333 2.66667 13.3333H9.33333C10.0697 13.3333 10.6667 12.7364 10.6667 12V4.66667V4H12V2.66667H0V4ZM4 6V10.6667H5.33333V6H4ZM6.66667 6V10.6667H8V6H6.66667Z"
                                                fill="white"
                                            />
                                        </svg>
                                        <span style={{color: 'white'}}>Удалить</span>
                                    </Button>
                                </div>
                            }
                            style={{width: '100%'}}
                            bodyStyle={{width: '100%'}}
                        >
                            {/* Центрируем форму внутри Card */}
                            <div className="cartConteiner" style={{ display: 'flex',flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding:20, minWidth: '100%',}}>
                                <div style={{ width: '100%', display:"flex",flexDirection:"column",minWidth: '100%',flexGrow: 1 }}>
                            <Form form={groupForm} layout="horizontal"  labelCol={{ span: 10 }} wrapperCol={{ span: 20 }} style={{ width: '100%' }}>
                                <Form.Item
                                    label="Название"
                                    name="name"
                                    rules={[
                                        { required: true, message: "Введите название группы!" },
                                        {
                                            pattern: /^(?=.*[a-zA-Zа-яА-Я])[a-zA-Zа-яА-Я0-9\s]+$/,
                                            message: "Название группы должно содержать хотя бы одну букву!",
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="UID" name="uid">
                                    <Input disabled/>
                                </Form.Item>
                                <Form.Item label="User UID" name="userUID">
                                    <Input disabled/>
                                </Form.Item>
                                <Form.Item label="Пользователь" name="userName">
                                    <Input disabled/>
                                </Form.Item>
                                <Form.Item label="Устройства">
                                    {selectedGroup.devices && selectedGroup.devices.length > 0 ? (
                                        selectedGroup.devices.map((device) => (
                                            <Tag
                                                key={device.DID}
                                                closable
                                                onClose={() => handleDeviceRemove(device.UID)}
                                                style={{marginBottom: 4}}
                                            >
                                                {renderStatusDot(device.online)}
                                                {device.name ? device.name : device.DID}
                                            </Tag>
                                        ))
                                    ) : (
                                        'Нет устройств'
                                    )}
                                    <Select
                                        placeholder="Добавить устройство"
                                        onChange={handleDeviceAdd}
                                        style={{ width: '100%', marginTop: 8 }}
                                    >
                                        {devices.map((device) => (
                                            <Select.Option key={device.UID} value={device.UID}>
                                                {device.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Form>
                            <div>
                                <ButtonDeviceSave onClick={handleSaveChanges}/>
                            </div>
                                </div>
                            </div>
                        </Card>

                    ) : (
                        <Card>
                            <p>Выберите группу для просмотра информации</p>
                        </Card>
                    )}
                </Content>
                </Layout>
                </Layout>
            </Layout>
           {/*  <Footer style={footerStyle}>

             </Footer>*/}
        </Layout>
    <Modal
        title="Сохранить изменения?"
        open={isModalVisible}
        onOk={handleSaveChanges}
        onCancel={() => {
            setIsModalVisible(false);
            setSelectedGroup(tempGroup);
            setTempGroup(null);
        }}
    >
        <p>У вас есть несохраненные изменения. Хотите их сохранить перед сменой группы?</p>
    </Modal>
            <Modal
                title="Создать новую группу"
                visible={isСreateGroupModalVisible}
                onOk={handleCreateGroup}
                onCancel={handleCancel}
                okText="Создать"
                cancelText="Отмена"
            >
                <Form form={createForm} layout="vertical">
                    <Form.Item
                        label="Название группы"
                        name="name"
                        rules={[{ required: true, message: "Введите название группы!" }]}
                    >
                        <Input placeholder="Введите название группы" />
                    </Form.Item>

                    <Form.Item
                        label="Выберите устройства"
                        name="devices"
                        rules={[{ required: true, message: "Выберите хотя бы одно устройство!" }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Выберите устройства"
                        >
                            {devices.map((device) => (
                                <Option key={device.UID} value={device.UID}>
                                    {device.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
</>
    );
};

export default AdminPage;
import React, {useEffect, useState} from "react";
import {AutoComplete, Form, Input, message} from "antd";
import './style.css'
import {Device} from "../../../../types/Device";
import {getEditDevice} from "../../../../api/devices/getEditDevice";
import {useAuthStore} from "../../../../store/auth/auth";
import ButtonDeviceSave from "../../../buttons/buttonDeviceEdit/ButtonDeviceSave";
import ButtonDeviceAddToLayout from "../../../buttons/buttonDeviceEdit/ButtonDeviceAddToLayout";
import ButtonDeviceDelete from "../../../buttons/buttonDeviceEdit/ButtonDeviceDelete";
import {useGroupsStore} from "../../../../store/groups/Groups";
import {Group} from "../../../../types/Group";
import DeleteDeviceOneModal from "../../../modals/deleteDevice/DeleteDeviceOne";
import {useIsFormChanged} from "../../../../store/devices/getDeviceChange";
import NotSavedChanges from "../../../modals/notSavedChanges/NotSavedChanges";
import {useOwnerStore} from "../../../../store/owner/useOwnerStore";
import {Owner} from "../../../../types/Owner";


interface DescriptionsProps{
    device: Device;
}
const Description: React.FC<DescriptionsProps> = ({device}) => {
    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();
    const {user,SmartDVRToken}=useAuthStore();
    const [messageApi, contextHolder] = message.useMessage();
    const { groups, fetchGroups } = useGroupsStore();
    const {owners,fetchOwners}=useOwnerStore();
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
    const [isDeleteDeviceOneModal, setIsDeleteDeviceOneModal] = useState(false);
    const {setIsFormChanged, setIsNotSavedModalVisible, isNotSavedModalVisible} = useIsFormChanged();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const initialValuesLeft = {
        name: device.name,
        description: device.description,
        groupName: device.groupName,
    };

    const initialValuesRight = {
        ownerName: device.ownerName,
        serialNumber: device.DID,
        model: device.model,
    };

    useEffect(() => {

        formLeft.setFieldsValue(initialValuesLeft);
        formRight.setFieldsValue(initialValuesRight);

        fetchOwners(page,pageSize);
        fetchGroups();
    }, [device, formLeft, formRight, fetchGroups, fetchOwners]);

    const checkForChanges = () => {
        const valuesLeft = formLeft.getFieldsValue();
        const valuesRight = formRight.getFieldsValue();

        const changedValuesLeft = getChangedFields(initialValuesLeft, valuesLeft);
        const changedValuesRight = getChangedFields(initialValuesRight, valuesRight);

        setIsFormChanged(Object.keys(changedValuesLeft).length > 0 || Object.keys(changedValuesRight).length > 0);
    };

    const handleDeviceDelete = () => {
        setIsDeleteDeviceOneModal(true)
    };

    const handleDeviceAddToLayout = () => {
    };

    const getChangedFields = (initialValues: { [key: string]: any }, currentValues: { [key: string]: any }) => {
        const changedFields: { [key: string]: any } = {};
        for (const key in currentValues) {
            if (currentValues[key] !== initialValues[key]) {
                changedFields[key] = currentValues[key];
            }
        }
        return changedFields;
    };

    const handleDeviceSave = async () => {
        if (user?.login) {
            try {
                const valuesLeft = await formLeft.validateFields();
                const valuesRight = await formRight.validateFields();

                const initialValuesLeft = {
                    name: device.name,
                    description: device.description,
                    groupUID: device.groupUID,
                };
                const initialValuesRight = {
                    ownerName: device.ownerName,
                    serialNumber: device.DID,
                    model: device.model,
                };

                const changedValuesLeft = getChangedFields(initialValuesLeft, valuesLeft);
                const changedValuesRight = getChangedFields(initialValuesRight, valuesRight);

                const updatedDeviceData = {
                    UID: device.UID,
                    ...changedValuesLeft,
                    ...changedValuesRight,
                    groupUID: selectedGroup ? selectedGroup.uid : valuesLeft.groupUID,
                    ownerUID: selectedOwner ? selectedOwner.UID : valuesRight.ownerUID,
                };

                const response = await getEditDevice(SmartDVRToken, user.login, updatedDeviceData);

                if (response?.success) {
                    messageApi.success('Устройство обновлено');
                    setIsFormChanged(false);
                } else {
                    const errorMessage = response?.error;

                    if (errorMessage === "in DeviceUpdateByData user is not admin or wrong group") {
                        messageApi.error('У пользователя нет прав на редактирование устройства');
                    } else {
                        messageApi.error('Ошибка обновления: ' + errorMessage);
                    }
                }
            } catch (error) {
                console.error('Validation failed:', error);
                messageApi.error('Validation failed');
            }
        } else {
            messageApi.error('User is not logged in');
        }
    };

    const handleOkDeleteDeviceOneModal = () => {
        setIsDeleteDeviceOneModal(false);
    }
    const handleCancelDeleteDeviceOneModal = () => {
        setIsDeleteDeviceOneModal(false);
    };

    const handleOkNotChangedDeiceModal = () => {
        handleDeviceSave();
        setIsNotSavedModalVisible(false)

    }
    const handleCancelNotChangedDeiceModal = () => {
        setIsNotSavedModalVisible(false)
    }

    console.log("owners"+owners)
    return (
        <div className="description_cont">
            {contextHolder}
            <div className="desc">
                <div className="formGroupLeft"> {/* Группа слева */}
                    <Form
                        form={formLeft}
                        className="form"
                        name="basicLeft"
                        labelCol={{span: 5}}
                        wrapperCol={{span: 18}}
                        style={{maxWidth: '100%'}}
                        onValuesChange={checkForChanges}

                    >
                        <Form.Item
                            label={<span className="inputLabel">Позывной</span>}
                            name="name"
                            rules={[{ required: true, message: 'Пожалуйста, введите позывной' }]}

                        >
                            <Input className="input" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Описание</span>}
                            name="description"
                            rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}

                        >
                            <Input className="input" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Группа</span>}
                            name="groupName"
                            rules={[{ required: true, message: 'Пожалуйста, выберите группу' }]}
                        >
                            <AutoComplete
                                options={groups.map(group => ({ value: group.name}))}
                                filterOption={(inputValue, option) =>
                                    option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSelect={(selectedValue) => {
                                    const selectedGroup = groups.find(group => group.name === selectedValue);
                                    setSelectedGroup(selectedGroup ?? null);
                                    formLeft.setFieldsValue({ groupUID: selectedGroup ? selectedGroup.uid : null });
                                }}
                            >
                                <Input className="input" />
                            </AutoComplete>
                        </Form.Item>
                        
                    </Form>
                </div>

                <div className="formGroupRight">
                    {/* Группа справа */}

                    <Form
                        form={formRight}
                        className="form"
                        name="basicRight"
                        labelCol={{span: 5}}
                        wrapperCol={{span: 19}}
                        style={{maxWidth: '100%'}}
                        onValuesChange={checkForChanges}
                    >
                        <Form.Item
                            label={<span className="inputLabel">Владелец</span>}
                            name="ownerName"
                            rules={[{ required: true, message: 'Пожалуйста, выберите владельца' }]}
                        >
                            <AutoComplete
                                options={owners.map(owner => ({ value: owner.name}))}
                                filterOption={(inputValue, option) =>
                                    option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSelect={(selectedValueOwner) => {
                                    const selectedOwner = owners.find(owner => owner.name === selectedValueOwner);
                                    setSelectedOwner(selectedOwner ?? null);
                                    formRight.setFieldsValue({ ownerUID: selectedOwner ? selectedOwner.UID : null });
                                }}
                            >
                                <Input className="input" />
                            </AutoComplete>
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Серийный номер</span>}
                            name="serialNumber"
                            rules={[{ required: true, message: 'Пожалуйста, введите серийный номер' }]}
                        >
                            <Input className="input" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Модель</span>}
                            name="model"
                            rules={[{ required: true, message: 'Пожалуйста, введите модель' }]}
                        >
                            <Input className="input" />
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="description_footer">
                <div>
                    <ButtonDeviceSave onClick={handleDeviceSave}/>
                    <ButtonDeviceAddToLayout onClick={handleDeviceAddToLayout}/>
                    <ButtonDeviceDelete onClick={handleDeviceDelete}/>
                </div>
            </div>

            <DeleteDeviceOneModal device={device}
                             visible={isDeleteDeviceOneModal}
                             onOk={handleOkDeleteDeviceOneModal}
                             onCancel={handleCancelDeleteDeviceOneModal}
            />

            <NotSavedChanges device={device}
                             onOk={handleOkNotChangedDeiceModal}
                             onCancel={handleCancelNotChangedDeiceModal}
                             visible={isNotSavedModalVisible}
            />

        </div>

    )
}

    export default Description;
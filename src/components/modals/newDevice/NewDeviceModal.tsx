import React from 'react';
import {Button, ConfigProvider, Form, Input, Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleDeviceGroup.css'

interface NewGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}
const NewDeviceModal: React.FC<NewGroupModalProps> = ({ visible, onOk, onCancel }) => {

    return (
            <Modal
                title={
                <div className="titleModal_Device">
                    <span className="spanDevice">Добавить группу</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_Device"/>
                </div>
            }
                className="newGroup_modal"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                width={720}
                closable={false}
                footer={<Button className="buttonAdd" onClick={onOk}>Добавить</Button>}
            >
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
                    name="name"
                    required={false}
                >
                    <Input className="input_Device" />
                </Form.Item>
                <Form.Item
                    className="form_Group_Device"
                    label={<span className="inputLabel_Device">Группа</span>}
                    name="name"
                    required={false}
                >
                    <Input className="input_Device" />
                </Form.Item>
                <Form.Item
                    className="form_Employee_Device"
                    label={<span className="inputLabel_Device">Сотрудник</span>}
                    name="name"
                    required={false}
                >
                    <Input className="input_Device" />
                </Form.Item>
                <Form.Item
                    className="form_SerialNumber_Device"
                    label={<span className="inputLabel_Device">Серийный номер</span>}
                    name="name"
                    required={false}
                >
                    <Input className="input_Device" />
                </Form.Item>
                <Form.Item
                    className="form_Model_Device"
                    label={<span className="inputLabel_Device">Модель</span>}
                    name="name"
                    required={false}
                >
                    <Input className="input_Device" />
                </Form.Item>

            </Modal>
    );
};

export default NewDeviceModal;
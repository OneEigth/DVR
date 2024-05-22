import React from 'react';
import {Button, ConfigProvider, Form, Input, Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleModalGroup.css'

interface NewGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}
const NewGroupModal: React.FC<NewGroupModalProps> = ({ visible, onOk, onCancel }) => {

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
                footer={<Button className="buttonAdd" onClick={onOk}>Добавить</Button>}
            >
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Group">Название</span>}
                    name="name"
                    required={false}
                >
                    <Input className="input_Group" />
                </Form.Item>

            </Modal>
    );
};

export default NewGroupModal;
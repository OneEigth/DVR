
import React, { useState } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import './styleModalLayout.css';
import { useAuthStore } from "../../../store/auth/auth";
import { CreateLayout } from "../../../api/layout/CreateLayout";

interface NewLayoutModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const NewLayoutModal: React.FC<NewLayoutModalProps> = ({ visible, onOk, onCancel }) => {
    const { user, SmartDVRToken } = useAuthStore();
    const [LayoutName, setLayoutName] = useState('');
    const [LayoutDescription, setLayoutDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLayoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLayoutName(e.target.value);
    };

    const handleLayoutDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLayoutDescription(e.target.value);
    };

    const handleOk = async () => {
        if (!LayoutName) {
            message.error("Please enter the layout name.");
            return;
        }

        if (!user || !SmartDVRToken) {
            message.error("User is not authenticated.");
            return;
        }

        setLoading(true);

        try {
            const data = {
                name: LayoutName,
                userUID: user.uid,
                description: LayoutDescription,
                viewType: "2x2", // Укажите нужный тип отображения
            };

            const response = await CreateLayout(SmartDVRToken, user.login, data);

            if (response.success) {
                message.success("Layout created successfully!");
                onOk(); // Закрываем модальное окно после успешного создания
            } else {
                message.error("Failed to create layout: " + response.error);
            }
        } catch (error) {
            console.error("Error creating layout:", error);
            message.error("An error occurred while creating the layout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={
                <div className="titleModal_Layout">
                    <span className="spanLayout">Добавить раскладку</span>
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
                    label={<span className="inputLabel_Layout">Название</span>}
                    name="name"
                    rules={[{ required: true, message: 'Пожалуйста, введите название раскладки' }]}
                >
                    <Input className="input_Layout" onChange={handleLayoutName} />
                </Form.Item>
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Layout">Описание</span>}
                    name="description"
                >
                    <Input className="input_Layout" onChange={handleLayoutDescription} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewLayoutModal;

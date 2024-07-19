import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Select, Switch, message } from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './styleModalUser.css'
import {useGroupsStore} from "../../../../store/groups/Groups";
import {Group} from "../../../../types/Group";
import {useAuthStore} from "../../../../store/auth/auth";
import {getCreateUser} from "../../../../api/users/getCreateUser";

const { Option } = Select;
interface NewGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;

}
const NewUserModal: React.FC<NewGroupModalProps> = ({ visible, onOk, onCancel }) => {

    const { groups, fetchGroups } = useGroupsStore();

    const { user, SmartDVRToken } = useAuthStore();

    const [name, setName] = useState<string>(''); // State for user name
    const [login, setLogin] = useState<string>(''); // State for login
    const [password, setPassword] = useState<string>(''); // State for password
    const [isAdmin, setIsAdmin] = useState<boolean>(false); // State for admin status
    const [parentUid, setParentUid] = useState<string | undefined>('00000000-0000-0000-0000-000000000001'); // State for selected group

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





    const handleParentUidChange = (value: string) => {
        setParentUid(value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleIsAdminChange = (checked: boolean) => {
        setIsAdmin(checked);
    };

    const handleOk = () => {
        if (name && login && password && parentUid && user) {
            const userData = {
                name: name,
                login: login,
                password: password,
                role: isAdmin ? 'admin' : 'user', // Assuming 'role' based on isAdmin state
                groups: parentUid ? [parentUid] : []
            };
            getCreateUser(SmartDVRToken, user.login, userData as any)
                .then((response) => {
                    console.log('User created:', response);
                    if (response.success) {
                        message.success('Пользователь успешно создан!').then(() => {
                            onOk(); // Close modal on success
                        });
                    } else {
                        console.error('Error creating user:', response.error);
                        message.error(`Ошибка при создании пользователя: ${response.error.error}`);
                    }
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    message.error('Ошибка при создании пользователя');
                });
        } else {
            console.warn('User name, login, password, parent UID, or user is missing');
        }
    };



    return (
            <Modal
                title={
                <div className="titleModal_Group">
                    <span className="spanGroup">Добавить пользователя</span>
                    <CloseOutlined onClick={onCancel} className="closeBut_Group"/>
                </div>
            }
                className="newGroup_modal"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                width={720}
                closable={false}
                footer={<Button className="buttonAdd" onClick={handleOk}>Сохранить</Button>}
            >
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Group">Имя</span>}
                    name="name"
                    required={false}
                >
                    <Input className="input_Group" onChange={handleNameChange} />
                </Form.Item>
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Group">Группа</span>}
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
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Group">Логин</span>}
                    name="login"
                    required={false}
                >
                    <Input className="input_Group" onChange={handleLoginChange} />
                </Form.Item>
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Group">Администратор</span>}
                    name="isAdmin"
                    required={false}
                >
                    <Switch defaultChecked onChange={handleIsAdminChange} />
                </Form.Item>
                <Form.Item
                    className="form_Group"
                    label={<span className="inputLabel_Group">Пароль</span>}
                    name="password"
                    required={false}
                >
                    <Input className="input_Group" onChange={handlePasswordChange} />
                </Form.Item>

            </Modal>
    );
};
export default NewUserModal;
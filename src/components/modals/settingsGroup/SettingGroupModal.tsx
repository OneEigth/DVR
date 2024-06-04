import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, Input, Menu, Modal} from 'antd';
import './styleSettingModalGroup.css'
import {useGroupsStore} from "../../../store/groups/Groups";
import SubMenu from "antd/es/menu/SubMenu";
import {CloseOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import {Group} from "../../../types/Group";
import DeleteModalGroup from "../deleteGroup/DeleteModalGroup";
import {useAuthStore} from "../../../store/auth/auth";
import {UpdateGroup} from "../../../api/groups/UpdateGroup";
import IconCheck from "../../icons/iconCheck/IconCheck";
import IconClose from "../../icons/iconClose/IconClose";
import IconPlus from "../../icons/iconPus/IconPlus";
import IconDelete from "../../icons/iconDelete/IconDelete";
import IconEdit from "../../icons/iconEdit/IconEdit";
import NewGroupModal2 from "../newGroup2/NewGroupModal2";

interface SettingGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}
const SettingGroupModal: React.FC<SettingGroupModalProps> = ({ visible, onOk, onCancel }) => {

    const { groups, fetchGroups} = useGroupsStore();
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [editingGroup, setEditingGroup] = useState<String | null>(null);
    const [newGroupName, setNewGroupName] = useState<string>('');
    const [newAddGroupName, setAddNewGroupName] = useState<Group>();
    const [isModalDeleteModalGroup, setIsModalDeleteModalGroup] = useState(false);
    const [isModalNewGroupOpen, setIsModalNewGroupOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group>();
    const { user, SmartDVRToken } = useAuthStore();

    useEffect(() => {
        if (groups.length === 0) {
            fetchGroups();
        }
    }, [fetchGroups, groups.length]);

    const getGroupIcon = (uid:any) => {
        switch (uid) {
            case '00000000-0000-0000-0000-000000000003':
                return '';
            default:
                return '';
        }
    };

    const generateSubMenu = (group: Group): React.ReactNode => {
        const isEditing = editingGroup === group.uid;

        return (
            <SubMenu
                key={group.uid}
                title={
                    <div className="menu-item-content" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{isEditing ? renderTitle(group) : group.name}</span>
                        {!isEditing && (
                            <div className="menu-item-buttons">
                                <Button icon={<IconPlus />} onClick={() => showModalNewGroup(group)} style={{background:'#4D4E65'}}/>
                                <Button icon={<IconEdit />} onClick={() => handleEditGroup(group)} style={{background:'#4D4E65'}}/>
                                <Button icon={<IconDelete />} onClick={() => handleDeleteGroup(group)} style={{background:'#DE7171'}}/>
                            </div>
                        )}
                    </div>
                }
            >
                {group.sub_groups.map((subgroup) => generateSubMenu(subgroup))}
            </SubMenu>
        );
    }

    const handleEditGroup = (group: Group) => {
        setEditingGroup(group.uid);
        setNewGroupName(group.name);
    };

    const handleSaveGroup = (group: Group) => {
        if (group.name && group.uid && SmartDVRToken && user) {
            const groupData = { uid: group.uid, name: newGroupName };
            UpdateGroup(SmartDVRToken, user.login, groupData)
                .then(response => {
                    if (response.success) {
                        fetchGroups();
                        setEditingGroup(null);
                    } else {
                        console.error('Error updating group:', response.error);
                    }
                })
                .catch(error => {
                    console.error('Error updating group:', error);
                });
        } else {
            console.warn('Group UID, Name, or user is missing');
        }
    };

    const handleCancelEdit = () => {
        setEditingGroup(null);
    };

    const renderTitle = (entity: Group, isSubGroup = false) => (
        editingGroup === entity.uid ? (
            <div className="editGroup">
                <Input
                    className="input_EG"
                    value={isSubGroup ? newGroupName : newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                />
                <Button onClick={() => handleSaveGroup(entity)}
                        className="button_EG"
                        icon={<IconCheck />}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderColor: "#4D4E65",
                            width: "32px",
                            height: "32px",
                            marginLeft: "8px",
                            marginRight: "8px",
                            paddingLeft: "7px",
                            paddingRight: "7px"
                        }} />
                <Button onClick={() => handleCancelEdit()}
                        className="button_EG"
                        icon={<IconClose />}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderColor: "#4D4E65",
                            width: "32px",
                            height: "32px",
                            marginRight: "8px",
                            paddingLeft: "7px",
                            paddingRight: "7px"
                        }} />
            </div>
        ) : (
            entity.name
        )
    );


    const handleDeleteGroup = (group:Group) => {
        setEditingGroup(null);
        setIsModalDeleteModalGroup(true)
        setSelectedGroup(group);
    };
    const handleOkDeleteModal = () => {
        setIsModalDeleteModalGroup(false)
        fetchGroups();
    };
    const handleCancelDeleteModal = () => {
        setIsModalDeleteModalGroup(false)
    };
    const showModalNewGroup = (group: Group) => {
            setAddNewGroupName(group);
            setIsModalNewGroupOpen(true);
    };
    const handleOkNewGroupModal = () => {
        setIsModalNewGroupOpen(false);
        fetchGroups();
    };
    const handleCancelNewGroupModal = () => {
        setIsModalNewGroupOpen(false);
    };

    return (
        <div>
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        titleColor: '#21201F',
                        titleFontSize: 24,
                        titleLineHeight: 1,
                        paddingMD: 0,
                        padding: 20,
                        paddingContentHorizontalLG: 0,
                    },
                    Menu:{
                        subMenuItemBg:'#FFFFFF',
                    }
                },
                token: {
                    borderRadiusLG: 8,
                    fontFamily:'Roboto'
                },
            }}
        >
            <Modal
                className="modalSettingGroup"
                visible={visible}
                onCancel={onCancel}
                footer={
                    <Button
                        className="buttonModalSetting"
                        onClick={onOk}
                        style={{}}
                    >Сохранить</Button>
                }
                width={400}
                style={{top: 0, right: 0, margin: 0}}
                title={<span className="titleModalSetting"><CloseOutlined className="closeBut" onClick={onCancel}
                                                                          style={{
                                                                              marginLeft: 'auto',
                                                                              cursor: 'pointer'
                                                                          }}/>Настройка групп</span>}
                closable={false}
                okText={'Сохранить'}
                bodyStyle={{padding: 0, height: '100%'}}
            >
                <div className="menuSetting">
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    lineType: 'none',
                                    motionDurationSlow: '0.2',
                                    iconMarginInlineEnd: 15,
                                    itemHoverBg:'#E2E8ED'
                                },
                            },
                        }}
                    >
                        <Menu
                            className="SettingGroupMenu"
                            triggerSubMenuAction="click"
                            mode="inline"
                            openKeys={stateOpenKeys}
                            expandIcon={false}
                            onOpenChange={(keys) => setStateOpenKeys(keys as string[])}>
                            {groups
                                .filter(group => group.uid !== '00000000-0000-0000-0000-000000000003')
                                .filter(group => group.uid !== '00000000-0000-0000-0000-000000000002')
                                .map((group) => (generateSubMenu(group)))}

                        </Menu>
                    </ConfigProvider>
                </div>
            </Modal>
        </ConfigProvider>
            <DeleteModalGroup visible={isModalDeleteModalGroup}
                              group={selectedGroup}
                              onOk={handleOkDeleteModal}
                              onCancel={handleCancelDeleteModal}/>
            <NewGroupModal2
                visible={isModalNewGroupOpen}
                onOk={handleOkNewGroupModal}
                onCancel={handleCancelNewGroupModal}
                group={newAddGroupName}
            />
        </div>
    );
};
export default SettingGroupModal;


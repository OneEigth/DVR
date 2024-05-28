import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, Input, Menu, Modal} from 'antd';
import './styleSettingModalGroup.css'
import {useGroupsStore} from "../../../store/groups/Groups";
import SubMenu from "antd/es/menu/SubMenu";
import IconLeftMenuAllDevice from "../../icons/iconLeftMenu/IconLeftMenuAllDevice";
import IconLeftMenu from "../../icons/iconLeftMenu/IconLeftMenu";
import {CloseOutlined, CheckOutlined} from "@ant-design/icons"
import {Group} from "../../../types/Group";
import DeleteModalGroup from "../deleteGroup/DeleteModalGroup";
import {useAuthStore} from "../../../store/auth/auth";
import {UpdateGroup} from "../../../api/groups/UpdateGroup";
import IconCheck from "../../icons/iconCheck/IconCheck";
import IconClose from "../../icons/iconClose/IconClose";

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
    const [isModalDeleteModalGroup, setIsModalDeleteModalGroup] = useState(false);
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
                return <IconLeftMenuAllDevice/>;
            default:
                return <IconLeftMenu />;
        }
    };

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

    const renderTitle = (entity: Group, isSubGroup = false) => (
        editingGroup === entity.uid ? (
            <div className="editGroup">
                <Input
                    className="input_EG"
                    value={isSubGroup ? newGroupName : newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                />
                <Button  onClick={() => handleSaveGroup(entity)}
                         className="button_EG"
                         icon={<IconCheck />}
                         style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#4D4E65",
                             width:"32px",
                             height:"32px",
                             marginLeft:"8px",
                             marginRight:"8px",
                             paddingLeft:"7px",
                             paddingRight:"7px"
                }}/>
                <Button  onClick={() => handleDeleteGroup(entity)}
                         className="button_EG"
                         icon={<IconClose />}
                         style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#4D4E65",
                             width:"32px",
                             height:"32px",
                             marginRight:"8px",
                             paddingLeft:"7px",
                             paddingRight:"7px"
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
                        subMenuItemBg:'#FFFFFF'
                    }
                },
                token: {
                    borderRadiusLG: 8,
                    fontFamily:'Roboto',
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
                                    iconMarginInlineEnd: 15
                                },
                            },
                        }}
                    >
                        <Menu
                            className="SettingGroupMenu"
                            triggerSubMenuAction="click"
                            mode="inline"
                            openKeys={stateOpenKeys}
                            onOpenChange={(keys) => setStateOpenKeys(keys as string[])}
                            style={{width: '234px'}}
                        >
                            {groups.filter(group => group.uid !== '00000000-0000-0000-0000-000000000003').map((group) => (

                                <SubMenu key={group.uid}
                                         onTitleClick={() => handleEditGroup(group)}
                                         title={renderTitle(group)}
                                         icon={getGroupIcon(group.uid)}>

                                    {group.sub_groups.map((subgroup) => (

                                        <SubMenu key={subgroup.uid}
                                                 title={renderTitle(subgroup, true)}
                                                 icon={<IconLeftMenu/>}
                                                 onTitleClick={() => handleEditGroup(subgroup)}
                                         />
                                    ))}
                                </SubMenu>
                            ))}
                        </Menu>
                    </ConfigProvider>
                </div>
            </Modal>
        </ConfigProvider>
            <DeleteModalGroup visible={isModalDeleteModalGroup}
                              group={selectedGroup}
                              onOk={handleOkDeleteModal}
                              onCancel={handleCancelDeleteModal}/>
        </div>
    );
};
export default SettingGroupModal;
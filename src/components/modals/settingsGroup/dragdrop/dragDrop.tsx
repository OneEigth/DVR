import React, {useEffect, useRef, useState} from 'react';
import {Button, ConfigProvider, Input, Menu, MenuRef, Modal} from 'antd';
import './styleDragDrop.css'
import {useGroupsStore} from "../../../../store/groups/Groups";
import SubMenu from "antd/es/menu/SubMenu";
import IconLeftMenuAllDevice from "../../../icons/iconLeftMenu/IconLeftMenuAllDevice";
import IconLeftMenu from "../../../icons/iconLeftMenu/IconLeftMenu";
import {CloseOutlined, CheckOutlined} from "@ant-design/icons"
import {Group} from "../../../../types/Group";
import DeleteModalGroup from "../../deleteGroup/DeleteModalGroup";
import {useAuthStore} from "../../../../store/auth/auth";
import {UpdateGroup} from "../../../../api/groups/UpdateGroup";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

interface SettingGroupModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}
const SettingGroupModalDD: React.FC<SettingGroupModalProps> = ({ visible, onOk, onCancel }) => {

    const { groups, fetchGroups} = useGroupsStore();
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [editingGroup, setEditingGroup] = useState<String | null>(null);
    const [newGroupName, setNewGroupName] = useState<string>('');
    const [isModalDeleteModalGroup, setIsModalDeleteModalGroup] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group>();
    const { user, SmartDVRToken } = useAuthStore();
    const menuRef = useRef<MenuRef>(null);

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
                    value={isSubGroup ? newGroupName : newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                />
                <Button type="link" onClick={() => handleSaveGroup(entity)} icon={<CheckOutlined />} />
                <Button danger onClick={() => handleDeleteGroup(entity)} icon={<CloseOutlined />} />
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

    const handleDragEnd = (result:any) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        // Обновите ваш массив groups в соответствии с новым порядком элементов
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <Menu
                        className="SettingGroupMenu"
                        triggerSubMenuAction="click"
                        mode="inline"
                        openKeys={stateOpenKeys}
                        onOpenChange={(keys) => setStateOpenKeys(keys as string[])}
                        style={{width: '234px'}}
                        {...provided.droppableProps}
                        ref={menuRef}
                    >
                        {groups.filter(group => group.uid !== '00000000-0000-0000-0000-000000000003').map((group, index) => (
                            <Draggable key={group.uid} draggableId={group.uid} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <SubMenu
                                            key={group.uid}
                                            onTitleClick={() => handleEditGroup(group)}
                                            title={renderTitle(group)}
                                            icon={getGroupIcon(group.uid)}
                                        >
                                            {group.sub_groups.map((subgroup, subIndex) => (
                                                <Draggable key={subgroup.uid} draggableId={subgroup.uid} index={subIndex}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <SubMenu
                                                                title={renderTitle(subgroup, true)}
                                                                icon={<IconLeftMenu/>}
                                                                onTitleClick={() => handleEditGroup(subgroup)}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </SubMenu>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Menu>
                )}
            </Droppable>
        </DragDropContext>

    );
};
export default SettingGroupModalDD;
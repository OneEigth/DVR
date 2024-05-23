import React, {useEffect, useState} from 'react';
import {MenuOutlined, SearchOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {Button, ConfigProvider, Input, Menu, MenuProps} from 'antd';
import './style/style.css'
import logo from "./style/Logo.png"
import {useGroupsStore} from '../../store/groups/Groups'
import {useDevicesStore} from '../../store/devices/allDevices'

import {useSelectedDevice} from "../../store/devices/SelectedDevice";
import {useNavigate} from "react-router-dom";
import {Device} from "../../types/Device";
import SubMenu from "antd/es/menu/SubMenu";
import IconLeftMenuDevice from "../icons/iconLeftMenu/IconLeftMenuDevice";
import IconLeftMenuUnsorded from "../icons/iconLeftMenu/IconLeftMenuUnsorded";
import {useLeftPartStateStore} from "../../store/leftPart/LeftPartStore";
import ButtonAddPlus from "../buttons/buttonAddPlus/ButtonAddPlus";
import NewGroupModal from "../modals/newGroup/NewGroupModal";
import IconLeftMenuAllDevice from "../icons/iconLeftMenu/IconLeftMenuAllDevice";
import IconLeftMenu from "../icons/iconLeftMenu/IconLeftMenu";

type MenuItem = Required<MenuProps>['items'][number];
type MenuItemType = 'group' | 'subgroup'; // Определение типов для MenuItem

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: MenuItemType,
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

interface LeftPartProps{
    leftMenuState:boolean;
}

const LeftPart: React.FC<LeftPartProps> = ({leftMenuState}) => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [collapsed, setCollapsed] = useState(leftMenuState);
    const { groups, fetchGroups } = useGroupsStore();
    const {devices, fetchDevices} = useDevicesStore();
    const navigate = useNavigate();
    const { setSelectedDevice } = useSelectedDevice();
    const {setSelectedStateLeftPart}=useLeftPartStateStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeviceClick = (device: Device) => {
        navigate(`/device/${device.UID}`);
        setSelectedDevice(device);
    };

    useEffect(() => {
        fetchGroups();
        fetchDevices();
    }, []);



    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        setSelectedStateLeftPart(collapsed);

    };


    const getGroupIcon = (uid:any) => {
        switch (uid) {
            case '00000000-0000-0000-0000-000000000003':
                return <IconLeftMenuAllDevice/>; // Ваша первая иконка
            case '00000000-0000-0000-0000-000000000002':
                return <IconLeftMenuUnsorded />; // Ваша вторая иконка
            default:
                return <IconLeftMenuDevice />; // Иконка по умолчанию
        }
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
            <div className="upLeftPart" style={{ width: collapsed ? '84px' : '240px' }} >
                <div className="buttonMenu">
                    <Button className="button"
                            onClick={toggleCollapsed}
                            style={{marginBottom: 12, border: 'none', backgroundColor: '#F1F1F1'}}
                            icon={<IconLeftMenu/>}/>
                    {collapsed ?
                        null
                        :
                        <>
                        {/*<h1 className="group_h1">Группы</h1>
                        <h1 className="count_h1">({groups.length})</h1>
                        <ButtonAddPlus onClick={showModal}/>*/}

                            <img src={logo} alt="" style={{width: 98.96, height: 32, marginBottom:12, marginLeft:0}}/>

                         </>
                    }

                </div>

                {/*<div className="Search">
                <Input
                        placeholder={collapsed ? "": "Поиск"}
                        style={{
                            display:'flex',
                            justifyContent:'center',
                            paddingLeft:11,
                            width: collapsed ? '36px' : '192px',
                            height: '32px',}}
                        suffix={<SearchOutlined style={{ marginLeft:'0px', padding:0, marginRight:'11px'}} />}
                    />*/}
                {/*</div>*/}

                <div>

                </div>

                <div>
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
                            className="LeftMenu"
                            triggerSubMenuAction="click"
                            mode="inline"
                            openKeys={stateOpenKeys}
                            onOpenChange={(keys) => setStateOpenKeys(keys as string[])} // Приведение типа, если необходимо
                            inlineCollapsed={collapsed}
                            style={{ width: collapsed ? '84px' : '234px' }}
                        >

                            {groups.map((group) => (
                                <SubMenu key={group.uid} title={collapsed ? '' : group.name} icon={getGroupIcon(group.uid)}>

                                    {/* Устройства в текущей группе */}
                                    {devices
                                        .filter((device) => device.groupUID === group.uid)
                                        .map((device) => (
                                            <Menu.Item
                                                key={device.UID}
                                                onClick={() => handleDeviceClick(device)}

                                                icon={<IconLeftMenuDevice/>}
                                            >

                                               {device.name}
                                            </Menu.Item>
                                        ))}

                                    {/* Подгруппы текущей группы */}
                                    {group.sub_groups.map((subgroup) => (
                                        <SubMenu key={subgroup.uid} title={subgroup.name}/*{collapsed ? '' : subgroup.name}*/ icon={<IconLeftMenuDevice/>} >
                                            {devices
                                                .filter((device) => device.groupUID === subgroup.uid)
                                                .map((device) => (
                                                    <Menu.Item
                                                        key={device.UID}
                                                        onClick={() => handleDeviceClick(device)}
                                                        icon={<IconLeftMenuDevice/>}
                                                    >

                                                        {device.name}
                                                    </Menu.Item>
                                                ))}
                                        </SubMenu>
                                    ))}
                                </SubMenu>
                            ))}
                        </Menu>
                    </ConfigProvider>
                </div>
                <NewGroupModal
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />
            </div>
    );
};

export default LeftPart;
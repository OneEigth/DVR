import React, {useEffect, useState} from 'react';
import {MenuOutlined, SearchOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {Button, ConfigProvider, Input, Menu, MenuProps} from 'antd';
import './style/style.css'
import {useGroupsStore} from '../../store/groups/Groups'
import {useDevicesStore} from '../../store/devices/allDevices'
import {useSelectedDevice} from "../../store/devices/SelectedDevice";
import {useNavigate} from "react-router-dom";
import {Device} from "../../types/Device";
import SubMenu from "antd/es/menu/SubMenu";
import IconLeftMenuDevice from "../icons/iconLeftMenu/IconLeftMenuDevice";
import IconLeftMenu from "../icons/iconLeftMenu/IconLeftMenu";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const LeftPart: React.FC = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [collapsed, setCollapsed] = useState(true);
    const { groups, fetchGroups } = useGroupsStore();
    const {devices, fetchDevices} = useDevicesStore();
    const navigate = useNavigate();
    const { setSelectedDevice } = useSelectedDevice();

    const handleDeviceClick = (device: Device) => {
        navigate(`/device/${device.UID}`);
        setSelectedDevice(device);
    };

    useEffect(() => {
        fetchGroups();
        fetchDevices();
    }, []);



    const items: MenuItem[] = groups.map((group) => {
        const groupDevices = devices.filter((device) => device.groupUID === group.uid);
        const childrenItems: MenuItem[] = groupDevices.map((device) => getItem(device.name, device.UID, <VideoCameraOutlined />));

        return getItem(
            group.name,
            group.uid,
            <MenuOutlined />,
            childrenItems,
            'group'
        );
    });

    interface LevelKeysProps {
        key?: string;
        children?: LevelKeysProps[];
    }

    const getLevelKeys = (items1: LevelKeysProps[]) => {

        const key: Record<string, number> = {};
        const func = (items2: LevelKeysProps[], level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    return func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };
    const levelKeys = getLevelKeys(items as LevelKeysProps[]);


    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
            <div className="upLeftPart" style={{ width: collapsed ? '84px' : '264px' }} >
                <div className="buttonMenu">
                    <Button className="button"
                            onClick={toggleCollapsed}
                            style={{marginBottom: 12, border: 'none', backgroundColor: '#F1F1F1'}}
                            icon={<IconLeftMenu />}/>
                </div>
                <div className="Search">
                    <Input
                        placeholder="поиск"
                        style={{
                            width: collapsed ? '32px' : '216px',
                            height: '32px',}}
                        suffix={<SearchOutlined style={{ marginLeft: collapsed ? '0' : '8px'}} />}
                    />
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
                            mode={collapsed ? 'inline' : 'inline'}
                            openKeys={stateOpenKeys}
                            onOpenChange={(keys) => setStateOpenKeys(keys as string[])} // Приведение типа, если необходимо
                            inlineCollapsed={collapsed}
                            style={{ width: collapsed ? '84px' : '264px' }}
                        >
                            {groups.map((group) => (
                                <SubMenu key={group.uid} title={group.name} >
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
                                </SubMenu>
                            ))}
                        </Menu>


                    </ConfigProvider>
                </div>
            </div>
    );
};

export default LeftPart;
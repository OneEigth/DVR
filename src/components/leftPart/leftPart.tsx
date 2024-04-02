import React, {useState} from 'react';
import {MenuOutlined, SearchOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {Button, ConfigProvider, Input, Menu, MenuProps} from 'antd';
import './style/style.css'

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

const items: MenuItem[] = [
    getItem('Группа камер 1', '1', <VideoCameraOutlined/>, [
        getItem('Камера', '11'),
        getItem('Камера', '12'),

    ]),
   /*getItem('Navigation Two', '2', <AppstoreOutlined />, [
        getItem('Option 1', '21'),
        getItem('Option 2', '22'),
        getItem('Submenu', '23', null, [
            getItem('Option 1', '231'),
            getItem('Option 2', '232'),
            getItem('Option 3', '233'),
        ]),
        getItem('Submenu 2', '24', null, [
            getItem('Option 1', '241'),
            getItem('Option 2', '242'),
            getItem('Option 3', '243'),
        ]),
    ]),
    */

    getItem('Группа камер 2', '3', <VideoCameraOutlined/>, [
        getItem('Камера', '31'),
        getItem('Камера', '32'),
        getItem('Камера', '33'),

    ]),
];

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

const App: React.FC = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [collapsed, setCollapsed] = useState(false);


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
            <div className="upLeftPart" style={{ width: collapsed ? '80px' : '264px' }} >
                <div className="buttonMenu">
                    <Button className="button"
                            onClick={toggleCollapsed}
                            style={{marginBottom: 12, border: 'none', backgroundColor: '#F1F1F1'}}
                            icon={<MenuOutlined/>}/>
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

                                },
                            },
                        }}
                    >
                    <Menu
                        className="LeftMenu"
                        mode="inline"

                        openKeys={stateOpenKeys}
                        onOpenChange={onOpenChange}
                        inlineCollapsed={collapsed}
                        items={items}
                        style={{ width: collapsed ? '80px' : '264px' }}
                    />
                    </ConfigProvider>
                </div>
            </div>
    );
};

export default App;
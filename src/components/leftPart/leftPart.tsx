import React, {useEffect, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {ConfigProvider, Input, Menu} from 'antd';
import './style/style.css'

import SubMenu from "antd/es/menu/SubMenu";
import IconLeftMenuDevice from "../icons/iconLeftMenu/IconLeftMenuDevice";
import IconLeftMenuUnsorded from "../icons/iconLeftMenu/IconLeftMenuUnsorded";
import ButtonAddPlus from "../buttons/buttonAddPlus/ButtonAddPlus";
import NewGroupModal from "../modals/newGroup/NewGroupModal";
import ButtonSettingGroup from "../buttons/buttonSettingGroup/ButtonSettingGroup";
import SettingGroupModal from "../modals/settingsGroup/SettingGroupModal";
import {useSelectedGroup} from "../../store/groups/SelectedGroup";
import {useGroupsStore} from '../../store/groups/Groups'
import ButtonAllDevices from "../buttons/buttonAllDevices/ButtonAllDevices";

const LeftPart: React.FC= () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const { groups, fetchGroups } = useGroupsStore();
    const {setSelectedGroup}=useSelectedGroup();
    const [isModalNewGroupOpen, setIsModalNewGroupOpen] = useState(false);
    const [isModalSettingGroupOpen, setIsModalSettingGroupOpen] = useState(false);
    const [searchText, setSearchText] = useState(''); // Состояние для текста поиска

    const handleGroupClick = (groupUID: string) => {
        setSelectedGroup(groupUID)
    };
    const handleAllDevices=()=>{
        const groupUID='00000000-0000-0000-0000-000000000003';
        setSelectedGroup(groupUID)
    }

    useEffect(() => {
        fetchGroups();
    }, []);

     const getGroupIcon = (uid:any) => {
        switch (uid) {
            case '00000000-0000-0000-0000-000000000002':
                return <IconLeftMenuUnsorded />; // Ваша вторая иконка
            default:
                return <IconLeftMenuDevice />; // Иконка по умолчанию
        }
    };

    const showModalNewGroup = () => {
        setIsModalNewGroupOpen(true);
    };

    const showModalSettingGroup = () => {
        setIsModalSettingGroupOpen(true);
    };

    const handleOkNewGroupModal = () => {
        setIsModalNewGroupOpen(false);
        fetchGroups();
    };

    const handleCancelNewGroupModal = () => {
        setIsModalNewGroupOpen(false);
    };

    const handleOkSettingGroupModal = () => {
        setIsModalSettingGroupOpen(false);
        fetchGroups();
    };

    const handleCancelSettingGroupModal = () => {
        setIsModalSettingGroupOpen(false);
    };

    const sortedGroups = groups.sort((a, b) => {
        if (a.uid === '00000000-0000-0000-0000-000000000002') return -1;
        if (b.uid === '00000000-0000-0000-0000-000000000002') return 1;
        return 0;
    });

    const filteredGroups = sortedGroups.filter(group => {
        if (searchText.trim() === '') return true;
        const groupMatches = group.name.toLowerCase().includes(searchText.toLowerCase());
        const subGroupMatches = group.sub_groups.some(subGroup =>
            subGroup.name.toLowerCase().includes(searchText.toLowerCase())
        );
        return groupMatches || subGroupMatches;
    });

    return (
            <div className="LeftPartSideMenu">
                <div className="buttonMenu">
                    <div className="bm_1">
                    <h1 className="group_h1">Группы</h1>
                    <h1 className="count_h1">({groups.length})</h1>
                    </div>
                    <div className="bm_2">
                    <ButtonAddPlus onClick={showModalNewGroup}/>
                    </div>
                </div>
                <div className="Search">
                    <Input
                        placeholder={"Поиск"}
                        className="Search_input"
                        suffix={<SearchOutlined style={{ marginLeft: '0px', padding: 0 }} />}
                        value={searchText} // Устанавливаем значение текста поиска
                        onChange={e => setSearchText(e.target.value)} // Обработчик изменения текста поиска
                    />
                    <ButtonSettingGroup onClick={showModalSettingGroup}/>
                </div>
                <div className="alldeviceButton">
                    <ButtonAllDevices onClick={handleAllDevices}/>
                </div>

                <div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    lineType: 'none',
                                    motionDurationSlow: '0.2',
                                    iconMarginInlineEnd: 15,
                                    itemHoverBg:'#D3DADF',
                                    subMenuItemBg:'#F1F1F1'
                                },
                            },
                            token: {
                                colorText:'#4D4E65'
                            }
                        }}
                    >
                        <Menu
                            className="LeftMenu"
                            triggerSubMenuAction="click"
                            mode="inline"
                            openKeys={stateOpenKeys}
                            onOpenChange={(keys) => setStateOpenKeys(keys as string[])} // Приведение типа, если необходимо

                            style={{ width: '234px' }}
                        >
                                {filteredGroups.filter(group => group.uid !== '00000000-0000-0000-0000-000000000003').map((group) => (
                                <SubMenu key={group.uid} title={group.name} icon={getGroupIcon(group.uid)}  onTitleClick={() => handleGroupClick(group.uid)}>
                                    {group.sub_groups.map((subgroup) => (
                                        <SubMenu key={subgroup.uid} title={subgroup.name} icon={<IconLeftMenuDevice/>} onTitleClick={() => handleGroupClick(subgroup.uid)}/>
                                    ))}
                                </SubMenu>
                            ))}
                        </Menu>
                    </ConfigProvider>
                </div>
                <NewGroupModal
                    visible={isModalNewGroupOpen}
                    onOk={handleOkNewGroupModal}
                    onCancel={handleCancelNewGroupModal}
                />
                <SettingGroupModal
                    visible={isModalSettingGroupOpen}
                    onOk={handleOkSettingGroupModal}
                    onCancel={handleCancelSettingGroupModal}
                />
            </div>
    );
};
export default LeftPart;
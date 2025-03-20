import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useGroupsStore} from "../../store/groups/Groups";
import {useSelectedGroup} from "../../store/groups/SelectedGroup";
import IconLeftMenuUnsorded from "../icons/iconLeftMenu/IconLeftMenuUnsorded";
import IconLeftMenuDevice from "../icons/iconLeftMenu/IconLeftMenuDevice";
import {Group} from "../../types/Group";
import {ConfigProvider,Input, Menu} from "antd";
import ButtonAddPlus from "../buttons/buttonAddPlus/ButtonAddPlus";
import {SearchOutlined,DownOutlined, UpOutlined} from "@ant-design/icons";
import ButtonSettingGroup from "../buttons/buttonSettingGroup/ButtonSettingGroup";
import ButtonAllDevices from "../buttons/buttonAllDevices/ButtonAllDevices";
import "./style.css"
import NewGroupModal from "../modals/newGroup/NewGroupModal";
import SettingGroupModal from "../modals/settingsGroup/SettingGroupModal";

const { SubMenu } = Menu;

const SideMenu: React.FC= () => {
    const { groups, fetchGroups } = useGroupsStore();
    const {selectedGroup,setSelectedGroup}=useSelectedGroup();
    const [isModalNewGroupOpen, setIsModalNewGroupOpen] = useState(false);
    const [isModalSettingGroupOpen, setIsModalSettingGroupOpen] = useState(false);
    const [searchText, setSearchText] = useState(''); // Состояние для текста поиска
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const handleGroupClick = (groupUID:any) => {
        setSelectedGroup(groupUID)
    };
    const handleAllDevices=()=>{
        const groupUID='00000000-0000-0000-0000-000000000003';
        setSelectedGroup(groupUID)
    }
    const fetchGroupsMemoized = useCallback(() => {
        if (groups.length === 0) {
            fetchGroups();
        }
    }, [fetchGroups, groups.length]);

    useEffect(() => {
        fetchGroupsMemoized();
    }, [fetchGroupsMemoized]);

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

    const sortedGroups = useMemo(() => {
        return [...groups].sort((a, b) => {
            if (a.uid === '00000000-0000-0000-0000-000000000002') return -1;
            if (b.uid === '00000000-0000-0000-0000-000000000002') return 1;
            return 0;
        });
    }, [groups]);

    const filteredGroups = useMemo(() => {
        return sortedGroups.filter(group => {
            if (searchText.trim() === '') return true;
            return group.name.toLowerCase().includes(searchText.toLowerCase()) ||
                group.sub_groups.some(subGroup => subGroup.name.toLowerCase().includes(searchText.toLowerCase()));
        });
    }, [sortedGroups, searchText]);

    const getAllSubGroups = useCallback((group: Group): Group[] => {
        let subGroups: Group[] = [];
        group.sub_groups.forEach(subGroup => {
            subGroups.push(subGroup);
            if (subGroup.sub_groups.length > 0) {
                subGroups = [...subGroups, ...getAllSubGroups(subGroup)];
            }
        });
        return subGroups;
    }, []);

    // Объединяем группы и подгруппы в один массив
    const allGroups: Group[] = [];
    groups.forEach(group => {
        allGroups.push(group);
        if (group.sub_groups) {
            allGroups.push(...getAllSubGroups(group));
        }

    });
    //Рекурсивная функция для генерации подменю, чтобы обрабатывать любые уровни вложенности подгрупп.
    const generateSubMenu = useCallback((group: Group): React.ReactNode => {
        const isSelected = selectedGroup === group.uid;
        return (
            <SubMenu
                key={group.uid}
                title={
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <>{group.name}</>
                        <>{group.sub_groups.length > 0 && (openKeys.includes(group.uid) ? <UpOutlined/> : <DownOutlined/>)}</>
                    </div>
                }
                icon={getGroupIcon(group.uid)}
                onTitleClick={() => handleGroupClick(group.uid)}
                style={{backgroundColor: isSelected ? '#D3DADF' : '#F1F1F1'}}>
                {group.sub_groups.map(subgroup => generateSubMenu(subgroup))}
            </SubMenu>
        );
    }, [selectedGroup, openKeys]);


    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return(
        <div className="SM_container">

            <div className="SM_buttons">
                <div className="SM_bm_1">
                    <h1 className="SM_group_h1">Группы</h1>
                    <h1 className="SM_count_h1">({allGroups.length})</h1>
                </div>
                <div className="SM_bm_2">
                    <ButtonAddPlus onClick={showModalNewGroup}/>
                </div>
            </div>

            <div className="SM_Search">
                <Input
                    placeholder={"Поиск"}
                    className="SM_Search_input"
                    suffix={<SearchOutlined style={{ marginLeft: '0px', padding: 0 }} />}
                    value={searchText} // Устанавливаем значение текста поиска
                    onChange={e => setSearchText(e.target.value)} // Обработчик изменения текста поиска

                />
                <ButtonSettingGroup onClick={showModalSettingGroup}/>
            </div>

            <div className="SM_alldeviceButton">
                <ButtonAllDevices onClick={handleAllDevices}/>
            </div>

            <div className="SM_place">
                <ConfigProvider
                    theme={{
                        components:{
                            Menu:{
                                lineType:'none',
                                itemSelectedColor:'',
                                subMenuItemBg:'#F1f1f1',
                                groupTitleColor:'#F1f1f1',

                            },
                        },
                    }}
                >
                <Menu
                    className ="SM_menu"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[selectedGroup]}
                    onSelect={({ key }) => handleGroupClick(key)}
                    expandIcon={false}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                >
                    {filteredGroups
                        .filter(group => group.uid !== '00000000-0000-0000-0000-000000000003')
                        .map((group) => generateSubMenu(group))}
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
}
export default SideMenu;
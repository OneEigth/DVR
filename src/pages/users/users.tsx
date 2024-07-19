import React, {useEffect, useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import {ConfigProvider, Input, Layout, Menu, MenuProps, Space, Table} from "antd";
import './style.css'
import ButtonAddPlus from "../../components/buttons/buttonAddPlus/ButtonAddPlus";
import ButtonAddPlus2 from "../../components/buttons/buttonAddPlus2/ButtonAddPlus2";
import ButtonFilterRS from "../../components/buttons/buttonFilter2/ButtonFilterRS";
import {SearchOutlined} from "@ant-design/icons";
import {useUserStore} from "../../store/users/UserStore";
import IconLeftMenuFooter from "../../components/icons/iconLeftMenu/IconLeftMenuFooter";
import {useSelectedRowKeys2} from "../../store/devices/useSelectedRowKeys2";
import {User} from "../../types/User";
import ButtonLeftMenuFooterDelete from "../../components/buttons/buttonLeftMenu/ButtonLeftMenuFooterDelete";
import ButtonLeftMenuFooterEdit from "../../components/buttons/buttonLeftMenu/ButtonLeftMenuFooterEdit";
import {useMenuUsersState} from "../../store/users/useMenuUsersState";
import {useOwnerStore} from "../../store/owner/useOwnerStore";
import {Owner} from "../../types/Owner";
import NewUserModal from "../../components/modals/userModals/newUser/NewUserModal";
import DeleteUserModal from "../../components/modals/userModals/GroupDeleteUser/DeleteUser";
import UpdateUserModal from "../../components/modals/userModals/EditUser/UpdateUserModal";


const { Header, Content, Footer} = Layout;

const Users: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('users');
    const [searchText, setSearchText] = useState(''); // Состояние для текста поиска
    const { users, fetchUsers } = useUserStore();
    const { owners, fetchOwners } = useOwnerStore();
    const [pageSize, setPageSize]=useState(10);
    const [page, setPage]=useState(1);
    const [showAddUserModal, setShowAddUserModal]=useState(false)
    const [showDeleteUserModal, setShowDeleteUserModal]=useState(false)
    const [showUpdateUserModal, setShowUpdateUserModal]=useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const {selectedRowKeys2, setSelectedRowKeys2} = useSelectedRowKeys2();
    const [current, setCurrent] = useState('users');
    const {selectedStateMenuUsers,setSelectedStateMenuUsers}=useMenuUsersState();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e.key);
        setCurrent(e.key);
        setSelectedStateMenuUsers(e.key)
    };



    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: 'Пользователь',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Группа',
            dataIndex: 'groups',
            key: 'groups',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
        },

    ];

    useEffect(() => {
        fetchOwners(page, pageSize);
    }, []);

    const columns2 = [
        {
            title: 'ФИО сотрудника / Гос. номер машины',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Тип',
            dataIndex: 'car',
            key: 'car',
        },

    ];

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const handleAddUser = () => {
        setShowAddUserModal(true)
    };
    const handleAddOwner = () => {

    };

    const handleFilter = () => {

    };
    const showDeleteDeviceModal = () => {
        setShowDeleteUserModal(true)
    };


    //row selections

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys2(newSelectedRowKeys);
    };


    const rowSelection = {
        selectedRowKeys2,
        onChange: onSelectChange,
    };

    const handleDeviceClick = (user: User) => {
        setSelectedUser(user)
        setShowUpdateUserModal(true)
    };
    const handleDeviceClick2 = (owner: Owner) => {
        /*navigate(`/device/${device.name}`);
        setSelectedDevice(device);*/
    };

    const items: MenuProps['items'] = [
        {
            label: (<div className="Users">
                <h1 className="name">Сотрудники</h1>
                <h1 className="count">({users.length})</h1>
                <ButtonAddPlus onClick={handleAddUser}/>
            </div>),
            key: 'users'
        },

        {
            label: (<div className="Owners">
                <h1 className="name">Владельцы</h1>
                <h1 className="count">({owners.length})</h1>
                <ButtonAddPlus2 onClick={handleAddOwner}/>
            </div>),
            key: 'owners',
        }
    ];

    //addUserModal
    const handleOkUserModal = () => {
        fetchUsers();
        setShowAddUserModal(false)
    };
    const handleCancelUserModal = () => {
        setShowAddUserModal(false)
    };

    //deleteUserModal
    const handleOkDeleteModal = () => {
        fetchUsers();
        setShowDeleteUserModal(false)
    };
    const handleCancelDeleteModal = () => {
        setShowDeleteUserModal(false)
    };

    //updateUserModal
    const handleOkUpdateModal = () => {
        fetchUsers();
        setShowUpdateUserModal(false)
    };
    const handleCancelUpdateModal = () => {
        setShowUpdateUserModal(false)
    };


    return (
        <Layout>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingLeft:0,
                paddingRight:0
            }}>
                <div className="menu">
                    <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
                </div>
            </Header>
            <Layout style={{ height: '100vh' }}>
                <Content style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    overflowY: 'auto',
                }}>
                    <div className="headerTable">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Menu: {
                                        itemPaddingInline: 0,
                                        horizontalItemSelectedColor: '#FCE49C',
                                        activeBarHeight: 4
                                    },
                                },
                            }}
                        >
                            <div className="left_HT">
                                <Menu className="menuLine" onClick={onClick} selectedKeys={[current]} mode="horizontal"
                                      items={items}/>
                            </div>
                        </ConfigProvider>


                        <div className="right_HT">
                            <Input
                                placeholder={"Поиск"}
                                className="right_HT_input"
                                suffix={<SearchOutlined style={{marginLeft: '0px', padding: 0}}/>}
                                value={searchText} // Устанавливаем значение текста поиска
                                onChange={e => setSearchText(e.target.value)} // Обработчик изменения текста поиска
                            />
                            <ButtonFilterRS onClick={handleFilter}/>
                        </div>
                    </div>
                    { selectedStateMenuUsers==="users" ?
                    <div className="tableUsers" style={{ flex: 1, overflow: 'hidden' }}>
                        <Table
                            columns={columns}
                            dataSource={users}
                            pagination={false}
                            rowKey="uid"
                            rowSelection={rowSelection}
                            onRow={(record) => ({
                                onClick: () => handleDeviceClick(record),
                            })}
                        />
                    </div>
                        :
                    <div className="tableOwners"  style={{ flex: 1, overflow: 'hidden' }}>
                        <Table
                            columns={columns2}
                            dataSource={owners}
                            pagination={false}
                            rowKey="UID"
                            rowSelection={rowSelection}
                            onRow={(record) => ({
                                onClick: () => handleDeviceClick2(record),
                            })}
                        />
                    </div>
            }
                </Content>
            </Layout>

            <Footer style={{

                display: (Object.entries(selectedRowKeys2).length ? 'initial' : 'none'),
                alignItems: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                background: '#ffffff',
                position: 'sticky',
                bottom: 0,
                height: 56,
                padding: 0,
                marginLeft: 24,
                marginRight: 24,
            }}>
                <div className="tableFooter">
                    <span className="countDeviceFooter"><IconLeftMenuFooter/><h3 className="h3Footer">Выбрано: {Object.entries(selectedRowKeys2).length}</h3></span>
                    <div>
                        <ButtonLeftMenuFooterEdit onClick={showDeleteDeviceModal}/>
                        <ButtonLeftMenuFooterDelete onClick={showDeleteDeviceModal}/>
                    </div>
                </div>
            </Footer>
                <NewUserModal visible={showAddUserModal} onOk={handleOkUserModal} onCancel={handleCancelUserModal}/>
                <DeleteUserModal visible={showDeleteUserModal} users={selectedRowKeys2} onOk={handleOkDeleteModal} onCancel={handleCancelDeleteModal}/>
                <UpdateUserModal visible={showUpdateUserModal} onCancel={handleCancelUpdateModal} onOk={handleOkUpdateModal} selectedUser={selectedUser}/>
        </Layout>
    );};


export default Users;

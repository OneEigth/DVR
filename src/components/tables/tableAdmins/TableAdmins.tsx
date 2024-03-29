

import React, { useEffect } from 'react';
import { Table, Space } from 'antd';
import { useAdmins } from '../../../store/users/Admins';
import { User } from '../../../types/User';
import './style/style.css'

const TableAdmins: React.FC = () => {
    const { users, fetchUsers } = useAdmins();

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'uid',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: 'token',
            dataIndex: 'token',
            key: 'token',
        },
        {
            title: 'login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'is_admin',
            dataIndex: 'is_admin',
            key: 'is_admin',
            render: (is_admin: boolean) => (is_admin ? 'Да' : 'Нет'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User) => ( // Указываем явно тип параметра record
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return <Table className="table" columns={columns} dataSource={users} />;
};

export default TableAdmins;

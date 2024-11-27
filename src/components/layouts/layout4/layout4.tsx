import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import {Device} from '../../../types/Device'; // Импортируйте свои типы
import {LayoutType} from "../../../types/LayoutType";

interface LayoutTableProps {
    layouts: LayoutType[];
    onLayoutUpdate: () => void;
}

const LayoutTable: React.FC<LayoutTableProps> = ({ layouts }) => {

    const expandedRowRender = (layout: LayoutType) => {
        const columns: TableColumnsType<Device> = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Model', dataIndex: 'model', key: 'model' },
            { title: 'Group', dataIndex: 'groupName', key: 'groupName' },
            {
                title: 'Status',
                key: 'status',
                render: (device: Device) => (
                    <Badge status={device.online ? "success" : "error"} text={device.online ? "Online" : "Offline"} />
                ),
            },
            {
                title: 'Battery Level',
                key: 'battery_level',
                dataIndex: 'battery_level',
                render: (level: number) => `${level}%`,
            },
            {
                title: 'Action',
                key: 'operation',
                render: () => (
                    <Space size="middle">
                       {/* <a>View</a>
                        <a>Edit</a>
                        <Dropdown menu={{ items: [{ key: '1', label: 'Action 1' }, { key: '2', label: 'Action 2' }] }}>
                            <a>
                                More <DownOutlined />
                            </a>
                        </Dropdown>*/}
                    </Space>
                ),
            },
        ];

        return <Table columns={columns} dataSource={layout.devices} pagination={false} rowKey="UID" />;
    };

    const columns: TableColumnsType<LayoutType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'View Type', dataIndex: 'viewType', key: 'viewType' },
        { title: 'User', dataIndex: 'userName', key: 'userName' },
    ];

    return (
        <>
            <Table
                columns={columns}
                expandable={{ expandedRowRender, rowExpandable: record => record.devices.length > 0 }}
                dataSource={layouts}
                size="middle"
                rowKey="uid"
                pagination={false}
            />
        </>
    );
};

export default LayoutTable;

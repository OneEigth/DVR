import React, { useEffect, useState } from 'react';
import { useDevicesStore } from '../../../../../store/devices/allDevices';
import {Button, ConfigProvider, Table, TableColumnsType} from 'antd';
import type { Key } from 'antd/lib/table/interface';
import {useNavigate} from "react-router-dom";


interface DeviceData {
    key: Key;
    name: string;
    description: string;
    model: string;
    groupUID: string;
    DID: string;
    UID:string
}


interface AllDevicesSmallProps {
    onSelectDevice: (selectedUID: string) => void;
}


const AllDevicesSmall: React.FC<AllDevicesSmallProps> = ({onSelectDevice} ) => {
    const { devices, fetchDevices } = useDevicesStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [deviceData, setDeviceData] = useState<DeviceData[]>([]); // State to store DeviceData
    const navigate = useNavigate();

    const handleDeviceClick = (deviceId: string) => {
        navigate(`/device/${deviceId}`);
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    useEffect(() => {
        // Convert devices to DeviceData format
        const formattedDevices = devices.map(device => ({
            key: device.ID, // Assuming device has an id property
            name: device.name,
            description: device.description,
            model: device.model,
            groupUID: device.groupUID,
            DID: device.DID,
            UID: device.UID,
        }));
        setDeviceData(formattedDevices);
    }, [devices]); // Update when devices change


    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DeviceData[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DeviceData) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };


    const columns:TableColumnsType<DeviceData> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: DeviceData) => (
                <Button type="link" onClick={() => handleDeviceClick(record.UID)}>
                    {text}
                </Button>),
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Модель',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Группа',
            dataIndex: 'groupUID',
            key: 'groupUID',
        },
        {
            title: 'Серийный номер',
            dataIndex: 'DID',
            key: 'DID',
        },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = deviceData.slice(startIndex, startIndex + pageSize);

    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 0,
                },
            }}
        >
            <Table
                className="table"
                columns={columns}
                dataSource={devicesOnPage}
                pagination={false}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
            />
        </ConfigProvider>
    );
};

export default AllDevicesSmall;

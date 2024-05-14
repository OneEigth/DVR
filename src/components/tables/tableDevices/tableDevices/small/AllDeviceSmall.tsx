import React, { useEffect, useState } from 'react';
import { useDevicesStore } from '../../../../../store/devices/allDevices';
import {Button, ConfigProvider, Table, TableColumnsType} from 'antd';
import type { Key } from 'antd/lib/table/interface';
import {useNavigate} from "react-router-dom";
import {useSelectedDevice} from "../../../../../store/devices/SelectedDevice";
import {Device} from "../../../../../types/Device";

interface AllDevicesSmallProps {
    onSelectDevice: (selectedUID: string) => void;
}

const AllDevicesSmall: React.FC<AllDevicesSmallProps> = ({onSelectDevice} ) => {
    const { devices, fetchDevices } = useDevicesStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [deviceData, setDeviceData] = useState<Device[]>([]); // State to store DeviceData
    const navigate = useNavigate();
    const {setSelectedDevice} = useSelectedDevice();

    const handleDeviceClick = (device: Device) => {
        navigate(`/device/${device.UID}`);
        setSelectedDevice(device);
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    useEffect(() => {
        // Преобразуем устройства в формат Device
        const formattedDevices: Device[] = devices.map(device => ({
            ID: device.ID,
            UID: device.UID,
            DID: device.DID,
            groupUID: device.groupUID,
            name: device.name,
            description: device.description,
            model: device.model,
            pulse_time: device.pulse_time,
            latitude: device.latitude,
            longitude: device.longitude,
            battery_percent: device.battery_percent,
            ownerUID: device.ownerUID,
            online: device.online,
            connectState:device.connectState,
        }));
        setDeviceData(formattedDevices);
    }, [devices]);


    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Device[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: Device) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };


    const columns:TableColumnsType<Device> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Device) => (
                <Button type="link" onClick={() => handleDeviceClick(record)}>
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

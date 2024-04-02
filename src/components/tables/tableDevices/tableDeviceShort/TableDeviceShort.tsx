import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { useDevicesStore } from '../../../../store/devices/allDevices';
import ButtonPlay from '../../../buttons/buttonPlay/ButtonPlay';
import '../style/style.css';
import 'leaflet/dist/leaflet.css';

const TableDevices: React.FC = () => {
    const { devices, fetchDevices } = useDevicesStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedUID, setSelectedUID] = useState<string | null>('41774cd9-476c-3d7e-a4f2-99b9a1cb9361');

    useEffect(() => {
        fetchDevices();
    }, []);

    const handlePlay = (uid: string) => {
        setSelectedUID(uid);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Battery Percent',
            dataIndex: 'battery_percent',
            key: 'battery_percent',
        },
        {
            title: 'Owner UID',
            dataIndex: 'ownerUID',
            key: 'ownerUID',
        },
        {
            title: 'online',
            dataIndex: 'online',
            key: 'online',
            render: (online: boolean) => (online ? 'Да' : 'Нет'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <ButtonPlay onClick={() => handlePlay(record.UID)} />
                </Space>
            ),
        },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = devices.slice(startIndex, startIndex + pageSize);

    return (
        <div className="tableContainer">
            <div className="video">
                {/* Здесь вы можете добавить логику для отображения видео по выбранному UID */}
                <img className="img" src={`http://178.91.130.237:7687/play/online/${selectedUID}`} alt="img" />
            </div>
            <div className="tablePlace">
                <Table className="table" columns={columns} dataSource={devicesOnPage} pagination={false} />
            </div>
        </div>
    );
};

export default TableDevices;

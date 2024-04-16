import React, {useEffect, useState} from 'react';
import {Card, Empty, Space, Table} from 'antd';
import {useDevicesStore} from '../../../../store/devices/allDevices';
import ButtonPlay from '../../../buttons/buttonPlay/ButtonPlay';
import '../style/style.css';
import 'leaflet/dist/leaflet.css';
import ButtonMap from "../../../buttons/buttonLocation/ButtonLocation";
import LocationMap from "../../../locationMap/LocationMap";
import SwitchOnline from "../../../switch/switchOnline";
import { ONLINE_PLAY_URL } from '../../../../const/const';

const TableDevicesShort: React.FC = () => {
    const { devices, fetchDevices } = useDevicesStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedUID, setSelectedUID] = useState<string | null>(null);
    const [selectedLatitude, setSelectedLatitude] = useState<number | null>(null);
    const [selectedLongitude, setSelectedLongitude] = useState<number | null>(null);
    const [center, setCenter] = useState<[number, number]>([51.154697, 71.431324]);
    const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);

    useEffect(() => {
        fetchDevices();
    }, []);

    const handlePlay = (uid: string) => {
        setSelectedUID(uid);
    };

    const handleLocate = (latitude: number, longitude: number) => {
        setSelectedLatitude(latitude);
        setSelectedLongitude(longitude);
        setCenter([latitude, longitude]);
    }

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
                    <ButtonMap onClick={() => handleLocate(record.latitude, record.longitude)}/>
                </Space>
            ),
        },
    ];

    const filteredDevices = showOnlineOnly ? devices.filter(device => device.online) : devices;
    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = filteredDevices.slice(startIndex, startIndex + pageSize);

    return (
        <Card
            style={{margin:'5px'}}
        >
            <div className="container">
                <Space direction='horizontal'>
                    <div className="Map">
                        <LocationMap devices={devices} center={center} selectedCoordinates={center} />
                    </div>
                    <Space direction='vertical'>
                        {selectedUID && (
                            <Card
                                style={{width: '900px', height: '400px'}}
                                className="cardVideo"
                            >
                                <img
                                    className="video"
                                    src={ONLINE_PLAY_URL(selectedUID)}
                                    alt="img"
                                    style={{width: '850px', height: '350px'}}
                                />
                            </Card>
                        )}
                        {!selectedUID && (
                            <Card
                                style={{width: '900px', height: '400px'}}
                                className="PlaceHolderVideo">
                                <Empty
                                    style={{display:'flex', justifyContent:'center', alignContent:'center', paddingTop:'100px'}}
                                    className="Empty"/>
                            </Card>
                        )}
                        <Card>
                            <Space className="tools">
                                <h1>Online</h1>
                                <SwitchOnline

                                    onChange={setShowOnlineOnly}/>

                            </Space>
                        </Card>
                        <Card
                            style={{width: '900px', height: '265px'}}
                            className="PlaceHolderTable"
                        >
                            <Table className="table" columns={columns} dataSource={devicesOnPage} pagination={false}/>
                        </Card>
                    </Space>
                </Space>
            </div>
        </Card>
    );
};

export default TableDevicesShort;

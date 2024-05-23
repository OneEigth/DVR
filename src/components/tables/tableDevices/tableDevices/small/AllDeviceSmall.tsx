import React, { useEffect, useState } from 'react';
import { useDevicesStore } from '../../../../../store/devices/allDevices';
import {Button, ConfigProvider, Table, TableColumnsType} from 'antd';
import type { Key } from 'antd/lib/table/interface';
import {useNavigate} from "react-router-dom";
import {useSelectedDevice} from "../../../../../store/devices/SelectedDevice";
import {Device} from "../../../../../types/Device";
import './style/style.css'
import IconLeftMenuFooter from "../../../../icons/iconLeftMenu/IconLeftMenuFooter";
import ButtonLeftMenuFooterEdit from "../../../../buttons/buttonLeftMenu/ButtonLeftMenuFooterEdit";
import ButtonLeftMenuFooterDelete from "../../../../buttons/buttonLeftMenu/ButtonLeftMenuFooterDelete";

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
        navigate(`/device/${device.name}`); 
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
    /*const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Device[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: Device) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };*/


    const columns:TableColumnsType<Device> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            /*render: (text: string, record: Device) => (
                <Button type="link" onClick={() => handleDeviceClick(record)}>
                    {text}
                </Button>),*/
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

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const handleDeviceDelete = () => {

    };

    const handleDeviceEdit = () => {

    };

    return (
        <div className="smallTAbl">
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 0,
                    colorPrimary:'#4D4E65',


                },
                components: {
                    Table: {
                        rowHoverBg:'#F4F6F7',
                        rowSelectedHoverBg:'#F4F6F7',
                        rowSelectedBg:'#E8EBED'

                    },
                },
            }}
        >
            <Table
                className="table"
                columns={columns}
                dataSource={devicesOnPage}
                pagination={false}
                rowKey="UID"
                rowSelection={rowSelection}
                onRow={(record) => ({
                    onClick: () => handleDeviceClick(record),
                })}

            />

        </ConfigProvider>

                <div className="tableFooter">
                    <span className="countDeviceFooter"><IconLeftMenuFooter/><h3 className="h3Footer">Выбрано: {selectedRowKeys.length}</h3></span>
                    <div>

                            <ButtonLeftMenuFooterEdit onClick={handleDeviceEdit}/>

                        <ButtonLeftMenuFooterDelete onClick={handleDeviceDelete}/>
                    </div>
                </div>

        </div>
    );
};

export default AllDevicesSmall;

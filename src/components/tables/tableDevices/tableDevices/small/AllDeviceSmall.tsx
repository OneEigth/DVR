import React, {useEffect, useState} from 'react';
import {ConfigProvider, Table, TableColumnsType} from 'antd';
import {useNavigate} from "react-router-dom";
import {useSelectedDevice} from "../../../../../store/devices/SelectedDevice";
import {Device} from "../../../../../types/Device";
import './style/style.css'

import {DeviceByGroupStore} from "../../../../../store/devices/DeviceByGroupStore";
import {useSelectedGroup} from "../../../../../store/groups/SelectedGroup";
import {useAuthStore} from "../../../../../store/auth/auth";
import DeleteDeviceModal from "../../../../modals/deleteDevice/DeleteDeviceModal";
import {useDevicesStore} from "../../../../../store/devices/allDevices";
import EditDeviceGroup from "../../../../modals/editDeviceGroup/EditDeviceGroup";
import {useIsDeviceAdded} from "../../../../../store/devices/isDeviceAdded";
import {useSelectedRowKeys} from "../../../../../store/devices/useSelectedRowKeys";
import {useButtonsFromAllcams} from "../../../../../store/devices/useButtonsFromAllcams";
import IconOnline from "../../../../icons/iconOnline/IconOnline";
import IconOffline from "../../../../icons/iconOffline/IconOffline";
import {useSelectedDeviceCount} from "../../../../../store/devices/useSelectedDevices";


interface AllDevicesSmallProps {
    searchText:string;
}

const AllDevicesSmall: React.FC<AllDevicesSmallProps> = ({ searchText}) => {
    const { devicesByStore, fetchDevicesByStore } = DeviceByGroupStore();
    const {devices,fetchDevices} = useDevicesStore();
    const {selectedRowKeys, setSelectedRowKeys} = useSelectedRowKeys();
    const [deviceData, setDeviceData] = useState<Device[]>([]); // State to store DeviceData
    const navigate = useNavigate();
    const {setSelectedDevice} = useSelectedDevice();
    const {selectedGroup}=useSelectedGroup();
    const {user,SmartDVRToken}=useAuthStore();
    const {isDeviceAdded,setIsDeviceAdded} = useIsDeviceAdded();
    const {isDeleteDeviceModal, setIsDeleteDeviceModal} = useButtonsFromAllcams();
    const {isEditDeviceGroupModal, setIsEditDeviceGroupModal} =useButtonsFromAllcams();
    const {selectedDeviceCount,setSelectedDeviceCount}=useSelectedDeviceCount();
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);


    const handleDeviceClick = (device: Device) => {
        navigate(`/device/${device.name}`); 
        setSelectedDevice(device);
    };




    useEffect(() => {
        if (isDeviceAdded) {
            updateDeviceList();
        }
    }, [isDeviceAdded]);

    const updateDeviceList = () => {
        if (selectedGroup === '00000000-0000-0000-0000-000000000003') {
            fetchDevices();
        } else if (user?.login) {
            fetchDevicesByStore(selectedGroup, SmartDVRToken, user.login);
        }
        setIsDeviceAdded(false);
    };

    useEffect(() => {
        updateDeviceList();
    }, [selectedGroup, fetchDevices, fetchDevicesByStore, user?.login, SmartDVRToken]);


    useEffect(() => {
        if (selectedGroup === '00000000-0000-0000-0000-000000000003') {
            fetchDevices();
            setIsDeviceAdded(false);
        } else if (user?.login) {
            fetchDevicesByStore(selectedGroup, SmartDVRToken, user.login);
            setIsDeviceAdded(false);
        }

    }, [selectedGroup, fetchDevices, fetchDevicesByStore, user?.login, SmartDVRToken]);

    useEffect(() => {
        let formattedDevices: Device[] = [];
        if (selectedGroup === '00000000-0000-0000-0000-000000000003') {
            formattedDevices = devices.map(device => ({
                ID: device.ID,
                UID: device.UID,
                DID: device.DID,
                groupUID: device.groupUID,
                groupName:device.groupName,
                name: device.name,
                description: device.description,
                model: device.model,
                pulse_time: device.pulse_time,
                latitude: device.latitude,
                longitude: device.longitude,
                battery_level: device.battery_level,
                ownerUID: device.ownerUID,
                online: device.online,
                connectionState: device.connectionState,
                memory:device.memory,
                storageInfo:device.storageInfo,
                signal_level:device.signal_level
            }));
        } else {
            formattedDevices = devicesByStore.map(device => ({
                ID: device.ID,
                UID: device.UID,
                DID: device.DID,
                groupUID: device.groupUID,
                groupName:device.groupName,
                name: device.name,
                description: device.description,
                model: device.model,
                pulse_time: device.pulse_time,
                latitude: device.latitude,
                longitude: device.longitude,
                battery_level: device.battery_level,
                ownerUID: device.ownerUID,
                online: device.online,
                connectionState: device.connectionState,
                memory:device.memory,
                storageInfo:device.storageInfo,
                signal_level:device.signal_level,


            }));
        }
        setDeviceData(formattedDevices);
    }, [devices, devicesByStore, selectedGroup]);


    const handleOkDeleteDeviceModal = () => {
        setIsDeleteDeviceModal(false);
        updateDeviceList();
    };
    const handleOkEditDeviceGroup = () => {
        setIsEditDeviceGroupModal(false);
        updateDeviceList();
    };
    const handleCancelEditDeviceGroup = () => {
        setIsEditDeviceGroupModal(false);
    };
    const handleCancelDeleteDeviceModal = () => {
        setIsDeleteDeviceModal(false);
        console.log("allDevice ", isDeleteDeviceModal)
    };

    useEffect(() => {
    // Фильтрация устройств на основе текста поиска
    const filtered = deviceData.filter(device =>
        device.name.toLowerCase().includes(searchText.toLowerCase()) ||
        device.description.toLowerCase().includes(searchText.toLowerCase()) ||
        device.model.toLowerCase().includes(searchText.toLowerCase()) ||
        device.groupName.toLowerCase().includes(searchText.toLowerCase()) ||
        device.DID.toLowerCase().includes(searchText.toLowerCase())
    );
        setFilteredDevices(filtered)
        setSelectedDeviceCount(filteredDevices.length);

    }, [searchText, deviceData, setSelectedDeviceCount, filteredDevices]);


    const columns:TableColumnsType<Device> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            render: ((text: string, record: Device) => (
                <span>
                {record.online ? (
                    <IconOnline style={{ marginRight: 8 }} />
                ) : (
                    <IconOffline style={{ marginRight: 8 }} />
                )}
                    {text}
            </span>
            ))
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
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: 'Серийный номер',
            dataIndex: 'DID',
            key: 'DID',
        },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className="smallTAbl">
            <div className="table_container">
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
                        dataSource={filteredDevices}
                        pagination={false}
                        rowKey="UID"
                        rowSelection={rowSelection}
                        onRow={(record) => ({
                            onClick: () => handleDeviceClick(record),
                        })}


                    />
                </ConfigProvider>
            </div>


            {hasSelected ?
                ''
                :
                ''}

            <DeleteDeviceModal  visible={isDeleteDeviceModal}
                                device={selectedRowKeys}
                                onOk={handleOkDeleteDeviceModal}
                                onCancel={handleCancelDeleteDeviceModal}
            />
            <EditDeviceGroup visible={isEditDeviceGroupModal}
                             onOk={handleOkEditDeviceGroup}
                             onCancel={handleCancelEditDeviceGroup}
                             device={selectedRowKeys}
            />
        </div>

    );
};

export default AllDevicesSmall;

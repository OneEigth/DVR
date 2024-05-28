import React, {useEffect, useState} from 'react';
import {ConfigProvider, Table, TableColumnsType} from 'antd';
import type {Key} from 'antd/lib/table/interface';
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


    const handleDeviceClick = (device: Device) => {
        navigate(`/device/${device.name}`); 
        setSelectedDevice(device);
    };

    console.log("AllDeviceSmall ",isDeviceAdded);

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
                name: device.name,
                description: device.description,
                model: device.model,
                pulse_time: device.pulse_time,
                latitude: device.latitude,
                longitude: device.longitude,
                battery_percent: device.battery_percent,
                ownerUID: device.ownerUID,
                online: device.online,
                connectState: device.connectState,
            }));
        } else {
            formattedDevices = devicesByStore.map(device => ({
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
                connectState: device.connectState,
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

    // Фильтрация устройств на основе текста поиска
    const filteredDevices = deviceData.filter(device =>
        device.name.toLowerCase().includes(searchText.toLowerCase()) ||
        device.description.toLowerCase().includes(searchText.toLowerCase()) ||
        device.model.toLowerCase().includes(searchText.toLowerCase()) ||
        device.groupUID.toLowerCase().includes(searchText.toLowerCase()) ||
        device.DID.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns:TableColumnsType<Device> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
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

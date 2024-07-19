import React, {useEffect, useState} from 'react';
import './style/style.css';
import 'leaflet/dist/leaflet.css';
import CardComponent from '../../../../cards/cardComponentMedium/CardComponent';
import {Col, Row} from "antd";
import {useDevicesStore} from "../../../../../store/devices/allDevices";
import {DeviceByGroupStore} from "../../../../../store/devices/DeviceByGroupStore";
import {useSelectedGroup} from "../../../../../store/groups/SelectedGroup";
import {useAuthStore} from "../../../../../store/auth/auth";
import {Device} from "../../../../../types/Device";

interface AllDevicesMediumProps {
    searchText:string;
}

const AllDevicesMedium: React.FC<AllDevicesMediumProps> = ({searchText}) => {
    const {devices, fetchDevices} = useDevicesStore(); // Получаем список устройств и метод для загрузки
    const { devicesByStore, fetchDevicesByStore } = DeviceByGroupStore();
    const {selectedGroup}=useSelectedGroup();
    const {user,SmartDVRToken}=useAuthStore();
    const [deviceData, setDeviceData] = useState<Device[]>([]); // State to store DeviceData




    useEffect(() => {
        if (selectedGroup === '00000000-0000-0000-0000-000000000003') {
            fetchDevices();
        } else if (user?.login) {
            fetchDevicesByStore(selectedGroup, SmartDVRToken, user.login);
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
                ownerName: device.ownerName,
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
                ownerName: device.ownerName,
                online: device.online,
                connectionState: device.connectionState,
                memory:device.memory,
                storageInfo:device.storageInfo,
                signal_level:device.signal_level
            }));
        }
        setDeviceData(formattedDevices);
    }, [devices, devicesByStore, selectedGroup]);

    const filteredDevices = deviceData.filter(device =>
        device.name.toLowerCase().includes(searchText.toLowerCase()) ||
        device.description.toLowerCase().includes(searchText.toLowerCase()) ||
        device.model.toLowerCase().includes(searchText.toLowerCase()) ||
        device.groupName.toLowerCase().includes(searchText.toLowerCase()) ||
        device.DID.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleViewVideo = (uid: string) => {
        console.log('View video for UID:', uid);
    };
    return (

    <div className="allDeviceMedium">
        <Row gutter={[16, 16]}>
            {filteredDevices.map((device: any) => (
                <Col xs={24} sm={12} lg={6} key={device.ID}>
                    <CardComponent file={device} handleViewVideo={handleViewVideo} />
                </Col>
            ))}
        </Row>
    </div>
    );
};
export default AllDevicesMedium;

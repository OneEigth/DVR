import React, { useEffect, useState } from 'react';
import './style/style.css';
import 'leaflet/dist/leaflet.css';
import { Col, Row } from 'antd';
import { useDevicesStore } from '../../../../../store/devices/allDevices';
import CardComponentBig from "../../../../cards/cardComponentBig/CardComponentBig";
import {DeviceByGroupStore} from "../../../../../store/devices/DeviceByGroupStore";
import {useSelectedGroup} from "../../../../../store/groups/SelectedGroup";
import {useAuthStore} from "../../../../../store/auth/auth";
import {Device} from "../../../../../types/Device";


interface AllDevicesBigProps {
    searchText:string;
}

const AllDevicesBig: React.FC<AllDevicesBigProps> = ({searchText}) => {
    const { devices, fetchDevices } = useDevicesStore();
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

    const filteredDevices = deviceData.filter(device =>
        device.name.toLowerCase().includes(searchText.toLowerCase()) ||
        device.description.toLowerCase().includes(searchText.toLowerCase()) ||
        device.model.toLowerCase().includes(searchText.toLowerCase()) ||
        device.groupUID.toLowerCase().includes(searchText.toLowerCase()) ||
        device.DID.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleViewVideo = (uid: string) => {
        console.log('View video for UID:', uid);
    };

    return (
    <div className="allDeviceBig">
        <Row gutter={[16, 16]}>
            {filteredDevices.map((device: any) => (
                <Col xs={24} sm={12} lg={8} key={device.ID}>
                    <CardComponentBig file={device} handleViewVideo={handleViewVideo}/>
                </Col>
            ))}
        </Row>
    </div>
    );
};

export default AllDevicesBig;

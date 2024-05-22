import React from "react";
import PlayerPlace from "./leftSide/playerPlace/PlayerPlace";
import Description from "./leftSide/description/Description";
import FileTable from "./rightSide/filesTable/FileTable";
import ToolBarDeviceOne from "./leftSide/toolBar/toolBarDeviceOne";
import './style.css'
import MenuRS from "./rightSide/menu/MenuRS";
import ToolBarRS from "./rightSide/toolbarRS/ToolBarRS";
import InfoBar from "./leftSide/infoBar/InfoBar";
import {useSelectedDevice} from "../../store/devices/SelectedDevice"
import LeftPart from "../leftPart/leftPart";
import {useMenuRSStateStore} from "../../store/rightSideMenuState/menuRSStateStore";
import LocationMap from "../locationMap/LocationMap";
import {Col, Row} from "antd";
import {useLeftPartStateStore} from "../../store/leftPart/LeftPartStore";

interface DeviceOneProps {
    selectedOnlineUID: string;
    selectedFileUID?:string
}
const DeviceOne: React.FC<DeviceOneProps> = ({ selectedOnlineUID, selectedFileUID }) => {
    const {selectedDevice}=useSelectedDevice();
    const {selectedStateMenuRS}=useMenuRSStateStore();
    const { selectedStateLeftPart, setSelectedStateLeftPart } = useLeftPartStateStore();


    return (
        /*<Row>
        <div className="containerDeviceOne">
            <Col span={3}>
            <div className="SideBar">
                <LeftPart />
            </div>
            </Col>
            <Col span={21}>
            <div className="DeviceOne">
                <Col span={7}>
                <div className="leftSideDeviceOne">
                    <ToolBarDeviceOne/>
                    <PlayerPlace selectedOnlineUID={selectedOnlineUID} device={selectedDevice}/>
                    <InfoBar device={selectedDevice}/>
                    <Description device={selectedDevice}/>
                </div>
                </Col>
                <Col span={14}>
                <div className="rightSideDeviceOne">
                    <MenuRS/>
                    <ToolBarRS/>
                    {selectedStateMenuRS=='map'  ?
                     <LocationMap device={selectedDevice}/>
                        :
                     <FileTable device={selectedDevice}/>
                    }
                </div>
                </Col>
            </div>
            </Col>
        </div>
        </Row>*/
        <Row className="containerDeviceOne">
            <Col span={selectedStateLeftPart ? 3 : 1} className="SideBar">
                <LeftPart leftMenuState={true} />
            </Col>
            <Col span={selectedStateLeftPart ? 21 : 23}>
                <Row className="DeviceOne">
                    <Col span={selectedStateLeftPart ? 16 : 17} className="leftSideDeviceOne">
                        <ToolBarDeviceOne />
                        <PlayerPlace selectedOnlineUID={selectedOnlineUID} device={selectedDevice} />
                        <InfoBar device={selectedDevice} />
                        <Description device={selectedDevice} />
                    </Col>
                    <Col span={6.5} className="rightSideDeviceOne">
                        <MenuRS />
                        <ToolBarRS />
                        {selectedStateMenuRS === 'map' ? (
                            <LocationMap device={selectedDevice} />
                        ) : (
                            <FileTable device={selectedDevice} />
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>


    );
}

export default DeviceOne;
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

interface DeviceOneProps {
    selectedOnlineUID: string;
    selectedFileUID?:string
}
const DeviceOne: React.FC<DeviceOneProps> = ({ selectedOnlineUID, selectedFileUID }) => {
    const {selectedDevice}=useSelectedDevice();


    return (
        <div className="containerDeviceOne">
            <div className="leftSideDeviceOne">
                <ToolBarDeviceOne/>
                <PlayerPlace selectedOnlineUID={selectedOnlineUID} device={selectedDevice}/>
                <InfoBar device={selectedDevice}/>
                <Description/>
            </div>
            <div className="rightSideDeviceOne">
                <MenuRS/>
                <ToolBarRS/>
                <FileTable/>
            </div>
        </div>
    );
}

export default DeviceOne;
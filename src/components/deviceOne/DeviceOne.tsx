import React from "react";
import PlayerPlace from "./leftSide/playerPlace/PlayerPlace";
import Description from "./leftSide/description/Description";
import FileTable from "./rightSide/filesTable/FileTable";
import ToolBarDeviceOne from "./leftSide/toolBar/toolBarDeviceOne";
import './style.css'
import MenuRS from "./rightSide/menu/MenuRS";
import ToolBarRS from "./rightSide/toolbarRS/ToolBarRS";
import InfoBar from "./leftSide/infoBar/InfoBar";

interface DeviceOneProps {
    selectedOnlineUID: string;
    selectedFileUID?:string
}
const DeviceOne: React.FC<DeviceOneProps> = ({ selectedOnlineUID, selectedFileUID }) => {
    return (
        <div className="containerDeviceOne">
            <div className="leftSideDeviceOne">
                <ToolBarDeviceOne/>
                <PlayerPlace selectedOnlineUID={selectedOnlineUID} selectedFileUID={"a7aa3e19-08ac-11ef-b8a5-0001693eb0e4"}/>
                <InfoBar/>
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
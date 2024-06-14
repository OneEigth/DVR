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
import {useMenuRSStateStore} from "../../store/rightSideMenuState/menuRSStateStore";
import LocationMap from "../locationMap/LocationMap";

import { Layout } from 'antd';
import {useFileSelectionStore} from "../../store/devices/useSelectedRowKeysFilesRS";
import IconLeftMenuFooter from "../icons/iconLeftMenu/IconLeftMenuFooter";

import ButtonDOFooterDelete from "../buttons/buttonLeftMenu/ButtonDOFooterDelete";
import {useButtonDeleteFromDOF} from "../../store/devices/useButtonsDeleteFromDOF";

const { Content, Footer } = Layout;

interface DeviceOneProps {

    selectedFileUID?:string
}
const DeviceOne: React.FC<DeviceOneProps> = ({  selectedFileUID }) => {
    const {selectedDevice}=useSelectedDevice();
    const {selectedStateMenuRS}=useMenuRSStateStore();
    const {selectedFiles}=useFileSelectionStore();
    const {setIsDeleteDeviceModal}=useButtonDeleteFromDOF();

    console.log("selected files ", Object.keys(selectedFiles));

    const showDeleteDeviceModal = () => {
        setIsDeleteDeviceModal(true)
    }


    return (
            <Layout  style={{ display: 'flex', flexDirection:"row", justifyContent:"space-between" }}>

                <Layout className="L_LeftSide" >
                    <Content className="C_leftSide">
                        <ToolBarDeviceOne device={selectedDevice} />
                        <PlayerPlace  device={selectedDevice} />
                        <InfoBar device={selectedDevice} />
                        <Description device={selectedDevice} />
                    </Content>
                </Layout>


                <Layout className="L_RightSide" >

                    <Content className="C_RightSide">
                        <MenuRS />
                        <ToolBarRS />
                        {selectedStateMenuRS === 'map' ? (
                            <LocationMap device={selectedDevice} />
                        ) : (
                            <FileTable device={selectedDevice} />
                        )}
                    </Content>

                    <Footer style={{
                        width: '100%',
                        display: (Object.entries(selectedFiles).length ? 'initial':'none'),
                        alignItems: 'center',
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: '#ffffff',
                        position: 'sticky',
                        bottom: 0,
                        height: 56,
                        padding:0
                    }}>
                        <div className="tableFooter">
                            <span className="countDeviceFooter"><IconLeftMenuFooter/><h3 className="h3Footer">Выбрано: {Object.entries(selectedFiles).length}</h3></span>
                            <div>
                                <ButtonDOFooterDelete onClick={showDeleteDeviceModal}/>
                            </div>
                        </div>
                    </Footer>
                </Layout>
            </Layout>
    );
}

export default DeviceOne;


/*<div className="containerDeviceOne">

            <div >
                <div className="DeviceOne">
                    <div  className="leftSideDeviceOne">
                        <ToolBarDeviceOne device={selectedDevice} />
                        <PlayerPlace  device={selectedDevice} />
                        <InfoBar device={selectedDevice} />
                        <Description device={selectedDevice} />
                    </div>
                    <div  className="rightSideDeviceOne">
                        <MenuRS />
                        <ToolBarRS />
                        {selectedStateMenuRS === 'map' ? (
                            <LocationMap device={selectedDevice} />
                        ) : (
                            <FileTable device={selectedDevice} />
                        )}
                    </div>
                </div>
            </div>

        </div>*/
import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import TableDevices from "../../components/tables/tableDevices/TableDevices";
import { Layout } from 'antd';
import IconLeftMenuFooter from "../../components/icons/iconLeftMenu/IconLeftMenuFooter";
import ButtonLeftMenuFooterEdit from "../../components/buttons/buttonLeftMenu/ButtonLeftMenuFooterEdit";
import ButtonLeftMenuFooterDelete from "../../components/buttons/buttonLeftMenu/ButtonLeftMenuFooterDelete";
import {useSelectedRowKeys} from "../../store/devices/useSelectedRowKeys";
import {useButtonsFromAllcams} from "../../store/devices/useButtonsFromAllcams";
import SideMenu from "../../components/sideMenu/SideMenu";

const { Header, Sider, Content, Footer } = Layout;


const AllCams: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('allCams');
    const {selectedRowKeys}=useSelectedRowKeys();
    const {isDeleteDeviceModal,isEditDeviceGroupModal,setIsDeleteDeviceModal, setIsEditDeviceGroupModal}=useButtonsFromAllcams();

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const showDeleteDeviceModal = () => {
        setIsDeleteDeviceModal(true);
    }
    const showEditDeviceGroup = () => {
        setIsEditDeviceGroupModal(true);
    };

    return (

    <Layout >
        <Header style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft:0,
            paddingRight:0
        }}>
            <div className="menu">
                <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
            </div>
        </Header>
        <Layout>
             <Sider width="264px" style={{ width:'264px', height: '100vh', position: 'sticky', left: 0, top: 0, bottom: 0, backgroundColor:'#F1F1F1'}}>
                <div className="SideMenu">
                    <SideMenu/>
                </div>
            </Sider>
            <Layout>
            <Content  style={{ overflowX: 'auto', background:'#ffffff' }}>
                <div className="table">
                    <TableDevices />
                </div>
            </Content >
                <Footer style={{
                    width: '100%',
                    display: selectedRowKeys.length>0 ? 'initial':'none',
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
                        <span className="countDeviceFooter"><IconLeftMenuFooter/><h3 className="h3Footer">Выбрано: {selectedRowKeys.length}</h3></span>
                        <div>
                            <ButtonLeftMenuFooterEdit onClick={showEditDeviceGroup}/>
                            <ButtonLeftMenuFooterDelete onClick={showDeleteDeviceModal}/>
                        </div>
                    </div>
                </Footer>
            </Layout>
        </Layout>
    </Layout>

    );
};

export default AllCams;

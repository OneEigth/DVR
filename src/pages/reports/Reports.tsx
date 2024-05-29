import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import {useSelectedDevice} from "../../store/devices/SelectedDevice";
import {Layout} from "antd";



const { Header, Sider, Content, Footer } = Layout;

const Reports: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('reports');
    const{selectedDevice}=useSelectedDevice();

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <Layout>
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
                <Content  style={{ overflowX: 'auto', background:'#ffffff' }}>

                </Content >
            </Layout>
        </Layout>
    );};


export default Reports;

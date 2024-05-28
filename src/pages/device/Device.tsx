import React, {useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import DeviceOne from "../../components/deviceOne/DeviceOne";
import {Col, Row} from "antd";
import { Layout } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

interface DeviceProps {
    selectedUID?: string;
}
const Device: React.FC<DeviceProps> = ({selectedUID}) => {
    const [currentMenuItem, setCurrentMenuItem] = useState('device');
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
              <Content style={{background:'#ffffff'}}>
              <div className="deviceOne">
                  <DeviceOne selectedOnlineUID={selectedUID ?? ''}/>
              </div>
              </Content>
          </Layout>
      </Layout>
    );
};

export default Device;

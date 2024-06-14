import React, {useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import DeviceOne from "../../components/deviceOne/DeviceOne";
import { Layout } from 'antd';
import {useBlocker} from "react-router-dom";
import {useIsFormChanged} from "../../store/devices/getDeviceChange";
import NotSavedChanges from "../../components/modals/notSavedChanges/NotSavedChanges";

const { Header, Content } = Layout;

interface DeviceProps {
    selectedUID?: string;
}
const Device: React.FC<DeviceProps> = ({selectedUID}) => {
    const [currentMenuItem, setCurrentMenuItem] = useState('device');
    const {isFormChanged,setIsNotSavedModalVisible} = useIsFormChanged();
    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    useBlocker(() => {
        if (isFormChanged) {
            setIsNotSavedModalVisible(true);
            return true;
        }
        return false;
    });

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
              paddingRight:0,
              background: '#fff', // Добавляем цвет фона
          }}>
              <div className="menu">
                  <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
              </div>
          </Header>
          <Layout>
              <Content style={{background:'#ffffff'}}>
              <div className="deviceOne">
                  <DeviceOne/>
              </div>
              </Content>
          </Layout>
      </Layout>
    );
};

export default Device;

import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import {Header} from "antd/lib/layout/layout";
import {Layout} from "antd";


const Main: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('main');

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 0,
                paddingRight: 0
            }}>
                <div className="menu">
                    <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
                </div>
            </Header>
        </Layout>
    );
};

export default Main;

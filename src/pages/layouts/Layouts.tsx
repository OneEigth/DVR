import React, {useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import LeftPart from "../../components/leftPart/leftPart";
import './style.css'
import {Layout} from 'antd';

const {Header, Sider, Content, Footer} = Layout;


const Layouts: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (

        <Layout style={{ minHeight: '100vh' }}>
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
                    <MainMenu onClick={handleMenuClick} currentMenuItem={''} />
                </div>
            </Header>

            <Layout>
                <Sider width="264px"
                       style={{
                           height: '100%',
                           position: 'sticky',
                           left: 0,
                           top: 0,
                           bottom: 0,
                           zIndex: 0
                       }}>
                    <div className="LeftSideMenu">
                        <LeftPart />
                    </div>
                </Sider>

                <Layout>
                    <Content style={{
                        overflowX: 'auto',
                        background: '#ffffff',
                        flex: 1,
                        padding: '16px'
                    }}>
                        {/* Ваш основной контент здесь */}
                    </Content>

                    <Footer style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "blue",
                        position: 'relative',
                        bottom: 0
                    }}>
                        {/* Ваш футер здесь */}
                    </Footer>
                </Layout>
            </Layout>
        </Layout>

    );
};

export default Layouts;

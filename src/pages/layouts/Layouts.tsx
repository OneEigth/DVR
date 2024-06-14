import React, {useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import './style.css'
import {Layout} from 'antd';

const {Header, Content, Footer} = Layout;


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
                    <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem} />
                </div>
            </Header>

            <Layout>

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
                        bottom: 0,
                        backgroundColor:'#ffffff'
                    }}>
                        {/* Ваш футер здесь */}
                    </Footer>
                </Layout>
            </Layout>
        </Layout>

    );
};

export default Layouts;

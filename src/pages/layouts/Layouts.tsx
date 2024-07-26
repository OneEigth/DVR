import React, {useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import './style.css'
import {Input, Layout, Menu} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import ButtonAddPlus from "../../components/buttons/buttonAddPlus/ButtonAddPlus";

const {Header, Content, Footer} = Layout;


const Layouts: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [searchText, setSearchText] = useState(''); // Состояние для текста поиска

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const handleAddLayout = () => {
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

            <Layout>

                <Layout>
                    <Content style={{
                        overflowX: 'auto',
                        background: '#ffffff',
                        flex: 1,
                        padding: '16px'
                    }}>
                        <div className="layouts">
                            <div className="header_layouts">
                                <div className="left_HT">
                                    <div className="Users">
                                        <h1 className="name">Раскладки</h1>
                                        <h1 className="count">(2)</h1>
                                        <ButtonAddPlus onClick={handleAddLayout}/>
                                    </div>
                                </div>
                                <div className="right_HT">
                                    <Input
                                        placeholder={"Поиск"}
                                        className="right_HT_input"
                                        suffix={<SearchOutlined style={{marginLeft: '0px', padding: 0}}/>}
                                        value={searchText} // Устанавливаем значение текста поиска
                                        onChange={e => setSearchText(e.target.value)} // Обработчик изменения текста поиска
                                    />
                                </div>
                            </div>
                            <div className="body_layouts">

                            </div>
                        </div>
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
                        backgroundColor: '#ffffff'
                    }}>
                    {/* Ваш футер здесь */}
                    </Footer>
                </Layout>
            </Layout>
        </Layout>

    );
};

export default Layouts;

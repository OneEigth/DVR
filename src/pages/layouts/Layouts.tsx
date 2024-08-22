import React, {useEffect, useState} from 'react';
import MainMenu from "../../components/menu/Menu";
import './style.css'
import {Input, Layout, Menu} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import ButtonAddPlus from "../../components/buttons/buttonAddPlus/ButtonAddPlus";
import LayoutCartComponent from "../../components/layouts/layout/LayoutComponent";
import {useLayoutsStore} from "../../store/layout/useLayoutsStore";
import NewLayoutModal from "../../components/modals/newLayout/NewLayoutModal";
import {useFindLayoutsStore} from "../../store/layout/useFindLayoutStore";

const {Header, Content, Footer} = Layout;


const Layouts: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [searchText, setSearchText] = useState('');
    const {allLayouts, fetchLayouts}=useLayoutsStore();
    const {FoundLayouts, fetchFoundLayouts} = useFindLayoutsStore();
    const [showAddLayoutModal, setShowAddLayoutModal]=useState(false);

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const handleAddLayout = () => {
        setShowAddLayoutModal(true)
    };

    useEffect(() => {
            fetchLayouts();
    }, [searchText, fetchLayouts, fetchFoundLayouts]); // Обновляем раскладки при изменении текста поиска

    const handleOkLayoutModal = () => {
        fetchLayouts();
        setShowAddLayoutModal(false);

    };

    const handleCancelLayoutModal = () => {
        setShowAddLayoutModal(false)
    };

    const filteredLayouts = allLayouts.filter(layout =>
        layout.name.toLowerCase().includes(searchText.toLowerCase())
    );

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
                                        <h1 className="count">({filteredLayouts.length})</h1>
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
                                <LayoutCartComponent layout={filteredLayouts} onLayoutUpdate={fetchLayouts}/> {/* Отображаем найденные раскладки */}
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
            <NewLayoutModal visible={showAddLayoutModal} onCancel={handleCancelLayoutModal} onOk={handleOkLayoutModal}/>
        </Layout>

    );
};

export default Layouts;

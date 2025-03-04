import React, {useEffect, useState} from 'react';

import './style.css'
import {AutoComplete, Form, Input, Layout, Menu} from 'antd';
import {useLayoutsStore} from "../../../store/layout/useLayoutsStore";
import {useFindLayoutsStore} from "../../../store/layout/useFindLayoutStore";
import MainMenu from "../../../components/menu/Menu";
import ButtonAddPlus from "../../../components/buttons/buttonAddPlus/ButtonAddPlus";
import NewLayoutModal from "../../../components/modals/newLayout/NewLayoutModal";
import { ReactComponent as SearchImg } from 'app/assets/icons/search.svg';
import LayoutCartComponent2 from "../../../components/layouts/layout2/layout2";
import DeviceCart from "../../../components/layouts/camera/DeviceCart";
import LayoutComponent from "./components/LayoutComponent/LayoutComponent";

const {Header, Content, Footer} = Layout;

const LayoutsV2: React.FC = () => {

    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [searchText, setSearchText] = useState('');
    const {allLayouts, fetchLayouts}=useLayoutsStore();
    const {FoundLayouts, fetchFoundLayouts} = useFindLayoutsStore();
    const [showAddLayoutModal, setShowAddLayoutModal]=useState(false);
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('big');

    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const handleAddLayout = () => {
        setShowAddLayoutModal(true)
    };

    useEffect(() => {
        fetchLayouts();
    }, [searchText, fetchLayouts, fetchFoundLayouts]);

    const handleOkLayoutModal = () => {
        fetchLayouts();
        setShowAddLayoutModal(false);

    };

    const handleCancelLayoutModal = () => {
        setShowAddLayoutModal(false)
    };

    const filteredLayouts = allLayouts.filter(layout =>
        layout.name.toLowerCase().includes(searchText.toLowerCase())
    ).map(layout => ({
        ...layout,
        devices: layout.devices || []
    }));

    console.log(filteredLayouts)

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

            {/*<div style={{padding: 24}}>*/}
                <div className="layouts_page">
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
                                    suffix={<SearchImg/>}
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="body_layouts">
                            {filteredLayouts.map((layoutItem, index) => (
                                <div className={'body_layouts-container'}>
                                    <div>
                                        <div className="body_layouts-container_header">
                                            <span className={'title large'}>{layoutItem.description}</span>
                                            <span className={'title large gray'}>({layoutItem.devices.length})</span>
                                            <ButtonAddPlus onClick={handleAddLayout}/>
                                        </div>
                                        <div className={'body_layouts-container_items'}>
                                            {layoutItem.devices.map((device, index)=>(
                                                <LayoutComponent key={device.ID} device={device}
                                                                 layout={layoutItem}/>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
            </div>
            <NewLayoutModal visible={showAddLayoutModal} onCancel={handleCancelLayoutModal} onOk={handleOkLayoutModal}/>
        </Layout>

    );
};

export default LayoutsV2;

import React, { useEffect, useState } from 'react';

import './style.css';
import { AutoComplete, Form, Input, Layout, Menu, Pagination } from 'antd';
import { useLayoutsStore } from '../../../store/layout/useLayoutsStore';
import { useFindLayoutsStore } from '../../../store/layout/useFindLayoutStore';
import MainMenu from '../../../components/menu/Menu';
import ButtonAddPlus from '../../../components/buttons/buttonAddPlus/ButtonAddPlus';
import NewLayoutModal from '../../../components/modals/newLayout/NewLayoutModal';
import { ReactComponent as SearchImg } from 'utils/app/assets/icons/search.svg';
import LayoutCartComponent2 from '../../../components/layouts/layout2/layout2';
import DeviceCart from '../../../components/layouts/camera/DeviceCart';
import LayoutComponentDevice from './components/LayoutComponentDevice/LayoutComponentDevice';
import { SearchOutlined } from '@ant-design/icons';
import Buttonsfilter from '../../../components/buttons/buttonFilter/Buttonsfilter';
import LayoutTable from '../../../components/layouts/layout4/layout4';
import LayoutCartComponent3 from '../../../components/layouts/layout3/layout3';
import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import LayoutsTable from './tables/LayoutsTable/LayoutsTable';

const { Header, Content, Footer } = Layout;

const LayoutsV2: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const [searchText, setSearchText] = useState('');
    const { allLayouts, fetchLayouts } = useLayoutsStore();
    const { FoundLayouts, fetchFoundLayouts } = useFindLayoutsStore();
    const [showAddLayoutModal, setShowAddLayoutModal] = useState(false);
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('big');

    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    const handleAddLayout = () => {
        setShowAddLayoutModal(true);
    };

    useEffect(() => {
        fetchLayouts();
    }, [searchText, fetchLayouts, fetchFoundLayouts]);

    const handleOkLayoutModal = () => {
        fetchLayouts();
        setShowAddLayoutModal(false);
    };

    const handleCancelLayoutModal = () => {
        setShowAddLayoutModal(false);
    };

    const filteredLayouts = allLayouts
        .filter((layout) => layout.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((layout) => ({
            ...layout,
            devices: layout.devices || [],
        }));

    console.log(filteredLayouts);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Количество элементов на странице

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <div className="menu">
                    <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem} />
                </div>
            </Header>

            {/*<div style={{padding: 24}}>*/}
            <div className="layouts_page">
                <div className="header_layouts">
                    <div className="left_HT">
                        <div className="Users">
                            <h1 className="name">Раскладки</h1>
                            <h1 className="count">({filteredLayouts.length})</h1>
                            <ButtonAddPlus onClick={handleAddLayout} />
                        </div>
                    </div>
                    {/*<div className="pagination-container">*/}
                    {/*    <Pagination*/}
                    {/*        current={currentPage}*/}
                    {/*        pageSize={pageSize}*/}
                    {/*        total={filteredLayouts.length}*/}
                    {/*        onChange={handlePageChange}*/}
                    {/*        showSizeChanger={false}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="right_HT">
                        {/*<Input*/}
                        {/*    placeholder={"Поиск"}*/}
                        {/*    className="right_HT_input"*/}
                        {/*    suffix={<SearchImg/>}*/}
                        {/*    value={searchText}*/}
                        {/*    onChange={e => setSearchText(e.target.value)}*/}
                        {/*/>*/}
                        <div className="right_HT">
                            <Input
                                placeholder={'Поиск'}
                                className="right_HT_input"
                                suffix={<SearchImg />}
                                value={searchText} // Устанавливаем значение текста поиска
                                onChange={(e) => setSearchText(e.target.value)} // Обработчик изменения текста поиска
                            />
                            <Buttonsfilter onFilterButtonClick={handleFilterButtonClick} />
                        </div>
                    </div>
                </div>
                {activeDeviceSize === 'small' ? (
                    // Отображаем таблицу только для small
                    <LayoutsTable />
                ) : (
                    // Отображаем другие виды для medium и big
                    <div className={`body_layouts body_layouts--${activeDeviceSize}`}>
                        {filteredLayouts.map((layoutItem) => (
                            <div
                                key={layoutItem.uid}
                                className={`body_layouts-container body_layouts-container--${activeDeviceSize}`}
                            >
                                <div>
                                    {activeDeviceSize !== 'medium' && (
                                        <div className="body_layouts-container_header">
                                            <span
                                                className={'title large'}
                                                style={{ color: 'var(--gray-black)' }}
                                            >
                                                {layoutItem.description}
                                            </span>
                                            <span
                                                className={'title large'}
                                                style={{ color: 'var(--gray-02)', marginLeft: 8 }}
                                            >
                                                ({layoutItem.devices.length})
                                            </span>
                                            <ButtonAddPlus onClick={handleAddLayout} />
                                        </div>
                                    )}

                                    {activeDeviceSize === 'medium' ? (
                                        <div className={'body_layouts-container_items--medium'}>
                                            <LayoutComponent layout={layoutItem} />
                                        </div>
                                    ) : (
                                        <div className={'body_layouts-container_items'}>
                                            {layoutItem.devices.map((device) => (
                                                <LayoutComponentDevice
                                                    key={device.ID}
                                                    device={device}
                                                    layout={layoutItem}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/*<div className="body_layouts body_layouts--medium">*/}
                {/*    {activeDeviceSize === 'medium'*/}
                {/*        ? filteredLayouts.map((layoutItem, index) => (*/}
                {/*              <div*/}
                {/*                  className={*/}
                {/*                      'body_layouts-container body_layouts-container--medium'*/}
                {/*                  }*/}
                {/*              >*/}
                {/*                  <div>*/}
                {/*                      <div className="body_layouts-container_header">*/}
                {/*                          <span*/}
                {/*                              className={'title large'}*/}
                {/*                              style={{ color: 'var(--gray-black)' }}*/}
                {/*                          >*/}
                {/*                              {layoutItem.description}*/}
                {/*                          </span>*/}
                {/*                          <span*/}
                {/*                              className={'title large'}*/}
                {/*                              style={{*/}
                {/*                                  color: 'var(--gray-02)',*/}
                {/*                                  marginLeft: 8,*/}
                {/*                              }}*/}
                {/*                          >*/}
                {/*                              ({layoutItem.devices.length})*/}
                {/*                          </span>*/}
                {/*                          <ButtonAddPlus onClick={handleAddLayout} />*/}
                {/*                      </div>*/}
                {/*                      /!*<div className={'body_layouts-container_items'}>*!/*/}
                {/*                      /!*    {layoutItem.devices.map((device, index) => (*!/*/}
                {/*                      /!*        <LayoutComponentDevice key={device.ID} device={device}*!/*/}
                {/*                      /!*                         layout={layoutItem}/>*!/*/}
                {/*                      /!*    ))}*!/*/}
                {/*                      /!*</div>*!/*/}

                {/*                      <div className={'body_layouts-container_items--medium'}>*/}
                {/*                          <LayoutComponent*/}
                {/*                              // key={device.ID}*/}
                {/*                              // device={device}*/}
                {/*                              layout={layoutItem}*/}
                {/*                          />*/}
                {/*                      </div>*/}
                {/*                  </div>*/}
                {/*              </div>*/}
                {/*          ))*/}
                {/*        : filteredLayouts.map((layoutItem, index) => (*/}
                {/*              <div className={'body_layouts-container'}>*/}
                {/*                  <div>*/}
                {/*                      <div className="body_layouts-container_header">*/}
                {/*                          <span*/}
                {/*                              className={'title large'}*/}
                {/*                              style={{ color: 'var(--gray-black)' }}*/}
                {/*                          >*/}
                {/*                              {layoutItem.description}*/}
                {/*                          </span>*/}
                {/*                          <span*/}
                {/*                              className={'title large'}*/}
                {/*                              style={{*/}
                {/*                                  color: 'var(--gray-02)',*/}
                {/*                                  marginLeft: 8,*/}
                {/*                              }}*/}
                {/*                          >*/}
                {/*                              ({layoutItem.devices.length})*/}
                {/*                          </span>*/}
                {/*                          <ButtonAddPlus onClick={handleAddLayout} />*/}
                {/*                      </div>*/}
                {/*                      /!*<div className={'body_layouts-container_items'}>*!/*/}
                {/*                      /!*    {layoutItem.devices.map((device, index) => (*!/*/}
                {/*                      /!*        <LayoutComponentDevice key={device.ID} device={device}*!/*/}
                {/*                      /!*                         layout={layoutItem}/>*!/*/}
                {/*                      /!*    ))}*!/*/}
                {/*                      /!*</div>*!/*/}
                {/*                      {activeDeviceSize === 'small' && (*/}
                {/*                          <LayoutTable*/}
                {/*                              layouts={filteredLayouts}*/}
                {/*                              onLayoutUpdate={fetchLayouts}*/}
                {/*                          />*/}
                {/*                      )}*/}
                {/*                      {activeDeviceSize === 'big' && (*/}
                {/*                          <div className={'body_layouts-container_items'}>*/}
                {/*                              {layoutItem.devices.map((device, index) => (*/}
                {/*                                  <LayoutComponentDevice*/}
                {/*                                      key={device.ID}*/}
                {/*                                      device={device}*/}
                {/*                                      layout={layoutItem}*/}
                {/*                                  />*/}
                {/*                              ))}*/}
                {/*                          </div>*/}
                {/*                      )}*/}
                {/*                  </div>*/}
                {/*              </div>*/}
                {/*          ))}*/}
                {/*</div>*/}
            </div>
            <NewLayoutModal
                visible={showAddLayoutModal}
                onCancel={handleCancelLayoutModal}
                onOk={handleOkLayoutModal}
            />
        </Layout>
    );
};

export default LayoutsV2;

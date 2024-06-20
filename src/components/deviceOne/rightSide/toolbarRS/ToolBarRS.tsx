import React, { useState } from "react";
import ButtonFilterRS from "../../../buttons/buttonFilter2/ButtonFilterRS";
import './style.css';
import { useMenuRSStateStore } from "../../../../store/rightSideMenuState/menuRSStateStore";
import {
    Button,
    Checkbox,
    ConfigProvider,
    DatePicker,
    DatePickerProps, Drawer,
    GetProp, Input,
    Menu,
    MenuProps,
    Space
} from "antd";

import {CloseOutlined, SearchOutlined} from '@ant-design/icons';
import {useFilterFileStore} from "../../../../store/devices/fileFilterStote";
import {useFileCurrentTypeStore} from "../../../../store/devices/fileCurrentType";

const items: MenuProps['items'] = [
    {
        label: 'Все',
        key: 'all'
    },
    {
        label: 'Видео',
        key: 'mp4',
    },
    {
        label: 'Фото',
        key: 'jpg',
    },
    {
        label: 'Аудио',
        key: 'm4a',
    }
];

const ToolBarRS: React.FC = () => {
    const { selectedStateMenuRS } = useMenuRSStateStore();
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    const [dateStringStart, setDateStringStart] = useState<string | string[]>("");
    const [dateStringEnd, setDateStringEnd] = useState<string | string[]>("");
    const [stringCheckedValues, setStringCheckedValues] = useState<string[]>([])
    const {setFileFilterStore}=useFilterFileStore();
    const {setFileType}=useFileCurrentTypeStore();
    const [current, setCurrent] = useState('all');
    const [searchText, setSearchText] = useState('');


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //фильтр по периоду
    const onChangeDateStart: DatePickerProps['onChange'] = (dateStart, dateStartString) => {
        setDateStringStart(dateStartString);
    };
    const onChangeDateEnd: DatePickerProps['onChange'] = (dateEnd, dateEndString) => {
        setDateStringEnd(dateEndString);
    };

    //фильтр по важности событий
    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any[]) => {
        const stringValuesString = checkedValues.map(value => value.toString());
        setStringCheckedValues(stringValuesString);
    };
    const onClickFileMenu: MenuProps['onClick'] = (e) => {
        console.log('click menuFileRs', e.key);
        setFileType(e.key);
        setCurrent(e.key);
    };
    const handleSearch = () => {
        const Filter = {
            dateStart: dateStringStart as string,
            dateEnd: dateStringEnd as string,
            rating: stringCheckedValues,
        };
        setFileFilterStore(Filter)
        handleCancel(); // Закрытие модального окна после поиска
    };


    const urgentOptions = [
        { label: '1 - наименьшая секретность', value: '1' },
        { label: '2 - низкая секретность', value: '2' },
        { label: '3 - средний уровень секретности', value: '3' },
        { label: '4 - повышенная секретность', value: '4' },
        { label: '5 - высокая секретность', value: '5' }
    ];



    return (
        <div className="ToolBarRS">
            {selectedStateMenuRS !== 'map' && (
                <div className="Tools">

                    <div>
                        <div className="filesMenu">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Menu: {
                                            itemPaddingInline: 0,
                                            horizontalItemSelectedColor: '#FCE49C',
                                            activeBarHeight: 2
                                        },
                                    },
                                }}
                            >
                                <Menu className="menuLineRS" onClick={onClickFileMenu} selectedKeys={[current]} mode="horizontal"
                                      items={items}/>
                            </ConfigProvider>
                            <ButtonFilterRS onClick={showModal} />
                        </div>

                    </div>
                </div>
            )}


            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleColor: '#21201F',
                            titleFontSize: 24,
                            titleLineHeight: 1,
                            paddingMD: 0,
                            padding: 20,
                            paddingContentHorizontalLG: 0,
                        },
                    },
                    token: {
                        borderRadiusLG: 8,
                        fontFamily:'Roboto',
                    },
                }}
            >
                <Drawer
                    className="modalRight"
                    visible={isModalVisible}
                    /*onCancel={handleCancel}*/
                    footer={<div className="FooterFilter">
                        <Button
                            className="buttonModal"
                            onClick={handleSearch}
                        >Поиск</Button>
                        <Button
                        className="buttonModalRed"
                        onClick={handleSearch}
                >Сброс</Button>
                    </div>

                    } // Remove the footer or customize as needed
                    style={{ top: 0, right: 0, margin: 0, width:'400px', height:'100%'}}
                    title={<span className="titleModal"><CloseOutlined  className="closeBut" onClick={handleCancel} style={{ margin: '0', cursor: 'pointer' }} />Фильтр по файлам</span>}
                    closable={false}
                    /*okText={'Поиск'}*/
                    bodyStyle={{ padding: 0, height: '100%' }}
                >
                    <div className="filterPlace">

                        <div className="contentModalRight">
                            <div className="recordingPeriod">
                                <h1 className="h1RecordingPeriod">Период записи:</h1>
                                <Space direction="vertical" size={12}>
                                    <div className= "DatePickers">
                                        <span className="spanStart">C: </span>
                                        <DatePicker className="dateStart" onChange={onChangeDateStart} showTime size="large"/>
                                    </div>
                                    <div className= "DatePickers">
                                        <span className="spanEnd">До: </span>
                                        <DatePicker className="dateEnd" onChange={onChangeDateEnd} showTime size="large"/>
                                    </div>
                                </Space>
                            </div>
                            <div className="Urgency">
                                <h1 className="h1RecordingPeriod">Срочность:</h1>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary:'#4D4E65'

                                        },
                                    }}
                                >
                                    <Checkbox.Group options={urgentOptions}  onChange={onChange} />
                                </ConfigProvider>

                            </div>
                        </div>
                    </div>
                </Drawer>
            </ConfigProvider>
        </div>
    );
}

export default ToolBarRS;

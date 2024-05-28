import React, {useState} from "react";
import {ConfigProvider, Menu, MenuProps} from "antd";
import './style.css'
import {useMenuRSStateStore} from "../../../../store/rightSideMenuState/menuRSStateStore";

const items: MenuProps['items'] = [
    {
        label: 'Файлы',
        key: 'files'
    },
    /*{
        label: 'Сообщения',
        key: 'message',
    },*/
    {
        label: 'Карта',
        key: 'map',
    }
];

const MenuRS: React.FC = () => {
    const [current, setCurrent] = useState('files');
    const {setSelectedStateMenuRS}=useMenuRSStateStore();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e.key);
        setCurrent(e.key);
        setSelectedStateMenuRS(e.key)
    };

    return (
        <div className="MenuRS">

            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemPaddingInline:0,
                            horizontalItemSelectedColor: '#FCE49C',
                            activeBarHeight:4
                        },
                    },
                }}
            >
                <Menu className="menuLine" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </ConfigProvider>

        </div>
    );
}

export default MenuRS;
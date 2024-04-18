import React, {useState} from "react";
import {ConfigProvider, Menu, MenuProps} from "antd";
import './style.css'

const items: MenuProps['items'] = [
    {
        label: 'Файлы',
        key: 'files'
    },
    {
        label: 'Сообщения',
        key: 'message',
    },
    {
        label: 'Карта',
        key: 'map',
    }
];

const MenuRS: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div className="MenuRS">

            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            horizontalLineHeight:2,
                            itemPaddingInline:0,
                            horizontalItemSelectedColor: '#FCE49C',
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
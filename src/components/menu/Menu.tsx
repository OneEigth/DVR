
import React, { useState } from 'react';
import { Menu} from 'antd';
import IconMainMenu from "../icons/iconMainMenu/iconMainMenu";
import './Style/style.css'; // Импорт файла со стилями
import logo from './Logo.png'

const items = [
    {
        label: 'Главное',
        key: 'main',
        icon: <IconMainMenu/>,
        className: "menu-item"
    },
    {
        label: 'Раскладки',
        key: 'layouts',
        icon: <IconMainMenu/>,
        className: "menu-item"
    },
    {
        label: 'Все камеры',
        key: 'allCams',
        icon: <IconMainMenu/>,
        className: "menu-item"
    },
    {
        label: 'Настройка',
        key: 'settings',
        icon: <IconMainMenu/>,
        className: "menu-item"
    }
];

const MainMenu: React.FC = () => {
    const [current, setCurrent] = useState('main');

    const onClick = ({ key }: { key: string }) => {
        setCurrent(key);
    };

    return (
        <div className="menu-container">
            <div className="logo">
                <img className="img" src={logo} alt="Logo"/>
            </div>
            <Menu className="menu" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </div>
    );
};

export default MainMenu;

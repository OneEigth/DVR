import React from 'react';
import { ConfigProvider, Menu } from 'antd';
import IconMainMenu from "../icons/iconMainMenu/iconMainMenu";
import './Style/style.css';
import logo from './Logo.png';
import ButtonLogOut from "../buttons/buttonLogOut/ButtonLogOut";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth';
import IconLayoutMenu from "../icons/iconMainMenu/IconLayoutMenu";
import IconAllCamsMenu from "../icons/iconMainMenu/IconAllCamsMenu";
import IconMapMenu from "../icons/iconMainMenu/IconMapMenu";
import IconArchiveMenu from "../icons/iconMainMenu/IconArchiveMenu";
import IconUserMenu from "../icons/iconMainMenu/IconUserMenu";
import IconReportsMenu from "../icons/iconMainMenu/IconReportsMenu";
import IconSettingMenu from "../icons/iconMainMenu/IconSettingMenu";

interface MenuItem {
    label: string;
    key: string;
    icon: JSX.Element;
    className: string;
}

interface MainMenuProps {
    onClick: (key: string) => void;
    currentMenuItem: string;
}

const items: MenuItem[] = [
    {
        label: 'Главное',
        key: 'main',
        icon: <IconMainMenu />,
        className: "menu-item"
    },
    {
        label: 'Раскладки',
        key: 'layouts',
        icon: <IconLayoutMenu />,
        className: "menu-item"
    },
    {
        label: 'Все камеры',
        key: 'allCams',
        icon: <IconAllCamsMenu />,
        className: "menu-item"
    },
    {
        label: 'Карты',
        key: 'map',
        icon: <IconMapMenu />,
        className: "menu-item"
    },
    {
        label: 'Архив',
        key: 'archive',
        icon: <IconArchiveMenu />,
        className: "menu-item"
    },
    {
        label: 'Пользователи',
        key: 'users',
        icon: <IconUserMenu />,
        className: "menu-item"
    },
    {
        label: 'Отчёты',
        key: 'reports',
        icon: <IconReportsMenu />,
        className: "menu-item"
    },
    {
        label: 'Настройка',
        key: 'settings',
        icon: <IconSettingMenu />,
        className: "menu-item"
    }
];

const MainMenu: React.FC<MainMenuProps> = ({ onClick, currentMenuItem }) => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleClick = ({ key }: { key: string }) => {
        const routes: { [key: string]: string } = {
            main: '/main',
            layouts: '/layouts',
            allCams: '/allcams',
            map:'/map',
            archive:'/archive',
            users:'/users',
            reports:'/reports',
            settings: '/settings'
        };

        const path = routes[key];
        if (path) {
            navigate(path);
        }
        onClick(key);
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <div className="menu-container">
            <div className="logo">
                <img className="img" src={logo} alt="Logo" />
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            horizontalItemSelectedColor: 'none',
                        },
                    },
                }}
            >
                <Menu className="menu" onClick={handleClick} selectedKeys={[currentMenuItem]} mode="horizontal" items={items} />
            </ConfigProvider>
            <div>
                <ButtonLogOut onClick={handleLogout} />
            </div>
        </div>
    );
};

export default MainMenu;

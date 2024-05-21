import React from 'react';
import { ConfigProvider, Menu } from 'antd';
import IconMainMenu from "../icons/iconMainMenu/iconMainMenu";
import './Style/style.css';
import logo from './Logo.png';
import ButtonLogOut from "../buttons/buttonLogOut/ButtonLogOut";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth';

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
        icon: <IconMainMenu />,
        className: "menu-item"
    },
    {
        label: 'Все камеры',
        key: 'allCams',
        icon: <IconMainMenu />,
        className: "menu-item"
    },
    {
        label: 'Настройка',
        key: 'settings',
        icon: <IconMainMenu />,
        className: "menu-item"
    }
];

const MainMenu: React.FC<MainMenuProps> = ({ onClick, currentMenuItem }) => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleClick = ({ key }: { key: string }) => {
        onClick(key);
        if (key === 'main') {
            navigate('/main'); // Навигация на страницу /main при клике на "Главное"
        } else if (key === 'allCams') {
            navigate('/allcams'); // Навигация на страницу /allcams при клике на "Все камеры"
        } else if (key === 'settings') {
            navigate('/settings'); // Навигация на страницу /settings при клике на "Настройки"
        }
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

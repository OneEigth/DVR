import React, { useState } from 'react';
import { Button, ConfigProvider, Menu, Switch, Divider, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth'; // Стор для управления авторизацией
import IconMainMenu from '../icons/iconMainMenu/iconMainMenu';
import IconLayoutMenu from '../icons/iconMainMenu/IconLayoutMenu';
import IconAllCamsMenu from '../icons/iconMainMenu/IconAllCamsMenu';
import IconMapMenu from '../icons/iconMainMenu/IconMapMenu';
import IconArchiveMenu from '../icons/iconMainMenu/IconArchiveMenu';
import IconUserMenu from '../icons/iconMainMenu/IconUserMenu';
import IconReportsMenu from '../icons/iconMainMenu/IconReportsMenu';
import IconSettingMenu from '../icons/iconMainMenu/IconSettingMenu';
import { AudioOutlined } from '@ant-design/icons';
import logo from './Logo placeholder.png'; // Логотип приложения
import './Style/style.css';

import { ReactComponent as ExitIcon } from 'utils/app/assets/icons/exit.svg';
import LangSwitcher from '../../utils/modules/language/components/LangSwitcher/LangSwitcher';

// Интерфейс для описания пунктов меню
interface MenuItem {
    label: string;
    key: string;
    icon: JSX.Element;
    className: string;
}

// Пропсы для основного компонента меню
interface MainMenuProps {
    onClick: (key: string) => void; // Коллбэк для обработки клика по меню
    currentMenuItem: string; // Текущий выбранный пункт меню
    serverStatus?: boolean;
}

// Элементы меню
const items: MenuItem[] = [
    { label: 'Главное', key: 'main', icon: <IconMainMenu />, className: 'menu-item' },
    { label: 'Раскладки', key: 'layouts', icon: <IconLayoutMenu />, className: 'menu-item' },
    { label: 'Все камеры', key: 'allCams', icon: <IconAllCamsMenu />, className: 'menu-item' },
    { label: 'Карты', key: 'map', icon: <IconMapMenu />, className: 'menu-item' },
    { label: 'Архив', key: 'archive', icon: <IconArchiveMenu />, className: 'menu-item' },
    { label: 'Пользователи', key: 'users', icon: <IconUserMenu />, className: 'menu-item' },
    { label: 'Отчёты', key: 'reports', icon: <IconReportsMenu />, className: 'menu-item' },
    { label: 'Настройка', key: 'settings', icon: <IconSettingMenu />, className: 'menu-item' },
];

const MainMenu: React.FC<MainMenuProps> = ({ onClick, currentMenuItem, serverStatus = true }) => {
    const navigate = useNavigate(); // Навигация
    const { logout, user } = useAuthStore(); // Получение данных из состояния авторизации
    const [isModalOpen, setModalOpen] = useState(false); // Состояние модального окна
    const [modalWindow, setModalWindow] = useState<Window | null>(null); // Ссылка на новое окно

    // Обработка кликов по пунктам меню
    const handleClick = ({ key }: { key: string }) => {
        const routes: { [key: string]: string } = {
            main: '/main',
            layouts: '/layouts',
            allCams: '/allcams',
            map: '/map',
            archive: '/archive',
            users: '/users',
            reports: '/reports',
            settings: '/settings',
        };
        const path = routes[key];
        if (path) {
            navigate(path); // Перемещаем пользователя на выбранный маршрут
        }
        onClick(key); // Уведомляем родительский компонент
    };

    // Обработка выхода пользователя
    const handleLogout = () => {
        logout(); // Очистка состояния авторизации
        window.location.href = '/'; // Перенаправление на главную страницу
    };

    const dropdownMenuItems: MenuProps['items'] = [
        {
            key: '1',
            className: 'dropdown-menu-item-settings--info',
            label: (
                // <div className={'dropdown-menu-item-settings--info'}>
                //     <span className="dropdown-menu-item-settings title medium">
                //         {user.name.split(' ')[1]}
                //     </span>
                // </div>
                <span className="dropdown-menu-item-settings title medium">{user?.name}</span>
            ),
            // onClick: () => setEditable(user, 0),

            // disabled: true,
        },
        { key: '2', type: 'divider' },
        {
            key: '3',
            className: 'dropdown-menu-item-settings--lang-switcher',
            label: (
                <div className="dropdown-menu-item-settings ">
                    <LangSwitcher className={'lang_switcher_btn lang_switcher_btn-menu'} />
                </div>
            ),
            // disabled: true,
        },
        // {
        //     key: '4',
        //     label: <ThemeSwitcher />,
        // },
        {
            key: '4',
            className: 'dropdown-menu-item-settings--logout',
            label: (
                <Button className="button-base button-size-large button-type-text button-state-danger dropdown-menu-item-settings--logout-btn body medium-bold">
                    <ExitIcon width={14} height={10} className={'dropdown-menu-icon'} />
                    <span onClick={() => logout()}>Выйти</span>
                </Button>
            ),
            // danger: true,
        },
    ];

    // Меню пользователя
    const userMenu = (
        <div className="custom-user-menu">
            <div className="user-name">{user?.login}</div>
            <Divider />
            <div className="language-switch">
                <Switch checkedChildren="RU" unCheckedChildren="KZ" defaultChecked />
            </div>
            <Divider />
            <div className="logout-section" onClick={handleLogout}>
                <Button type="text" danger icon={<AudioOutlined />}>
                    Выйти
                </Button>
            </div>
        </div>
    );

    const openModal = () => {
        window.open('/pttDispatch', '_blank');
    };

    return (
        <>
            <div className="menu-container">
                <div className="logo">
                    <img className="img" src={logo} alt="Logo" />
                </div>
                <ConfigProvider>
                    <Menu
                        className="menu"
                        onClick={handleClick}
                        selectedKeys={[currentMenuItem]}
                        mode="horizontal"
                        items={items}
                    />
                </ConfigProvider>
                <div className="user-actions">
                    <button className="microphone-button" onClick={openModal}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.2493 7.5H12.0827V6.66667H11.2493V5.83333L12.0827 5.83333C12.0827 4.68274
                              11.1499 3.75 9.99935 3.75C8.84876 3.75 7.91602 4.68274 7.91602 5.83333L9.99935
                              5.83333V6.66667L7.91602 6.66667V7.5L9.99935 7.5V8.33333L7.91602 8.33333V9.16667L9.99935
                              9.16667V10H7.91602C7.91602 11.1506 8.84876 12.0833 9.99935 12.0833C11.1499 12.0833
                              12.0827 11.1506 12.0827 10H11.2493V9.16667H12.0827V8.33333H11.2493V7.5ZM13.3327
                              7.5V6.66667V5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238
                              6.66602 5.83333V6.66667V7.5V8.33333V9.16667V10C6.66602 11.8409 8.1584 13.3333 9.99935
                              13.3333C11.8403 13.3333 13.3327 11.8409 13.3327 10V9.16667V8.33333V7.5ZM9.16602
                              15.8333C6.45459 15.4307 4.16602 12.8235 4.16602 10H5.83268C5.83268 12.4162 7.5831
                              14.1667 9.99935 14.1667C12.4156 14.1667 14.166 12.4162 14.166 10H15.8327C15.8327 12.8235
                              13.5441 15.4307 10.8327 15.8333V17.5H12.4993V19.1667H10.8327H9.16602H7.49935V17.5H9.
                              16602V15.8333Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <span className={`status-dot ${serverStatus ? 'active' : 'inactive'}`}></span>
                    <Dropdown
                        menu={{ items: dropdownMenuItems }}
                        overlayClassName={'dropdown-menu-overlay-settings'}
                        placement="bottomRight"
                        trigger={['click']}
                        className={'menu-dropdown'}
                    >
                        <Button className="user-button">
                            <span className="user-initials">
                                {user?.login.charAt(0).toUpperCase()}
                            </span>
                            <span className="user-name">{user?.login}</span>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default MainMenu;

import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import IconLogOut from "../../icons/iconLogOut/IconLogOut";

interface ButtonLogOutProps {
    onClick: () => void; // Пропс для обработчика события нажатия на кнопку
}

const ButtonLogOut: React.FC<ButtonLogOutProps> = ({ onClick }) => {
    return (
        <Button type="text"
                onClick={onClick}
                icon={<IconLogOut />}
                className="logout-button"
                style={{ backgroundColor: '#4D4E65',
                         color: '#FFFFFF' ,
                         marginRight:'20px',
                         boxShadow: 'none'
                }}/>
    );
};

export default ButtonLogOut;

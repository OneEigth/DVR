

import React from 'react';
import { Button } from 'antd';
import './style.css';
import IconOnline from "../../icons/iconOnline/IconOnline";

interface ButtonOnlineProps {
    onClick: () => void;
}

const ButtonOnline: React.FC<ButtonOnlineProps> = ({ onClick, }) => {

    return (
        <Button className="button" icon={<IconOnline />} onClick={onClick}>
            Онлайн
        </Button>
    );
};

export default ButtonOnline;

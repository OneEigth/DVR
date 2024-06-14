

import React from 'react';
import { Button } from 'antd';
import './style.css';
import IconOnline from "../../icons/iconOnline/IconOnline";

interface ButtonOfflineProps {
    onClick: () => void;
}

const ButtonOffline: React.FC<ButtonOfflineProps> = ({ onClick, }) => {

    return (
        <Button className="button" icon={<IconOnline />} onClick={onClick}>
            Офлайн
        </Button>
    );
};

export default ButtonOffline;

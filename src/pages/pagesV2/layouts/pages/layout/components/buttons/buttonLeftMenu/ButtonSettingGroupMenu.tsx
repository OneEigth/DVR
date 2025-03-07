import { Button } from 'antd';
import React from 'react';
import './styleEdit.css'
import {EditOutlined} from  '@ant-design/icons'

interface ButtonSettingGroupMenuEditProps {
    onClick: () => void;
}

const ButtonSettingGroupMenu: React.FC<ButtonSettingGroupMenuEditProps> = ({ onClick }) => (
    <Button className="ButtonLeftMenuFooterEdit" onClick={onClick} icon={<EditOutlined/>}>Редактировать</Button>
);

export default ButtonSettingGroupMenu;
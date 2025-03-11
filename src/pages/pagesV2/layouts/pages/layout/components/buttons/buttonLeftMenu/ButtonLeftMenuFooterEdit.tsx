import { Button } from 'antd';
import React from 'react';
import './styleEdit.css'
import {EditOutlined} from  '@ant-design/icons'

interface ButtonLeftMenuFooterEditProps {
    onClick: () => void;
}

const ButtonLeftMenuFooterEdit: React.FC<ButtonLeftMenuFooterEditProps> = ({ onClick }) => (
    <Button className="ButtonLeftMenuFooterEdit" onClick={onClick} icon={<EditOutlined/>}>Редактировать</Button>
);

export default ButtonLeftMenuFooterEdit;
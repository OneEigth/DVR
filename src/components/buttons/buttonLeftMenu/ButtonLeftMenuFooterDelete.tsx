import { Button } from 'antd';
import React from 'react';
import './styleDelete.css'
import {CloseOutlined} from  '@ant-design/icons'

interface ButtonLeftMenuFooterDeleteProps {
    onClick: () => void;
}

const ButtonLeftMenuFooterDelete: React.FC<ButtonLeftMenuFooterDeleteProps> = ({ onClick }) => (
    <Button className="ButtonLeftMenuFooterDelete" onClick={onClick} icon={<CloseOutlined />}>Удалить</Button>
);

export default ButtonLeftMenuFooterDelete;
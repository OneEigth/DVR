import { Button } from 'antd';
import React from 'react';
import './styleDelete.css'
import {CloseOutlined} from  '@ant-design/icons'
import IconDelete from "../../../../../../../../components/icons/iconDelete/IconDelete";

interface ButtonLeftMenuFooterDeleteProps {
    onClick: () => void;
}

const ButtonLeftMenuFooterDelete: React.FC<ButtonLeftMenuFooterDeleteProps> = ({ onClick }) => (
    <Button className="ButtonLeftMenuFooterDelete" onClick={onClick} icon={<IconDelete />}>Удалить</Button>
);

export default ButtonLeftMenuFooterDelete;
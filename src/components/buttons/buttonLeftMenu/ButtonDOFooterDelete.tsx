import { Button } from 'antd';
import React from 'react';
import './styleDOFDelete.css'
import {CloseOutlined} from  '@ant-design/icons'
import IconDelete from "../../icons/iconDelete/IconDelete";

interface ButtonDOFooterDeleteProps {
    onClick: () => void;
}

const ButtonDOFooterDelete: React.FC<ButtonDOFooterDeleteProps> = ({ onClick }) => (
    <Button className="ButtonLeftMenuFooterDelete" onClick={onClick} icon={<IconDelete />}/>
);

export default ButtonDOFooterDelete;
import React from 'react';
import IconLeft from "../../icons/iconLeft/iconLeft";
import {Button} from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

interface ButtonLeftProps {
    onClick: () => void; // Определение свойства onClick
}
const ButtonLeft: React.FC<ButtonLeftProps> = ({onClick}) => {

   return (
       <Button icon={<ArrowLeftOutlined />} style={{ color: '#21201F' }} onClick={onClick} />
    );
};
export default ButtonLeft;
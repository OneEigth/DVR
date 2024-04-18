import React from 'react';
import { Button, Flex } from 'antd';
import IconFilterControlButton from "../../icons/iconFilterButton/iconFilterControlButton";
import IconFilterButton from "../../icons/iconFilterButton/iconFilterButton";
import "./style/style.css"
const Buttonsfilter: React.FC = () => {
    return (
        <Flex gap="small" wrap="wrap" className="flex">
            <Button type="primary" icon={<IconFilterControlButton  />}  style={{ backgroundColor: '#4D4E65', color: '#FFFFFF' }} />
            {/*<Button type="primary" icon={<IconFilterButton />} style={{ backgroundColor: '#FFFFFF', color: '#4D4E65', border: '1px solid #4D4E65' }} />*/}
        </Flex>
    );
};
export default Buttonsfilter;
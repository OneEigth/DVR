import React from 'react';
import { Card } from 'antd';
import {Device} from "../../../types/Device";

interface deviceCartData {
    device:Device
}
const deviceCart: React.FC<deviceCartData> = ({device} ) => {
    return (
        <Card>

        </Card>
    );
};

export default deviceCart;
